import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Table, Button, Tooltip, Pagination, Space } from 'antd';
import { useRequest, request } from 'umi';
import style from './style.less';

const MenHeyTable = ({
  columns,
  rowKey = 'id',
  rowSelection,
  paginated,
  dataSource,
  buttons,
}) => {
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
  } = dataSource;

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

  const [selectRows, setSelectRows] = useState([]);
  const rowSelectionOption = rowSelection && {
    type: rowSelection,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectRows(selectedRows);
    },
    getCheckboxProps: record => ({
      defaultChecked: !!selectRows.find(row => row[rowKey] === record[rowKey]),
    }),
  };

  return (
    <div className={style.wrapper}>
      {buttons && (
        <div className={style.action}>
          <Space>
            {buttons.map((btn, i) => (
              <Button
                key={`btn${i}`}
                type={btn.type}
                icon={btn.icon}
                danger={btn.danger}
                //onClick={btn.onClick.bind(null, form)}
              >
                {btn.text}
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
    </div>
  );
};

MenHeyTable.defaultProps = {
  columns: [],
  dataSource: [],
  buttons: [],
};

export default React.memo(MenHeyTable);
