import { ENV_PREFIX } from '@/config';

const ACCOUNT_KEY = `nbps-account-${ENV_PREFIX}`;

/**
 * 获取 账户信息
 */
export function getAccount() {
  const account = localStorage.getItem(ACCOUNT_KEY);
  return account ? JSON.parse(account) : null;
}

/**
 * 设置 账户信息
 * @param {*} token
 */
export function setAccount(account = {}) {
  return localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
}

/**
 * 删除 账户信息
 */
export function removeAccount() {
  return localStorage.removeItem(ACCOUNT_KEY);
}
