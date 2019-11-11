import axios from 'axios';
import qs from 'qs';
import { Message } from 'element-ui';
import { getToken, setToken } from '@/utils/auth';
import { getAccount } from '@/utils/account';
import store from '@/store';
import router from '@/router';
import { showFullScreenLoading, hideFullScreenLoading } from './request-helper';

const { CancelToken } = axios;
let cancel; // 取消请求对象
const promiseArr = {}; // 正在发起请求队列
// const TIME_OUT = 50000; // 超时设置
// 跳转登录页面 code
const jumpLoginCodeList = ['401', 999];

const request = (defaults = {}) => {
  // create an axios instance
  const instance = axios.create({
    headers: {
      'Content-Type': defaults.contentType || 'application/json;charset=utf-8',
    },
    // timeout: defaults.timeout || TIME_OUT,
    cache: false, // Whether to cache
    // withCredentials: true, // send cookies when cross-domain requests
  });

  // request interceptor
  instance.interceptors.request.use(
    (config) => {
      if (defaults.loading) {
        const message = defaults.loadingMessage;
        showFullScreenLoading(message);
      }

      // 发起请求时，取消掉当前正在进行的相同请求
      let promiseArrKey = config.url;
      const _data = Object.assign({}, config.data);
      delete _data._;
      const _params = Object.assign({}, config.params);
      delete _params._;

      if (JSON.stringify(_data) !== '{}') {
        promiseArrKey += `&${JSON.stringify(_data)}`;
      }
      if (JSON.stringify(_params) !== '{}') {
        promiseArrKey += `&${JSON.stringify(_params)}`;
      }

      config.promiseArrKey = promiseArrKey;

      if (promiseArr[promiseArrKey]) {
        promiseArr[promiseArrKey]('Cancel operation');
        promiseArr[promiseArrKey] = cancel;
      } else {
        promiseArr[promiseArrKey] = cancel;
      }

      const token = getToken();
      if (token) {
        config.headers['AUTH-TOKEN'] = token;
      }

      // 统一处理需要全局传参
      const account = getAccount();
      const METHOD = config.method.toLowerCase();
      const currentUserId = account ? account.id : '';
      const workerId = account ? account.workerId : '';
      const currentUserName = account ? account.name : '';

      let keyName = 'params';
      if (['post', 'put'].includes(METHOD)) {
        keyName = 'data';
      }
      config[keyName].currentUserId = currentUserId;
      config[keyName].workerId = workerId; // 兼容旧 bps
      config[keyName].currentUserName = currentUserName;

      // GET 请求设置时间戳参数, 解决缓存问题
      if (METHOD === 'get' && !config.cache) {
        const timestamp = +new Date();
        config.params._ = timestamp;
      }

      return config;
    },
    error => Promise.reject(error),
  );

  // response interceptor
  instance.interceptors.response.use(
    async (response) => {
      delete promiseArr[response.config.promiseArrKey];
      hideFullScreenLoading();
      const { data, headers } = response;
      const { statusCode, successful, code, message } = data;
      if (statusCode === 1 || successful) {
        // 每次返回新的 token, 存起来, 用于新的会话过期判断
        const token = headers['auth-token'];
        if (token) {
          setToken(token);
        }
        return Promise.resolve(data);
      }

      // 没有登录 跳转到登录页面
      if (jumpLoginCodeList.includes(code) || statusCode === 999) {
        Message({
          type: 'error',
          message: message || '会话过期， 请重新登陆!',
        });
        const isExpiration = true;
        await store.dispatch('logout', isExpiration);
        // redirect to login
        router.replace('/login');
        return Promise.reject(data);
      }

      // 没有权限 跳转到404
      if (code === 403) {
        router.replace('/404');
        return Promise.reject(data);
      }

      Message({
        type: 'error',
        message,
      });
      return Promise.reject(data);
    },
    async (error) => {
      hideFullScreenLoading();

      if (error && error.response) {
        const messages = {
          400: '错误请求',
          401: '会话过期，请重新登录',
          403: '拒绝访问',
          404: '请求错误，未找到该资源',
          405: '请求方法未允许',
          408: '请求超时',
          500: '服务器端出错',
          501: '网络未实现',
          502: '网络错误',
          503: '服务不可用',
          504: '网络超时',
          505: 'http版本不支持该请求',
        };
        error.message = messages[error.response.status] || `连接错误${error.response.status}`;
      } else {
        error.message = error.message || '连接到服务器失败';
      }

      try {
        const { status, statusText } = error.response;
        // 登录过期
        if (status === 401) {
          // 关闭所有 Message 实例
          Message.closeAll();
          Message({
            type: 'error',
            message: error.message,
          });
          const isExpiration = true;
          await store.dispatch('logout', isExpiration);
          // redirect to login
          router.replace('/login');
          return Promise.reject(error);
        }

        // 非登录过期错误
        Message({
          type: 'error',
          message: `${status} - ${error.message}`,
        });

        return Promise.reject({
          status,
          statusText,
          message: error.message,
        });
      } catch (err) {
        return Promise.reject({
          status: 'canceled',
          statusText: 'Cancel operation',
          message: error.message,
        });
      }
    },
  );

  return instance(defaults);
};


