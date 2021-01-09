import React from 'react';
import { SearchOutlined, ReloadOutlined, TagOutlined } from '@ant-design/icons';
import style from './style.less';
import MenHeyForm from '@/MenHey/Form';
import MenHeyTable from '@/MenHey/Table';
import MenHeyBtn from '@/MenHey/Button';
import {
  fieldConfig,
  buttonConfig,
  tableHeaders,
  tableButtons,
  remoteOption,
} from './config';

export default () => {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div>
        <MenHeyBtn icon={<TagOutlined />} type="primary">
          保存全部
        </MenHeyBtn>
        <MenHeyBtn.Search />
        <MenHeyBtn.Confirm />
        <MenHeyBtn.Add />
        <MenHeyBtn.Edit />
        <MenHeyBtn.Delete />
        <MenHeyBtn.Reset />
        <MenHeyBtn.Cancel />
      </div>
      <div
        style={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <MenHeyForm
          layout="horizontal"
          cols={3}
          fields={fieldConfig}
          buttons={buttonConfig}
        />
        <MenHeyTable
          buttons={tableButtons}
          columns={tableHeaders}
          remote={remoteOption}
          //paginated={true}
          rowKey="fcourseware_uuid"
          rowSelection="radio"
        />
      </div>
    </div>
  );
};
