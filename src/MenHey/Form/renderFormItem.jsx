import React from 'react';
import {
  Form,
  Input,
  InputNumber,
  Switch,
  Radio,
  Checkbox,
  DatePicker,
  TimePicker,
} from 'antd';
import MenHeySelect from '../Select';

const renderWidget = (field, form) => {
  const { name, label, initialValue, rules, onChange, ...restProps } = field;
  const onValueChange = val => {
    if (field.onChange) {
      field.onChange(val, form);
    }
  };

  switch (field.type) {
    case 'input':
      {
        return <Input onChange={onValueChange} {...restProps} />;
      }
      break;

    case 'number':
      {
        return <InputNumber onChange={onValueChange} {...restProps} />;
      }
      break;

    case 'password':
      {
        return <Input.Password onChange={onValueChange} {...restProps} />;
      }
      break;

    case 'textarea':
      {
        return <Input.TextArea onChange={onValueChange} {...restProps} />;
      }
      break;

    case 'select':
      {
        return <MenHeySelect onChange={onValueChange} {...restProps} />;
      }
      break;

    case 'switch':
      {
        return <Switch onChange={onValueChange} {...restProps} />;
      }
      break;

    case 'radio':
      {
        return <Radio onChange={onValueChange} {...restProps} />;
      }
      break;

    case 'radiogroup':
      {
        return (
          <Radio.Group onChange={onValueChange} {...restProps}></Radio.Group>
        );
      }
      break;

    case 'checkbox':
      {
        return <Checkbox onChange={onValueChange} {...restProps} />;
      }
      break;

    case 'checkboxgroup':
      {
        return (
          <Checkbox.Group
            onChange={onValueChange}
            {...restProps}
          ></Checkbox.Group>
        );
      }
      break;

    case 'datepicker':
      {
        return <DatePicker onChange={onValueChange} {...restProps} />;
      }
      break;

    case 'rangepicker':
      {
        return (
          <DatePicker.RangePicker onChange={onValueChange} {...restProps} />
        );
      }
      break;

    case 'timepicker':
      {
        return (
          <DatePicker.TimePicker onChange={onValueChange} {...restProps} />
        );
      }
      break;

    default: {
      throw `undefined form field type: "${field.type}"`;
    }
  }
};

const renderFormItem = (field, form) => {
  return (
    <Form.Item
      key={field.name}
      name={field.name}
      label={field.label}
      initialValue={field.initialValue}
      rules={field.rules}
    >
      {renderWidget(field, form)}
    </Form.Item>
  );
};

export default renderFormItem;