/* eslint-disable object-curly-newline */
const http = {
  /**
   * GET 请求
   *
   * @param {string} [url=''] 地址
   * @param {*} [params={}] 查询参数
   * @param {*} [config={}] axios 配置
   * @param {boolean} [loading=false] 是否显示 loading
   * @param {string} [loadingMessage='加载中...'] loading 信息提示
   * @returns
   */
  get({ url = '', params = {}, config = {}, loading = false, loadingMessage = '加载中...' }) {
    const mergeConfig = Object.assign({}, {
      method: 'GET',
      url,
      params,
      loading,
      loadingMessage,
      cancelToken: new CancelToken((c) => {
        cancel = c;
      }),
      // eslint-disable-next-line no-shadow
      paramsSerializer: (params) => {
        return qs.stringify(params);
      },
    }, config);
    return request(mergeConfig);
  },

  /**
   * POST 请求
   *
   * @param {string} [url=''] 地址
   * @param {*} [params={}] 查询参数
   * @param {*} [data={}] 提交内容
   * @param {*} [config={}] axios 配置
   * @param {boolean} [loading=false] 是否显示 loading
   * @param {string} [loadingMessage='加载中...'] loading 信息提示
   * @return {*}
   */
  post({ url = '', params = {}, data = {}, config = {}, loading = false, loadingMessage = '正在提交...' }) {
    const mergeConfig = Object.assign({}, {
      method: 'POST',
      url,
      params,
      data,
      loading,
      loadingMessage,
      cancelToken: new CancelToken((c) => {
        cancel = c;
      }),
    }, config);
    return request(mergeConfig);
  },

  /**
   * DELETE 请求
   *
   * @param {string} [url=''] 地址
   * @param {*} [params={}] 查询参数
   * @param {*} [data={}] 提交内容
   * @param {*} [config={}] axios 配置
   * @param {boolean} [loading=false] 是否显示 loading
   * @param {string} [loadingMessage='加载中...'] loading 信息提示
   * @return {*}
   */
  delete({ url = '', params = {}, data = {}, config = {}, loading = false, loadingMessage = '正在删除...' }) {
    const mergeConfig = Object.assign({}, {
      method: 'DELETE',
      url,
      params,
      data,
      loading,
      loadingMessage,
      cancelToken: new CancelToken((c) => {
        cancel = c;
      }),
    }, config);
    return request(mergeConfig);
  },

  /**
   * PUT 请求
   *
   * @param {string} [url=''] 地址
   * @param {*} [params={}] 查询参数
   * @param {*} [data={}] 提交内容
   * @param {*} [config={}] axios 配置
   * @param {boolean} [loading=false] 是否显示 loading
   * @param {string} [loadingMessage='加载中...'] loading 信息提示
   * @return {*}
   */
  put({ url = '', params = {}, data = {}, config = {}, loading = false, loadingMessage = '正在提交...' }) {
    const mergeConfig = Object.assign({}, {
      method: 'PUT',
      url,
      params,
      data,
      loading,
      loadingMessage,
      cancelToken: new CancelToken((c) => {
        cancel = c;
      }),
    }, config);
    return request(mergeConfig);
  },

  /**
   * PATCH 请求
   *
   * @param {string} [url=''] 地址
   * @param {*} [params={}] 查询参数
   * @param {*} [data={}] 提交内容
   * @param {*} [config={}] axios 配置
   * @param {boolean} [loading=false] 是否显示 loading
   * @param {string} [loadingMessage='加载中...'] loading 信息提示
   * @return {*}
   */
  patch({ url = '', params = {}, data = {}, config = {}, loading = false, loadingMessage = '正在提交...' }) {
    const mergeConfig = Object.assign({}, {
      method: 'PATCH',
      url,
      params,
      data,
      loading,
      loadingMessage,
      cancelToken: new CancelToken((c) => {
        cancel = c;
      }),
    }, config);
    return request(mergeConfig);
  },

  /**
   * 并发请求
   *
   * @param {*} [args=[]] 请求数组
   * @returns
   */
  all: (args = []) => axios.all(args),
};

export default http;
