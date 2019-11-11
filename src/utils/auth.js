import Cookies from 'js-cookie';
import { ENV_PREFIX } from '@/config';

const TOKEN_KEY = `nbps-user-token-${ENV_PREFIX}`;

/**
 * 获取 token
 */
export function getToken() {
  return Cookies.get(TOKEN_KEY);
}

/**
 * 设置 token
 * @param {*} token
 */
export function setToken(token = '') {
  return Cookies.set(TOKEN_KEY, token);
}

/**
 * 删除 token
 */
export function removeToken() {
  return Cookies.remove(TOKEN_KEY);
}
