import React, { useCallback } from 'react';
import { request, history } from 'umi';
import { Button, message } from 'antd';

export default () => {
  const login = useCallback(() => {
    request('/API/wdk?action=wdk.public&method=login', {
      params: {
        loginname: 'hdyyadmin',
        password: 'hdyy866',
      },
    }).then(res => {
      if (res.code !== '1') {
        message.warning(res.desc);
        return;
      }
      message.success(res.desc);
      history.replace('/history');
    });
  }, []);

  return React.useMemo(
    () => (
      <div style={{ height: '100%' }}>
        <div>
          <Button type="primary" onClick={login}>
            hdyyadmin
          </Button>
        </div>
      </div>
    ),
    [],
  );
};
