/**
 * 项目全局配置文件
 */
console.log('config');
// 获取 host
export const API_BASE = (function fn() {
  const getAPIs = (env = 'dev') => {
    const APIS = {
      local: {
        open: '/api',
        base: '/api',
      },
      prod: {
        open: 'https://openapi.baibu.la',
        base: 'https://api.baibu.la',
      },
      he: {
        open: 'https://hopenapi.baibu.la',
        base: 'https://hapi.baibu.la',
      },
      others: {
        open: `https://${env}-openapi.baibu.la`,
        base: `https://${env}-api.baibu.la`,
      },
    };

    return APIS[env] || APIS.others;
  };

  // 当前使用哪个环境的数据
  let ENV = 'dev3';
  if (process.env.NODE_ENV === 'development') {
    return getAPIs(ENV);
  }
  const domain = window.location.host.split('.')[0];
  const prefix = domain.split('-');

  if (prefix.length > 1) {
    [ENV] = prefix;
  } else if (prefix.length === 1 && (domain === 'bps' || domain === 'bps1')) {
    ENV = 'prod';
  } else if (prefix.length === 1 && (domain === 'hbps' || domain === 'hbps1')) {
    ENV = 'he';
  }
  return getAPIs(ENV);
}());


// 环境域名对应的前缀
export const ENV_PREFIX = window.location.host;

// 多语言配置
export const LANGUAGES = [
  { name: '中文简体', lang: 'zh' },
  { name: 'English', lang: 'en' },
];


// 是否开启 mock constants
export const HAS_MOCK = false;


// 内容区域的 page header 显示内容默认配置.
// 可配置: ['breadcrumb', 'pageInfo'], ['breadcrumb'], ['pageInfo'], []
export const PAGE_HEADER = ['breadcrumb'];

// 是否显示标签栏
export const SHOW_TAGS_VIEW = true;


// 首页路由配置
export const HOME_ROUTE = {
  path: '/dashboard',
  name: 'dashboard',
  meta: {
    title: '首页',
    icon: 'document',
  },
};

function recursiveRouters(routerList, list = []) {
  routerList.forEach((item) => {
    const it = {
      url: item.path,
      name: item.meta.title,
      type: '一级菜单',
    };
    if (item.children && item.children.length) {
      it.childList = [];
      recursiveRouters(item.children, it.childList);
    }
    list.push(it);
  });
  return list;
}

// 初始化路由配置
const INIT_ROUTERS = [HOME_ROUTE];
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  const { routerLabsMap } = require('@/router');
  INIT_ROUTERS.push(...routerLabsMap);
}
// 处理 INIT_ROUTERS 数据格式
const routerList = recursiveRouters(INIT_ROUTERS);

export const INIT_MENUS = [
  ...routerList,
];

export const COPYRIGHT = 'Copyright © 2019 广州致景信息科技有限公司';
