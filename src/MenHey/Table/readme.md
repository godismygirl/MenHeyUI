### MenHeyForm params：

@columns: []
@rowSelection? : 'checkbox' | 'radio' | null
@dataSource: {}
@paginated: boolean     //是否分页
@buttons: []
@buttonLayout: 'left' | 'right'

===

### @columns props
{
    title: 'Name',
    dataIndex: 'name',
    render: text => {},
    tooltip: boolean        //以tooltip方式显示超出宽度的文本
}

===

### @dataSource
{
    url: string
    method: 'get' | 'post' | 'put' | 'delete' 
    params {}   //when method === 'get' 
    data: {}    //when mehod !== 'get'
}

===
### @buttons props
{
    type: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default'
    text: string
    onClick: select => {}
}