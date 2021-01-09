import { SearchOutlined, ReloadOutlined, TagOutlined } from '@ant-design/icons';
export const fieldConfig = [
  {
    type: 'input',
    name: 'ftitle',
    label: '标题',
    placeholder: '请输入标题',
    //rules: [{ required: true, message: '部门id必填' }],
  },
  {
    type: 'select',
    labelField: 'text',
    valueField: 'id',
    remote: {
      url: '/API/wdk?action=obj.traincou&method=fis_active',
    },
    name: 'fcourseware_type_uuid',
    label: '类型',
    allowClear: true,
    label: '是否启用',
  },
];

export const buttonConfig = [
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

export const tableHeaders = [
  {
    title: '标题',
    dataIndex: 'ftitle',
    //width: 250,
  },
  {
    title: '类型 ',
    dataIndex: 'fapply',
    //width: 250,
  },
  {
    title: 'PDF ',
    dataIndex: 'fpdf_url',
    //width: 250,
    render: (url, row) => {
      return url ? (
        <a href={url} target="_blank">
          查看pdf
        </a>
      ) : (
        '/'
      );
    },
  },
  {
    title: '创建人 ',
    dataIndex: 'fcreator_name',
    //width: 250,
  },
  {
    title: '创建时间 ',
    dataIndex: 'fcreat_time',
    //width: 250,
  },
  {
    title: '是否启用 ',
    dataIndex: 'fis_active',
    //width: 80,
  },
];

export const remoteOption = {
  url: '/API/wdk?action=obj.traincou&method=query',
  //method: 'post',
  currentAlias: 'page',
  pageSizeAlias: 'rows',
  params: {
    page: 1,
    rows: 10,
    ftitle: '',
    fis_active: '',
    orderbyfield: 'fileid',
  },
  formatResult: res => {
    return {
      list: res.rows.map((r, i) => ({ ...r, key: i })),
      total: res.total,
    };
  },
};

export const tableButtons = [
  {
    text: '新增',
    //icon: <ReloadOutlined />,
    type: 'primary',
    action: {
      type: 'add',
      title: '新增课件',
      okText: '确定',
      fields: [
        {
          type: 'input',
          name: 'ftitle',
          label: '标题',
          rules: [{ required: true, message: '标题必填' }],
        },
        {
          type: 'select',
          labelField: 'text',
          valueField: 'id',
          remote: {
            url: '/API/wdk?action=obj.traincou&method=fcour_type',
          },
          name: 'fcourseware_type_uuid',
          label: '类型',
          rules: [{ required: true, message: '类型必选' }],
        },
        {
          type: 'number',
          name: 'flimit_time',
          label: '学习时长',
          rules: [{ required: true, message: '学习时长必填' }],
        },
        {
          type: 'select',
          labelField: 'text',
          valueField: 'id',
          remote: {
            url: '/API/wdk?action=sys.public&method=G_PB_sysDicInfo',
            params: {
              fparent_code: 'SD8',
            },
          },
          name: 'ffile_type',
          label: '文件格式',
          rules: [{ required: true, message: '文件格式必选' }],
        },
      ],
      remote: {
        url: '/API/wdk?action=obj.traincou&method=save',
        //method:'post',
        //params: '',
      },
    },
  },
  {
    text: '修改',
    //icon: <ReloadOutlined />,
    type: 'primary',
    action: {
      type: 'modalform',
      title: '修改课件',
      okText: '更新',
      showInitialValues: true,
      fields: [
        {
          type: 'input',
          name: 'ftitle',
          label: '标题',
          rules: [{ required: true, message: '标题必填' }],
        },
        {
          type: 'select',
          labelField: 'text',
          valueField: 'id',
          remote: {
            url: '/API/wdk?action=obj.traincou&method=fcour_type',
          },
          name: 'fcourseware_type_uuid',
          label: '类型',
          rules: [{ required: true, message: '类型必选' }],
        },
        {
          type: 'number',
          name: 'flimit_time',
          label: '学习时长',
          rules: [{ required: true, message: '学习时长必填' }],
        },
        {
          type: 'select',
          labelField: 'text',
          valueField: 'id',
          remote: {
            url: '/API/wdk?action=sys.public&method=G_PB_sysDicInfo',
            params: {
              fparent_code: 'SD8',
            },
          },
          name: 'ffile_type',
          label: '文件格式',
          rules: [{ required: true, message: '文件格式必选' }],
        },
      ],
      remote: {
        url: '/API/wdk?action=obj.traincou&method=save',
        //method:'post',
        //params: '',
      },
    },
  },
  //   {
  //     text: '查看',
  //     type: 'primary',
  //     action: {
  //       type: 'modalform',
  //       title: '',
  //       fields: [],
  //       remote: {
  //         url: '',
  //         method: '',
  //         params: '',
  //       },
  //     },
  //   },
  {
    text: '停用',
    type: 'primary',
    danger: true,
    action: {
      type: 'confirm', //二次确认弹窗
      title: '确定要停用吗？',
      content: '停用后5分钟内无法恢复，是否继续？',
      remote: {
        url: '/API/wdk?action=obj.traincou&method=stop',
      },
    },
  },
  {
    text: '启用',
    type: 'primary',
    action: {
      //type: 'none',
      remote: {
        url: '/API/wdk?action=obj.traincou&method=start',
      },
    },
  },
];
