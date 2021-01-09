import { request } from 'umi';

export const getService = config => {
  if (!config) return;
  const { url, method = 'GET', params, currentAlias, pageSizeAlias } = config;
  const isGet = method.toUpperCase() === 'GET';
  const requestParams = isGet ? 'params' : 'data';
  const aliasCurrent = currentAlias || 'current';
  const aliasPageSize = pageSizeAlias || 'pageSize';

  return moreParams => {
    let pagerConfig = {};
    if (moreParams && moreParams.current) {
      pagerConfig[aliasCurrent] = moreParams.current;
    }
    if (moreParams && moreParams.pageSize) {
      pagerConfig[aliasPageSize] = moreParams.pageSize;
    }
    return request(url, {
      url,
      headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache' },
      method: method,
      [requestParams]: {
        ...params,
        ...moreParams,
        ...pagerConfig,
      },
    });
  };
};
