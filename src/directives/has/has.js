// 权限指令. 不满足就删除 DOM 节点
import store from '@/store';

export default {
  inserted(el, binding) {
    const { value } = binding;
    if (!store.state.menu.authList.includes(value)) {
      el.parentNode.removeChild(el);
    }
  },
};
