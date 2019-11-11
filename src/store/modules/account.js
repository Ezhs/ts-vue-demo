import { resetRouter } from '@/router';
import { getToken, removeToken } from '@/utils/auth';
import { getAccount, setAccount, removeAccount } from '@/utils/account';
// import { loginByUsername, logout } from '@/api/account';


const user = {
  state: {
    account: getAccount(),
    token: getToken() || '',
  },
  getters: {
    account: state => state.account,
    token: state => state.token,
  },
  actions: {
    // 用户名登录
    loginByUsername({ commit }, account) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = account; // await loginByUsername(account);

          if (res.statusCode === 0) {
            resolve(res);
          } else {
            const { data } = res;
            commit('SET_ACCOUNT', data);
            setAccount(data);
            // setToken(constants.token || '');
            // commit('SET_TOKEN', constants.token || '');
            resolve(res);
          }
        } catch (error) {
          reject(error);
        }
      });
    },
    // 退出登录
    logout({ commit }, isExpiration = false) {
      return new Promise(async (resolve) => {
        try {
          if (!isExpiration) {
            // 非会话过期, 即为主动退出登录, 需发请求
            const res = {}; // await logout();
            console.log('logout res', res);
          }
          // 初始化store
          commit('SET_MENUS', []);
          commit('SET_TOKEN', '');
          commit('SET_ACCOUNT', null);
          commit('SET_IS_GET_MENU', false);
          removeToken();
          removeAccount();
          resetRouter();
          resolve();
        } catch (error) {
          console.log('logout error', error);
        }
      });
    },
  },
  mutations: {
    SET_ACCOUNT: (state, account) => {
      state.account = account;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
  },
};

export default user;
