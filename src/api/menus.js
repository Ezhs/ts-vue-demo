import http from '@/utils/request';
import { API_BASE } from '@/config';


export const getMenus = (params) => {
  const url = `${API_BASE.base}/authManage/authority/getAuthResourceAfterLogin`;

  return http.get({
    url,
    params,
  });
};
