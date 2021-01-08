### MenHeyForm params：

@layout?: 'horizontal' | 'vertical' | 'inline'
@cols?: number
@fields: []
@buttons?: []

===

### @fields props
{
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
    onChange?: Function;
    initialSource?: { text: string; value: string }[];
    ... //see individual antd form widget prop params

    name: string;
    label: string;
    initialValue?: any;
    rules?: { required: boolean; message: string }[];
}

===
### @buttons props
{
    type: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default'
    text: string
    onClick: form => {}
}