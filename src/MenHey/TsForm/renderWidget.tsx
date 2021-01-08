import React from 'react';
import {
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Radio,
  Checkbox,
  DatePicker,
  TimePicker,
} from 'antd';
import { FieldProps } from './interface';

const getWidgetByType = (type: string) => {
  switch (type) {
    case 'input':
      {
        return <Input />;
      }
      break;

    case 'number':
      {
        return <InputNumber />;
      }
      break;

    case 'password':
      {
        return <Input.Password />;
      }
      break;

    case 'textarea':
      {
        return <Input.TextArea />;
      }
      break;

    case 'select':
      {
        return <Select />;
      }
      break;

    case 'switch':
      {
        return <Switch />;
      }
      break;

    case 'radio':
      {
        return <Radio />;
      }
      break;

    case 'radiogroup':
      {
        return <Radio.Group></Radio.Group>;
      }
      break;

    case 'checkbox':
      {
        return <Checkbox />;
      }
      break;

    case 'checkboxgroup':
      {
        return <Checkbox.Group></Checkbox.Group>;
      }
      break;

    case 'datepicker':
      {
        return <DatePicker />;
      }
      break;

    case 'rangepicker':
      {
        return <DatePicker.RangePicker />;
      }
      break;

    case 'timepicker':
      {
        return <DatePicker.TimePicker />;
      }
      break;

    default: {
      throw `undefined form field type: "${type}"`;
    }
  }
};

const renderWidget = (field: FieldProps, form: any) => {};

export default renderWidget;
