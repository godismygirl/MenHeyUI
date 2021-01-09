import { useState } from 'react';
import { createModel } from 'hox';

const useMenHeyForm = () => {
  const [formInstance, setFormInstance] = useState(null);
  const [formConfig, setFormConfig] = useState(null);
  const getInstance = () => formInstance;
  const setInstance = inst => setFormInstance(inst);
  const getConfig = () => formConfig;
  const setConfig = conf => setFormConfig(conf);
  return {
    getInstance,
    setInstance,
    getConfig,
    setConfig,
  };
};

export default createModel(useMenHeyForm);
