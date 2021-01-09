import { request } from 'umi';

export const getService = config => {
  if (!config) return;
  const { url, method = 'GET', params } = config;
  const isGet = method.toUpperCase() === 'GET';
  const requestParams = isGet ? 'params' : 'data';

  return moreParams =>
    request(url, {
      url,
      headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache' },
      method: method,
      [requestParams]: {
        ...params,
        ...moreParams,
      },
    });
};
