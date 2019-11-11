import { Message } from 'element-ui';
import { getMenus } from '@/api/menus';
import { INIT_MENUS } from '@/config';

const menu = {
  state: {
    isGetMenu: false,
    authList: [],
    menus: INIT_MENUS,
  },
  getters: {
    menus: state => state.menus,
  },
  actions: {
    async getMenus({ commit }) {
      try {
        const params = {
          systemCode: '3',
        };
        const res = await getMenus(params);
        if (res.statusCode === 0) {
          Message.error(res.message || '获取菜单失败，请重试');
          // 获取菜单失败 清空菜单
          commit('SET_MENUS', []);
        } else {
          const { data = {} } = res;
          const { menuTreeList = [], uiElementList = [] } = data;
          commit('SET_MENUS', menuTreeList);
          commit('SET_AUTH_LIST', uiElementList);
          commit('SET_IS_GET_MENU', true);
          console.log('获取菜单');
        }
      } catch (error) {
        console.log('getMenus error', error);
      }
    },
  },
  mutations: {
    /**
     * 设置菜单
     *
     *  @param state
     *  @param {array} menus 菜单数据
     */
    SET_MENUS: (state, menus = []) => {
      state.menus = [...INIT_MENUS, ...menus];
    },
    SET_AUTH_LIST: (state, authList = []) => {
      state.authList = authList;
    },
    SET_IS_GET_MENU: (state, isGetMenu) => {
      debugger;
      state.isGetMenu = isGetMenu;
    },
  },
};

export default menu;
