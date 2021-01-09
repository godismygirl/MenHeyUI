import { useState } from 'react';
import { createModel } from 'hox';

const useMenHeyModalForm = () => {
  const [visible, setVisible] = useState(false);
  const [config, setConfig] = useState();
  const [formInstance, setFormInstance] = useState();
  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  return {
    visible,
    config,
    formInstance,
    setFormInstance,
    show,
    hide,
    setConfig,
  };
};

export default createModel(useMenHeyModalForm);
