
Ext.require([
    'Ext.grid.*',
    'Ext.toolbar.Paging',
    'Ext.data.*',
	'Ext.util.*'
]);

Ext.onReady(function(){
    Ext.define('MyData',{
        extend: 'Ext.data.Model',
        fields: [
            'title','author',
            //第一个字段需要指定mapping，其他字段，可以省略掉。
            {name:'hits',type: 'int'},
             'addtime'
        ]
    });
    
    //创建数据源
    var store = Ext.create('Ext.data.Store', {
        //分页大小
        pageSize: 50,
        model: 'MyData',
        //是否在服务端排序
        remoteSort: true,
        proxy: {
           //异步获取数据，这里的URL可以改为任何动态页面，只要返回JSON数据即可
            type: 'ajax',
            url: 'mydata.asp',
            
            reader: {
                root: 'items',
                totalProperty  : 'total'
            },
            simpleSortMode: true
        },
        sorters: [{
            //排序字段。
            property: 'hits',
            //排序类型，默认为 ASC
            direction: 'DESC'
        }]
    });
    
    //创建Grid
    var grid = Ext.create('Ext.grid.Panel',{
        store: store,
		columnLines: true,
        columns: [{
            text:"基本信息",
            columns:[
                {text: "标题", width: 120, dataIndex: 'title', sortable: true},
                {text: "作者", width: 200, dataIndex: 'author', sortable: false},
                {text: "点击数", width: 100, dataIndex: 'hits', sortable: true}]
            },
            {text: "添加时间", width: 100, dataIndex: 'addtime', sortable: true}
        ],
        height:400,
        width:520,
        x:20,
        y:40,
        title: 'ExtJS4 Grid 分页示例',
        disableSelection: true,
        loadMask: true,
        renderTo: 'demo',
        viewConfig: {
            id: 'gv',
            trackOver: false,
            stripeRows: false
        },
        
        bbar: Ext.create('Ext.PagingToolbar', {
            store: store,
            displayInfo: true,
            displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
            emptyMsg: "没有数据"
        })
    })
    store.loadPage(1);
})