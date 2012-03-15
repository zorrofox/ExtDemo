Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', '../examples/ux');
Ext.require([
             'Ext.grid.*',
             'Ext.ModelManager',
             'Ext.toolbar.Paging',
             'Ext.util.*',
             'Ext.data.*',
             'Ext.state.*',
             'Ext.form.*',
             'Ext.ModelManager',
             'Ext.selection.CellModel', 
             'Ext.ux.CheckColumn', 
             'Ext.ux.form.SearchField',
             'Ext.selection.CheckboxModel',
             'Ext.ux.ProgressBarPager',
             'Ext.tip.QuickTipManager',
             'Ext.ux.form.SearchField'
]);

Ext.onReady(function(){
	
	Ext.tip.QuickTipManager.init();
	
    Ext.define('Author',{
        extend: 'Ext.data.Model',
        fields: [
            'id','Name','Age'
        ],
        idProperty: 'id'
    });
    
//    var key;
    
    //创建数据源
    var store = Ext.create('Ext.data.Store', {
    	autoDestroy : true,
        //分页
        pageSize: 10,
        model: 'Author',
        //是否在服务器端排序
        remoteSort: true,
        proxy: {	
           //需要返回json数据
            type: 'ajax',
            url: 'http://localhost:8080/ExtDemo/author/authorjson',
            reader: {
                root: 'rows',
                type:'json'
            },
            simpleSortMode: true
        },
        sorters: [{
            //排序字段
            property: 'Age',
            //排序类型,默认ASC
            direction: 'DESC'
        }]
    });
    
     
    //多选
  var selModel = Ext.create('Ext.selection.CheckboxModel');
    //可编辑
    var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToMoveEditor: 1,
        autoCancel: false
    });
    //创建Grid
    var grid = Ext.create('Ext.grid.Panel',{
        height:400,
        width:720,
        x:150,
        y:7.5,
        title: '作者信息',
        store: store,
        selModel: selModel,
        columnLines: true,
        disableSelection: false,//禁止选择行
        frame: true,
        loadMask: true,
        renderTo: 'author',
        columns: [
//				{header: "id", flex:25, dataIndex: 'id', sortable: false, editor:{allowBlank: true}},
                {header: "Age", flex:25, dataIndex: 'Age', sortable: false, editor:{allowBlank: false}},
                {header: "Name", flex:25, dataIndex: 'Name', sortable: true, editor:{allowBlank: false}}
        ],
        
        listeners : {   
  	      'selectionchange' : function(sm, selections) {   
  	      grid.down('#removeButton').setDisabled(selections.length == 0);   
  	          }   
  	   	},   
        viewConfig: {
            id: 'gv',
            trackOver: false,
            stripeRows: false
        },
        dockedItems: [{
            dock: 'top',
            xtype: 'toolbar',
            items: [{
            	xtype:'button',
            	text:'添加数据',
            	tooltip:"添加新数据",
            	icon:'../images/fam/add.png',
            	handler: function(){
            		var b =  Ext.ModelManager.create({
            			id:'',
            			Name: '',
            			Age:''
            		},'Author');
                    store.insert(0, b);
                    rowEditing.startEdit(0, 0);
            	}
            },'-',{
            	xtype:'button',
            	text:'提交数据',
            	tooltip:"提交新增数据",
            	icon:'../images/fam/accept.png',
            	handler: function(){
            		var sm = grid.getSelectionModel();
            		var records = sm.getSelection();/**Returns an array of the currently selected records***/
            		var json = "";
            		for(var i = 0; i < records.length;i++){
//            			json = Ext.util.JSON.encode(name: records[i].data['Name'],age: records[i].data['Age']);
            			json = json  + '{' + '"name":' + '"'+records[i].data['Name']+ '"' + ',"age":' + records[i].data['Age']+'}';
            		}
            		onAdd(json);
//            		onAdd(json)
            	}
            },'-',{
            	xtype:'button',
            	text:'保存修改',
            	tooltip:"保存修改的数据",
            	icon:'../images/fam/cog.png',
            	handler: function(){
            		var sm = grid.getSelectionModel();
            		var records = sm.getSelection();
//            		onSave(records)
            		for(var i = 0; i < records.length;i++){
            			onSave(records[i])
            			
            		};
            		onSave()
            	}
            },'-',{
            	itemId: 'removeButton',
            	xtype: 'button',
            	text:'删除',
            	tooltip: '删除选中数据',
            	icon:'../images/fam/delete.gif',
            	handler: function(){
            		var sm = grid.getSelectionModel();
            		var records = sm.getSelection();
            		for(var i=0;i < records.length; i++){
            			delId(records[i].data['id'])
            		};
            	}
            },'-',{
            	itemId: 'Button',
                text:'选中行ID',
                tooltip:'Show Choose Id',
                icon:'../images/fam/information.png',
                handler:function(){
                    var record = grid.getSelectionModel().getSelection();
                    if(record.length == 0){
                        Ext.MessageBox.show({
                            title:"信息:",
                            msg:"未选中任何数据"
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
                            title:"所有选中行ID",
                            msg:ids
                        })
                    }
                }
            },'-',{
                width: 200,
                fieldLabel: '查询',
                labelWidth: 80,
                xtype: 'searchfield',
                store: store
            }]
        }, {
            dock: 'bottom',
            xtype: 'pagingtoolbar',
            store: store,
            pageSize: 25,
            displayInfo: true,
            displayMsg: '开始 {0} - {1}结束,共计{2}条',
            emptyMsg: '没有数据！'
        }],
        plugins: [rowEditing]
    })
    store.loadPage(1);
    
    function onSave(record){
    	Ext.Ajax.request({
    		url:'http://localhost:8080/ExtDemo/author/update',
    		method: 'POST',
    		params:{
	    		'id': record.data['id'],
	    		'Name': record.data['Name'],
	    		'Age': record.data['Age']
    		},
    		success: function(form,action){
    		}
    	});
    };
    
//    function onAdd(record){
//    	Ext.Ajax.request({
//    		url:'http://localhost:8080/ExtDemo/author/save',
//    		method: 'POST',
//			jsonData:Ext.util.JSON.encode(record),
//    		params:{
//    			'id': recor	d.data['id'],
//    			'Name': record.data['Name'],
//    			'Age': record.data['Age']
//    		},
//    		success: function(form,action){
//    		}
//    	});
//    }
    function onAdd(record){
    	Ext.Ajax.request({
    		url:'http://localhost:8080/ExtDemo/author/save',
    		method: 'POST',
//    		params:{
    			
//    			params:record
//    		}
    		jsonData:record
//    		jsonData:{
//    			name: record[0].data['Name'],
//    			age: record[0].data['Age'],
//    			data:record
//    		},
    	})
    };
    
    function delId(id){
		Ext.Ajax.request({
			url: 'http://localhost:8080/ExtDemo/author/delete',
			method: "POST",
			params: {
				"id" : id
			},
			success: function(form,action){
			}
		});
		store.load();
    }
})