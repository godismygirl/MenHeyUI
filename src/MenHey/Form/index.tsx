import React from 'react';
import { Form, Input } from 'antd';

export interface FormItemProps {
  type:
    | 'input'
    | 'number'
    | 'password'
    | 'select'
    | 'textarea'
    | 'switch'
    | 'checkbox'
    | 'checkboxgroup'
    | 'radio'
    | 'radiogroup'
    | 'datepicker'
    | 'rangepicker'
    | 'timepicker';
  name: string;
  label: string;
  initialSource?: { text: string; value: string }[];
  rules?: { required: boolean; message: string }[];
}

const MenHeyForm: React.FC<{
  layout?: 'horizontal' | 'vertical' | 'inline';
  cols?: number;
  fields: FormItemProps[];
}> = ({ layout, cols, fields }) => {
  console.log(layout, cols, fields);
  return React.useMemo(() => <div>hello</div>, [layout, cols, fields]);
};

MenHeyForm.defaultProps = {
  layout: 'horizontal',
  cols: 1,
};

export default MenHeyForm;
