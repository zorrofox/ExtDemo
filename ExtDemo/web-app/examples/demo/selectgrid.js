Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', '../../examples/ux');
Ext.require([
    'Ext.grid.*',
    'Ext.toolbar.Paging',
    'Ext.util.*',
    'Ext.data.*',
    'Ext.ux.form.SearchField',
    'Ext.selection.CheckboxModel'
]);

Ext.onReady(function(){
    Ext.define('MyData',{
        extend: 'Ext.data.Model',
        fields: [
            'id','title','author',
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
            url: 'selectgrid.asp',
            
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
    
    //创建多选
     var selModel = Ext.create('Ext.selection.CheckboxModel');
    //创建Grid
    var grid = Ext.create('Ext.grid.Panel',{
        store: store,
        selModel: selModel,
        columnLines: true,
        columns: [
                {text: "title", width: 120, dataIndex: 'title', sortable: true},
                {text: "author", width: 140, dataIndex: 'author', sortable: false},
                {text: "cleckNum", width: 100, dataIndex: 'hits', sortable: true},
            {text: "Add Time", width: 150, dataIndex: 'addtime', sortable: true}
        ],
        height:400,
        width:520,
        x:20,
        y:40,
        title: 'sssssssssssssssss',
        
        disableSelection: false,//值为TRUE，表示禁止选择行
        frame: true,
        loadMask: true,
        renderTo: 'demo',
        viewConfig: {
            id: 'gv',
            trackOver: false,
            stripeRows: false
        },
        dockedItems: [{
            dock: 'top',
            xtype: 'toolbar',
            items: [{
                itemId: 'Button',
                text:'Search ID',
                tooltip:'Add a new row',
                iconCls:'add',
                handler:function(){
                    var record = grid.getSelectionModel().getSelection();
                    if(record.length == 0){
                        Ext.MessageBox.show({
                            title:"NOTICE",
                            msg:"THERE IS NO SELECTED!"
                            //icon: Ext.MessageBox.INFO
                        })
                        return;
                    }else{
                        var ids = "";
                        for(var i = 0; i < record.length; i++){
                            ids += record[i].get("id")
                            if(i<record.length-1){
                                ids = ids + ",";
                            }
                        }
                        Ext.MessageBox.show({
                            title:"所选ID列表",
                            msg:ids
                            //icon: Ext.MessageBox.INFO
                        })
                    }
                }
            },'-',{
                width: 300,
                fieldLabel: 'SEARCH',
                labelWidth: 50,
                xtype: 'searchfield',
                store: store
            }]
        }, {
            dock: 'bottom',
            xtype: 'pagingtoolbar',
            store: store,
            pageSize: 25,
            displayInfo: true,
            displayMsg: 'TOTAL {0} - {1} ，共计 {2} 条',
            emptyMsg: 'NO INFO'
        }]
        
    })
    store.loadPage(1);
})