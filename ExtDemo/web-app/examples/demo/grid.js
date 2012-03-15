Ext.require([
    'Ext.grid.*',
    'Ext.data.*'
]);
Ext.onReady(function(){
    Ext.define('MyData',{
        extend: 'Ext.data.Model',
        fields: [
            //第一个字段需要指定mapping，其他字段，可以省略掉。
            {name:'UserName',mapping:'UserName'},
             'Sex',
             'Age',
             'XueHao',
             'BanJi'
        ]
    });
    
    //创建数据源
    var store = Ext.create('Ext.data.Store', {
        model: 'MyData',
        proxy: {
           //异步获取数据，这里的URL可以改为任何动态页面，只要返回JSON数据即可
            type: 'ajax',
            url: 'mydata.json',
            
            reader: {
                type: 'json',
                root: 'items',
                //totalProperty  : 'total'
            }
        },
        autoLoad: true
    });
    
    //创建Grid
    var grid = Ext.create('Ext.grid.Panel',{
        store: store,
        columns: [
            {text: "姓名", width: 120, dataIndex: 'UserName', sortable: true},
            {text: "性别", flex: 1, dataIndex: 'Sex', sortable: false},
            {text: "年龄", width: 100, dataIndex: 'Age', sortable: true},
            {text: "学号", width: 100, dataIndex: 'XueHao', sortable: true},
            {text: "班级", width: 100, dataIndex: 'BanJi', sortable: true}
        ],
        height:400,
        width:480,
        x:20,
        y:40,
        title: 'ExtJS4 Grid示例',
        renderTo: 'grid',
        viewConfig: {
            stripeRows: true
        }
    })
})