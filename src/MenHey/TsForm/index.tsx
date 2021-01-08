import React, { useCallback, useMemo } from 'react';
import { Form, Row, Col } from 'antd';
import renderWidget from './renderWidget';
import { FieldProps } from './interface';

const MenHeyForm: React.FC<{
  layout?: 'horizontal' | 'vertical' | 'inline';
  cols?: number;
  fields: FieldProps[];
}> = ({ layout, cols, fields }) => {
  //console.log(layout, cols, fields);
  const groupFields = useMemo((): FieldProps[][] => {
    let groups: FieldProps[][] = [];
    let columns: number = cols || 1;
    for (let i = 0; i < columns; i++) {
      groups.push([]);
    }
    fields.map((field: FieldProps, index: number) => {
      let pos = (index % columns) - 1;
      if (pos < 0) pos = columns - 1;
      groups[pos].push(field);
    });
    return groups;
  }, [fields, cols]);

  const getFieldWidget = useCallback(renderWidget, []);

  const form = Form.useForm();

  return React.useMemo(
    () => (
      <Form>
        <Row>
          {groupFields.map(group => (
            <Col>{group.map(field => getFieldWidget(field, form))}</Col>
          ))}
        </Row>
      </Form>
    ),
    [layout, cols, fields],
  );
};

MenHeyForm.defaultProps = {
  layout: 'horizontal',
  cols: 1,
};

export default MenHeyForm;
