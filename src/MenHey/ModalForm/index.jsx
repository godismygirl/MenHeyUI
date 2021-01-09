import React, { useRef, useImperativeHandle, useState, useEffect } from 'react';
import MenHeyForm from '../Form';
import { useRequest } from 'umi';
import { Modal, message } from 'antd';
import { getService } from '../utils';

const MenHeyModalForm = React.forwardRef((props, ref) => {
  const {
    layout,
    cols,
    fields,
    title,
    okText,
    width,
    remote,
    onActionSuccess,
  } = props;

  let formInstance = null;
  const [visible, setVisible] = useState(false);

  const onFormCreate = form => {
    formInstance = form;
  };

  const onClose = () => {
    setVisible(false);
  };

  const { run, loading } = useRequest(getService(remote), {
    manual: true,
    formatResult:
      remote && remote.formatResult ? remote.formatResult : res => res,
    onSuccess: res => {
      message.success(res.desc);
      onClose();
      onActionSuccess && onActionSuccess();
    },
    onError: res => {
      message.error(res.desc);
    },
  });

  const onSave = () => {
    formInstance &&
      formInstance.validateFields().then(vals => {
        run({ ...vals });
      });
  };

  useImperativeHandle(ref, () => ({
    show: () => setVisible(true),
  }));

  return (
    <Modal
      title={title}
      visible={visible}
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
});

export default React.memo(MenHeyModalForm);
