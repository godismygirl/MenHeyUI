import React, { useCallback, useEffect, useMemo } from 'react';
import { Form, Row, Col, Button } from 'antd';
import renderFormItem from './renderFormItem';
import useMenHeyForm from './store';
import style from './style.less';

const MenHeyForm = ({
  layout = 'horizontal',
  cols,
  fields,
  buttons,
  onCreate,
}) => {
  const [form] = Form.useForm();

  const colSpan = useMemo(() => {
    return Number.parseInt(24 / cols);
  }, [cols]);

  const groupFields = useMemo(() => {
    let groups = [];
    let columns = cols || 1;
    for (let i = 0; i < columns; i++) {
      groups.push([]);
    }
    fields.map((field, index) => {
      let pos = index % columns;
      if (pos < 0) {
        pos = columns - 1;
      }
      groups[pos].push(field);
    });
    return groups;
  }, [fields, cols]);

  useEffect(() => {
    onCreate && onCreate(form);
  }, []);

  return React.useMemo(
    () => (
      <div className={style.wrapper}>
        <div className={style.content}>
          <Form
            form={form}
            layout={layout}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
          >
            <Row>
              {groupFields.map((group, i) => (
                <Col key={`col${i}`} span={colSpan}>
                  {group.map(field => renderFormItem(field, form))}
                </Col>
              ))}
            </Row>
          </Form>
        </div>
        <div className={style.action}>
          {buttons.map((btn, i) => (
            <Button
              key={`btn${i}`}
              type={btn.type}
              icon={btn.icon}
              danger={btn.danger}
              onClick={btn.onClick.bind(null, form)}
              style={{ marginRight: 5 }}
            >
              {btn.text}
            </Button>
          ))}
        </div>
      </div>
    ),
    [layout, cols, fields, buttons],
  );
};

MenHeyForm.defaultProps = {
  layout: 'horizontal',
  cols: 1,
  feilds: [],
  buttons: [],
};

export default MenHeyForm;
export { useMenHeyForm };
