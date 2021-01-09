import React from 'react';
import { useRequest } from 'umi';
import { Select } from 'antd';
import { getService } from '../utils';

const MenHeySelect = ({
  labelField,
  valueField,
  remote,
  value,
  onChange,
  ...rest
}) => {
  if (!remote) return;
  const service = getService(remote);
  const { data, loading } = useRequest(service, {
    formatResult: res =>
      res.map(el => ({
        label: labelField ? el[labelField] : el.label,
        value: valueField ? el[valueField] : el.value,
      })),
  });
  return (
    <Select
      placeholder="请选择"
      options={data}
      loading={loading}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
};

export default React.memo(MenHeySelect);
