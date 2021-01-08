import React from 'react';
import { SearchOutlined, ReloadOutlined, TagOutlined } from '@ant-design/icons';
import style from './style.less';
import MenHeyForm from '@/MenHey/Form';
import MenHeyTable from '@/MenHey/Table';
import MenHeyBtn from '@/MenHey/Button';

const fieldConfig = [
  // {
  //   type: 'input',
  //   name: 'username',
  //   label: '用户名',
  //   placeholder: '请输入用户名',
  // },
  // {
  //   type: 'input',
  //   name: 'password',
  //   label: '密码',
  //   initialValue: 'jojo2005',
  // },
  // {
  //   type: 'input',
  //   name: 'moblie',
  //   label: '电话号码',
  //   initialValue: '15990006989',
  // },
  {
    type: 'input',
    name: 'departId',
    label: '部门id',
    placeholder: '请输入部门id',
    rules: [{ required: true, message: '部门id必填' }],
  },
  {
    type: 'input',
    name: 'departname',
    label: '部门名称',
  },
  {
    type: 'input',
    name: 'rolename',
    label: '角色名称',
  },
  {
    type: 'select',
    name: 'employee',
    label: '工作人员',
    placeholder: '请选择工作人员',
    options: [
      { label: '小明', value: 'xm' },
      { label: '小红', value: 'xh' },
      { label: '小黄', value: 'xd' },
    ],
    rules: [{ required: true, message: '工作人员必选' }],
  },
  {
    type: 'input',
    name: 'country',
    label: '国籍',
    rules: [{ required: true, message: '国籍必选' }],
  },
  {
    type: 'datepicker',
    name: 'date',
    label: '开始日期',
    placeholder: '请输入开始日期',
    rules: [{ required: true, message: '开始日期必填' }],
    onChange: (val, form) => {},
  },
];

const buttonConfig = [
  {
    text: '立即查询',
    icon: <SearchOutlined />,
    type: 'primary',
    onClick: form => {
      console.log('form', form);
      form.validateFields().then(values => {
        //
      });
    },
  },
  {
    //text: '重置',
    icon: <ReloadOutlined />,
    //type: 'reset',
    danger: true,
    onClick: form => {
      form.resetFields();
    },
  },
  {
    text: '取消',
    onClick: form => {
      console.log('form', form);
    },
  },
];

const tableHeaders = [
  {
    title: '自查表名称',
    dataIndex: 'fpostcheckmodel_name',
    width: 250,
  },
  {
    title: '自查项 ',
    dataIndex: 'fcontent',
    width: 250,
    tooltip: true,
  },
  {
    title: '自查频次',
    dataIndex: 'fdic_name',
    width: 250,
    tooltip: true,
  },
  {
    title: '自查情况',
    dataIndex: 'fcheckstate',
    width: 200,
  },
  {
    title: '所属部门',
    dataIndex: 'fsocialdepart_name',
    width: 250,
  },
  {
    title: '所属岗位',
    dataIndex: 'fpost_name',
    width: 250,
  },
  {
    title: '自查人员',
    dataIndex: 'fperson_name',
    width: 180,
    tooltip: true,
  },
  {
    title: '联系电话',
    dataIndex: 'fmobile_tel',
    width: 180,
  },
  {
    title: '计划开始时间',
    dataIndex: 'fpstart_datefmt',
    width: 180,
  },
  {
    title: '计划结束时间',
    dataIndex: 'fpend_datefmt',
    width: 180,
  },
  {
    title: '实际结束时间',
    dataIndex: 'fend_time',
    width: 180,
  },
];

const remoteOption = {
  url: '/API/wdk?action=obj.hdjobaction&method=getJobCheckRecordGride',
  //method: 'post',
  currentAlias: 'page',
  pageSizeAlias: 'rows',
  params: {
    page: 1,
    rows: 10,
    fpost: '',
    fperson: '',
    fcheckmodeal: '',
    beginDate: 20210101,
    endDate: 20210131,
    fcheckState: '',
    orderbyfield: 'fpostchecktask_uuid',
  },
  formatResult: res => {
    return {
      list: res.rows.map((r, i) => ({ ...r, key: i })),
      total: res.total,
    };
  },
};

const tableButtons = [
  {
    text: '新增',
    icon: <ReloadOutlined />,
    type: 'primary',
    //danger: true,
    // onClick: form => {
    //   form.resetFields();
    // },
  },
  {
    text: '修改',
    icon: <ReloadOutlined />,
    type: 'primary',
    //danger: true,
    // onClick: form => {
    //   form.resetFields();
    // },
  },
  {
    text: '删除',
    type: 'primary',
    danger: true,
    // onClick: form => {
    //   console.log('form', form);
    // },
  },
];

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
          dataSource={remoteOption}
          paginated={true}
          rowKey="fpostchecktask_uuid"
          rowSelection="radio"
        />
      </div>
    </div>
  );
};
