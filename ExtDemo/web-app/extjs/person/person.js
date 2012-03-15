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
    'Ext.tip.QuickTipManager'
]);

Ext.onReady(function(){
	
	Ext.tip.QuickTipManager.init();
	
	Ext.define('Person',{
		extend:'Ext.data.Model',
		fields:['id','Name',
		        {name:'Age',type:'int'},
		        'Address'],
		idProperty: 'id'
	});
    
	var key;
	
    //创建数据源
    var store = Ext.create('Ext.data.Store', {
    	autoDestroy : true,
        //分页大小
        pageSize: 10,
        model: 'Person',
        //是否在服务端排序
        remoteSort: true,
        proxy: {
           //异步获取数据，这里的URL可以改为任何动态页面，只要返回JSON数据即可
	            type: 'ajax',
	            url: 'http://localhost:8080/ExtDemo/person/personjson',
            	reader:{
            		root:'rows',
    				type:'json'
    			},
            simpleSortMode: true
        },
        sorters: [{
            //排序字段。
            property: 'Id',
            //排序类型，默认为 ASC
            direction: 'DESC'
        }]
    });
    
    store.load();
    
    //创建多选
    var selModel = Ext.create('Ext.selection.CheckboxModel');
    
    //可编辑
    var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToMoveEditor: 1,
        autoCancel: false
    });
    //创建Grid
    var grid = Ext.create('Ext.grid.Panel',{
        store: store,
        selModel: selModel,
        columnLines: true,
        height:400,
        width:520,
        x:5,
        y:5,
        title: 'sssssssssssssssss',
        renderTo: 'person',
//        selType: 'rowmodel',
        disableSelection: false,//值为TRUE，表示禁止选择行
        frame: true,
        loadMask: true,
        columns: [{header: "id",
	                width: 121,
	                dataIndex: 'id',
	                sortable: false,
	                editor:{
	                	allowBlank: false
	                	}
	              },{
	               header: "Name",
		           width: 121,
		           dataIndex: 'Name',
		           sortable: true,
		           editor:{
		        	   allowBlank: false
		        	   }
	              },{
		           header: "Age", 
		           width: 121,
		           dataIndex: 'Age',
		           sortable: false,
		           editor:{
		        	   xtype: 'numberfield',
		        	   allowBlank: false,
		        	   min: 0,
		        	   max: 130
		        	   }
	              },{
	               header: "Address",
	               width: 121,
	               dataIndex: 'Address',
	               sortable: true,
	               editor:{allowBlank: false}
	              }],
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
            	xtype: 'button',
            	text: 'Add',
            	tooltip: 'Add New Info',
            	icon:'../images/fam/add.png',
            	handler: function(){
            		var p = Ext.ModelManager.create({
            			id: 'New id',
            			Name: 'New Name',
            			Age: 'New Age',
            			Address: 'New Address'
//            			active: true
            		},'Person');
                    store.insert(0, p);
                    rowEditing.startEdit(0, 0);
//                    cellEditing.startEditByPosition({row: 0, column: 0});
            	}
            },
//            '-',{
//            	xtype: 'button',
//            	text: 'Update',
//            	tooltip: 'Update Info',
//            	icon: '../images/fam/cog_edit.png',
//            	handler: function(){
//            		var sm = grid.getSelectionModel();
////            		rowEditing.starEdit(sm.getSelection()[0],0)
//            	}
//            },
            '-',{
                itemId: 'Button',
                text:'Search ID',
                tooltip:'Show Choose Id',
                width:100,
                iconCls:'add',
                handler:function(){
                    var record = grid.getSelectionModel().getSelection();
                    if(record.length == 0){
                        Ext.MessageBox.show({
                            title:"提示：",
                            msg:"未选中任何数据!"
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
            	itemId: 'removeButton',
            	xtype: 'button',
            	text:'Delete',
            	icon: '../images/fam/delete.gif',
            	handler: function(){
            		var sm = grid.getSelectionModel();
            		var records = sm.getSelection();
//            		rowEditing.cancelEdit();
//            		store.remove(records);
//            		sm.select(0);
            		for(var i=0;i < records.length; i++){
            			delId(records[i].data['id'])
            		};
//            		rowEditing.cancelEdit();
//            		store.remove(records)
            	}
            },'-',{
                width: 200,
                fieldLabel: 'SEARCH',
                labelWidth: 100,
                xtype: 'searchfield',
                store: store
            }]
        }, {
            dock: 'bottom',
            xtype: 'pagingtoolbar',
            store: store,
            pageSize: 25,
            displayInfo: true,
            displayMsg: ' Start:{0} - End:{1} , Total: {2}',
            emptyMsg: 'NO INFO'
        }],
        plugins: [rowEditing]
    })
    store.loadPage(1);
    
    grid.on('edit',onEdit,this);
    
    function onEdit(e){
    	e.record.commit();
    	Ext.Ajax.request({
    		url: 'http://localhost:8080/ExtDemo/person/update',
    		method: "POST",
    		params: {
//    			data:
    		},
    		success: function(response){
    			var text = response.responseText;
//    			alert(text);
    		}
    	});
    	store.load();
    };
    
    function delId(id){
    	Ext.Ajax.request({
    		url: 'http://localhost:8080/ExtDemo/person/delete',
    		method: "POST",
    		params: {
    			"id" : id
    		},
    		success: function(form,action){
    			
    		}
    	});
    	store.load({params:{start:0,limit:5}});
    }
})