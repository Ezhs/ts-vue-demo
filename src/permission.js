import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import router from '@/router';
import { getToken } from '@/utils/auth';
import store from '@/store';

NProgress.configure({ showSpinner: true });

/* eslint-disable no-lonely-if */
router.beforeEach(async (to, from, next) => {
  NProgress.start();

  if (getToken()) {
    // Has logged in
    // 判断是否需要获取菜单
    if (!store.state.menu.isGetMenu) {
      store.commit('SET_IS_GET_MENU', true);
      await store.dispatch('getMenus');
    }
    if (to.path === '/login') {
      next('/');
      NProgress.done();
    } else {
      if (to.matched.length === 0) {
        // Not match router
        next({ path: '/404' });
      } else {
        next();
      }
    }
  } else {
    // Not logged in
    if (to.matched.length === 0) {
      console.warn('no match router');
      next({ path: '/login', replace: true });
      NProgress.done();
    } else {
      // match router
      if (to.meta.auth) {
        const redirectUrl = encodeURIComponent(to.fullPath);
        next({ path: `/login?redirect=${redirectUrl}`, replace: true });
        NProgress.done();
      } else {
        next();
      }
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
