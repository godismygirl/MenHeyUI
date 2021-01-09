import React, { useCallback, useEffect, useState } from 'react';
import MenHeyForm from '../Form';
import useMenHeyModalForm from './store';
import { useRequest } from 'umi';
import { Modal, message } from 'antd';
import { getService } from '../utils';

const MenHeyModalForm = ({
  layout,
  cols,
  fields,
  title,
  okText,
  width,
  remote,
  onSuccess,
}) => {
  const self = useMenHeyModalForm();

  const { run, loading } = useRequest(getService(remote), {
    manual: true,
    formatResult:
      remote && remote.formatResult ? remote.formatResult : res => res,
    onSuccess: res => {
      message.success(res.desc);
      self.hide();
      onSuccess && onSuccess();
    },
    onError: res => {
      message.error(res.desc);
    },
  });

  const onFormCreate = formInst => {
    self.setFormInstance(formInst);
  };

  const onClose = () => {
    self.hide();
  };

  const onSave = () => {
    const form = self.formInstance;
    form &&
      form.validateFields().then(vals => {
        run({ ...vals });
      });
  };

  return (
    <Modal
      title={title}
      visible={self.visible}
      width={width}
      okText={okText}
      cancelText="取消"
      destroyOnClose={true}
      onOk={onSave}
      onCancel={onClose}
      confirmLoading={loading}
    >
      <MenHeyForm
        layout={layout}
        cols={cols}
        fields={fields}
        onCreate={onFormCreate}
      />
    </Modal>
  );
};

export default React.memo(MenHeyModalForm);
export { useMenHeyModalForm };
