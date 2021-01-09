import React, { useRef, useState, useMemo } from 'react';
import {
  Table,
  Button,
  Tooltip,
  Pagination,
  Space,
  Modal,
  message,
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useRequest, request } from 'umi';
import { getService } from '../utils';
import MenHeyModalForm from '../ModalForm';
import style from './style.less';

const MenHeyTable = ({
  columns = [],
  rowKey = 'id',
  rowSelection,
  paginated = true,
  remote,
  buttons = [],
}) => {
  const modalFormRef = useRef();
  const headerColumns = useMemo(
    () =>
      columns.map(col => {
        const { tooltip, ...rest } = col;
        let refined = { ...rest };
        if (col.tooltip) {
          refined.ellipsis = {
            showTitle: false,
          };
          refined.render = text => (
            <Tooltip placement="topLeft" title={text}>
              {text}
            </Tooltip>
          );
        }
        return refined;
      }),
    [],
  );

  const service = getService(remote);

  const { data, loading, pagination, refresh } = useRequest(service, {
    //pollingInterval: 10000,
    debounceInterval: 500,
    //manual: true,
    paginated,
    refreshDeps: [remote.params],
    formatResult: remote.formatResult ? remote.formatResult : res => res,
  });

  const [currentSelectRows, setCurrentSelectRows] = useState([]);
  const rowSelectionOption = rowSelection && {
    type: rowSelection,
    onChange: (selectedRowKeys, selectedRows) => {
      setCurrentSelectRows(selectedRows);
    },
    getCheckboxProps: record => ({
      defaultChecked: !!currentSelectRows.find(
        row => row[rowKey] === record[rowKey],
      ),
    }),
  };

  const [modalFormConfig, setModalFormConfig] = useState();

  const onAction = action => {
    const { remote, type, title, content } = action;

    const service = getService(remote);
    switch (type) {
      case 'confirm':
        {
          console.log(currentSelectRows);
          Modal.confirm({
            title,
            icon: <ExclamationCircleOutlined />,
            content,
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk: async () => {
              const res = await service({
                [rowKey]: currentSelectRows[0][rowKey],
              });
              if (res.code === '1') {
                message.success(res.desc);
                refresh();
              } else {
                message.error(res.desc);
              }
            },
          });
        }
        break;

      case 'add':
        {
          setModalFormConfig(action);
          modalFormRef.current.show();
        }
        break;

      case 'modalform':
        {
          const chosen = currentSelectRows[0];
          if (!chosen) {
            message.error('请选中一行进行操作');
            return;
          }
          if (action.showInitialValues) {
            action.fields.map(el => (el.initialValue = chosen[el.name]));
          }
          action.remote.params = { [rowKey]: chosen[rowKey] };
          //modalFormRef.current.setConfig(action);
          setModalFormConfig(action);
          modalFormRef.current.show();
        }
        break;

      default: {
        service({ [rowKey]: currentSelectRows[0][rowKey] }).then(res => {
          if (res.code === '1') {
            message.success(res.desc);
            refresh();
          } else {
            message.error(res.desc);
          }
        });
      }
    }
  };

  return (
    <div className={style.wrapper}>
      {buttons && (
        <div className={style.action}>
          <Space>
            {buttons.map((config, i) => (
              <Button
                key={`btn${i}`}
                type={config.type}
                icon={config.icon}
                danger={config.danger}
                onClick={onAction.bind(null, config.action)}
              >
                {config.text}
              </Button>
            ))}
          </Space>
        </div>
      )}
      <div id="table-container" className={style.table}>
        <Table
          size="middle"
          rowKey={rowKey}
          loading={loading}
          columns={headerColumns}
          dataSource={data && data.list}
          pagination={false}
          rowSelection={rowSelectionOption}
        />
      </div>
      <div className={style.pager}>
        <Pagination {...pagination} />
      </div>
      <MenHeyModalForm
        {...modalFormConfig}
        ref={modalFormRef}
        onActionSuccess={refresh}
      />
    </div>
  );
};

export default React.memo(MenHeyTable);
