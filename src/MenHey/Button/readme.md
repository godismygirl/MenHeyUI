## 对antd button 的简单封装，提供了几种预设的按钮款式
===
### MenHeyBtn params：

@text       string
@danger     boolean
@onClick    Function
@type       string
---
preset @type:
'Search'     //查询
'Add'       //新增
'Edit'      //修改
'Delete'    //删除
'Reset'     //重置
'Cancel'    //取消
'Confirm'   //确定按钮

### 使用方法

<MenHeyBtn type="primary" text="确定" danger={true} onClick={clickHandlerFunc} />
<MenHeyBtn.Confirm onClick={clickHandlerFunc} />