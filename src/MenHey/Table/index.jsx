import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
import MenHeyModalForm, { useMenHeyModalForm } from '../ModalForm';
import style from './style.less';

const MenHeyTable = ({
  columns,
  rowKey = 'id',
  rowSelection,
  paginated = true,
  remote,
  buttons,
}) => {
  const modalForm = useMenHeyModalForm();
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

  const {
    url,
    method = 'GET',
    params,
    currentAlias,
    pageSizeAlias,
    formatResult,
  } = remote;

  const service = ({ current, pageSize }) => {
    const isGet = method.toUpperCase() === 'GET';
    const requestParams = isGet ? 'params' : 'data';
    const aliasCurrent = currentAlias || 'current';
    const aliasPageSize = pageSizeAlias || 'pageSize';
    return request(url, {
      headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache' },
      method: method,
      [requestParams]: {
        ...params,
        [aliasCurrent]: current,
        [aliasPageSize]: pageSize,
      },
    });
  };

  const { data, loading, pagination, refresh } = useRequest(service, {
    //pollingInterval: 10000,
    debounceInterval: 500,
    //manual: true,
    paginated,
    refreshDeps: [params],
    formatResult: formatResult ? formatResult : res => res,
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

  const onAction = action => {
    const { remote, type, title, content } = action;
    console.log(currentSelectRows);
    if (currentSelectRows.length === 0) {
      message.error('请选中一行进行操作');
      return;
    }

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

      case 'modalform':
        {
          const chosen = currentSelectRows[0];
          if (action.showInitialValues) {
            action.fields.map(el => (el.initialValue = chosen[el.name]));
          }
          action.remote.params = { [rowKey]: chosen[rowKey] };
          modalForm.setConfig(action);
          modalForm.show();
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
      <MenHeyModalForm {...modalForm.config} onSuccess={refresh} />
    </div>
  );
};

MenHeyTable.defaultProps = {
  columns: [],
  dataSource: [],
  buttons: [],
};

export default React.memo(MenHeyTable);
