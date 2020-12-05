import React from 'react';
import styles from './index.less';
import MenHeyForm, { FormItemProps } from '@/MenHey/Form';

const config: FormItemProps[] = [
  {
    type: 'input',
    name: 'username',
    label: '用户名',
  },
];

export default () => {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h1
        style={{ flexBasis: '40px', marginBottom: 0 }}
        className={styles.title}
      >
        Page index
      </h1>
      <div style={{ flexGrow: 1 }}>
        <MenHeyForm fields={config} />
      </div>
    </div>
  );
};
