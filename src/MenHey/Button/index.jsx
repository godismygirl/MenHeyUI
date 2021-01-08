import React, { useMemo } from 'react';
import { Button } from 'antd';
import {
  CheckOutlined,
  PlusOutlined,
  EditOutlined,
  CloseOutlined,
  ReloadOutlined,
  SearchOutlined,
} from '@ant-design/icons';

let MenHeyBtn = Button;

MenHeyBtn.Confirm = ({ disabled, loading, size, onClick }) => {
  return useMemo(
    () => (
      <Button
        type="primary"
        disabled={disabled}
        loading={loading}
        size={size || 'middle'}
        icon={<CheckOutlined />}
        style={{ marginLeft: 5 }}
        onClick={onClick}
      >
        确定
      </Button>
    ),
    [disabled, loading],
  );
};

MenHeyBtn.Search = ({ disabled, loading, size, onClick }) => {
  return useMemo(
    () => (
      <Button
        type="primary"
        disabled={disabled}
        loading={loading}
        size={size || 'middle'}
        icon={<SearchOutlined />}
        style={{ marginLeft: 5 }}
        onClick={onClick}
      >
        查询
      </Button>
    ),
    [disabled, loading],
  );
};

MenHeyBtn.Add = ({ disabled, loading, size, onClick }) => {
  return useMemo(
    () => (
      <Button
        type="primary"
        disabled={disabled}
        loading={loading}
        size={size || 'middle'}
        icon={<PlusOutlined />}
        style={{ marginLeft: 5 }}
        onClick={onClick}
      >
        新增
      </Button>
    ),
    [disabled, loading],
  );
};

MenHeyBtn.Edit = ({ disabled, loading, size, onClick }) => {
  return useMemo(
    () => (
      <Button
        type="primary"
        disabled={disabled}
        loading={loading}
        size={size || 'middle'}
        icon={<EditOutlined />}
        style={{ marginLeft: 5 }}
        onClick={onClick}
      >
        修改
      </Button>
    ),
    [disabled, loading],
  );
};

MenHeyBtn.Delete = ({ disabled, loading, size, onClick }) => {
  return useMemo(
    () => (
      <Button
        type="primary"
        danger
        disabled={disabled}
        loading={loading}
        size={size || 'middle'}
        icon={<CloseOutlined />}
        style={{ marginLeft: 5 }}
        onClick={onClick}
      >
        删除
      </Button>
    ),
    [disabled, loading],
  );
};

MenHeyBtn.Cancel = ({ disabled, loading, size, onClick }) => {
  return useMemo(
    () => (
      <Button
        disabled={disabled}
        loading={loading}
        size={size || 'middle'}
        style={{ marginLeft: 5 }}
        onClick={onClick}
      >
        取消
      </Button>
    ),
    [disabled, loading],
  );
};

MenHeyBtn.Reset = ({ disabled, loading, size, onClick }) => {
  return useMemo(
    () => (
      <Button
        disabled={disabled}
        loading={loading}
        size={size || 'middle'}
        icon={<ReloadOutlined />}
        style={{ marginLeft: 5 }}
        onClick={onClick}
      >
        重置
      </Button>
    ),
    [disabled, loading],
  );
};

export default MenHeyBtn;
