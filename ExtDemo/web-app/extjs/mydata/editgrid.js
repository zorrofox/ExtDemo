Ext.Loader.setConfig({enabled: true}); 
Ext.Loader.setPath('Ext.ux', '../../examples/ux'); 
Ext.require([ 
    'Ext.grid.*', 
    'Ext.toolbar.Paging', 
    'Ext.util.*', 
    'Ext.data.*', 
    'Ext.state.*', 
    'Ext.form.*', 
    'Ext.ux.form.SearchField', 
    'Ext.selection.CellModel', 
    'Ext.ux.CheckColumn', 
    'Ext.selection.CheckboxModel' 
]); 

Ext.onReady(function(){ 
    var isEdit = false; 
     
    function formatDate(value){ 
        return value ? Ext.Date.dateFormat(value, 'Y-m-d') : ''; 
    } 
     
    Ext.define('MyData',{ 
        extend: 'Ext.data.Model', 
        fields: [ 
            {name:'id'}, 
            {name:'title',type:'string'}, 
            {name:'author'}, 
            {name:'hits',type: 'int'}, 
            {name:'addtime',type:'date',dataFormat:'Y-m-d'}, 
            {name:'checked',type:'bool'} 
        ] 
    }); 
     
    //创建数据源 
    var store = Ext.create('Ext.data.Store', { 
        //分页大小 
        pageSize: 50, 
        model: 'MyData', 
        //是否在服务端排序 
        remoteSort: true, 
        autoDestroy: true, 
        proxy: { 
           //异步获取数据，这里的URL可以改为任何动态页面，只要返回JSON数据即可 
            type: 'ajax', 
            url: 'editgrid.asp', 
             
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
    //下拉框数据,测试数据。 
    var cbstore = Ext.create('Ext.data.Store', {  
    fields: ['id', 'name'],  
    data : [  
        {"id":"1","name":"佚名"}, 
        {"id":"2","name":"管理员"}, 
        {"id":"3","name":"编辑"}, 
        {"id":"4","name":"总编辑"}, 
        {"id":"5","name":"测试员"} 
    ] 
});  

     
    //创建多选 
     var selModel = Ext.create('Ext.selection.CheckboxModel'); 
     var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', { 
        clicksToEdit: 1 
     }); 
    //创建Grid 
    var grid = Ext.create('Ext.grid.Panel',{ 
        store: store, 
        selModel: selModel, 
        columnLines: true, 
        columns: [{ 
            id:"title", 
            header: "标题",  
            width: 110,  
            dataIndex: 'title',  
            sortable: true, 
            field: { 
                allowBlank: false 
            } 
        },{ 
            header: "作者", 
            width: 120,  
            dataIndex: 'author',  
            id:'gc', 
            sortable: false, 
            field: { 
                xtype: 'combobox', 
                id:'authors', 
                typeAhead: true, 
                triggerAction: 'all', 
                queryMode: 'local',  
                selectOnTab: true, 
                store: cbstore, 
                lazyRender: true, 
                displayField:'name', 
                valueField:'id', 
                listClass: 'x-combo-list-small', 
                listeners:{     
                    select : function(combo, record,index){ 
                        isEdit = true; 
                    } 
                } 
                  
            }, 
            renderer:rendererData 
        },{ 
            header: "点击数",  
            width: 80,  
            dataIndex: 'hits',  
            sortable: true, 
            field: { 
                xtype: 'numberfield', 
                allowBlank: false, 
                minValue: 0, 
                maxValue: 100000 
            } 
        },{ 
            header: "添加时间",  
            width: 100,  
            dataIndex: 'addtime',  
            sortable: true, 
            renderer: formatDate, 
            field: { 
                xtype: 'datefield', 
                format: 'y-m-d', 
                minValue: '01/01/06' 
            } 
        },{ 
            xtype: 'checkcolumn', 
            header:'审核', 
            dataIndex:'checked', 
            width:55 
        }], 
        height:400, 
        width:520, 
        x:20, 
        y:40, 
        title: 'ExtJS4 EditGrid(可编辑的Grid)', 
         
        disableSelection: false,//值为TRUE，表示禁止选择 
        frame: true, 
        selType: 'cellmodel', 
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
                text:'显示所选', 
                tooltip:'Add a new row', 
                iconCls:'add', 
                handler:function(){ 
                    var record = grid.getSelectionModel().getSelection(); 
                    if(record.length == 0){ 
                        Ext.MessageBox.show({ 
                            title:"提示", 
                            msg:"请先选择您要操作的行!", 
                            icon: Ext.MessageBox.INFO, 
                            buttons: Ext.Msg.OK 
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
                fieldLabel: '搜索', 
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
            displayMsg: '显示 {0} - {1} 条，共计 {2} 条', 
            emptyMsg: '没有数据' 
        }], 
        plugins: [cellEditing] 
         
    }) 
    store.loadPage(1); 
    grid.on('edit', onEdit, this); 
     
    function onEdit(){ 
        var record = grid.getSelectionModel().getSelection()[0]; 
        //这里进行异步操作，关于Extjs的异步操作这里不做演示，仅列出所有值。 
        var title   = record.get('title'); 
        var author  = record.get('author');//注意，这里得到的是id值，而不是name值,如果没有修改作者，那么得到的值是默认显示的字符串，这个需要在服务端进行判断并处理。 
        var clk     = record.get('hits'); 
        var addtime = Ext.Date.dateFormat(record.get('addtime'), 'Y-m-d'); 
        var checked = record.get('checked'); 
        Ext.MessageBox.show({ 
            title:"修改的数据为", 
            msg:title+"\r\n"+author+"\r\n"+clk+"\r\n"+addtime+"\r\n"+checked, 
            icon: Ext.MessageBox.INFO, 
            buttons: Ext.Msg.OK 
        }) 
    } 
     
    function rendererData(value,metadata,record){ 
        if(isEdit){ 
            var index = cbstore.find(Ext.getCmp('authors').valueField,value); 
            var record = cbstore.getAt(index); 
            return record.data.name; 
        }else{ 
            return value; 
        } 
         
    } 
}) 
