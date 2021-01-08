export interface FieldProps {
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
  initialValue?: any;
  initialSource?: { text: string; value: string }[];
  rules?: { required: boolean; message: string }[];
}
