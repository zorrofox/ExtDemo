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
     
    //��������Դ 
    var store = Ext.create('Ext.data.Store', { 
        //��ҳ��С 
        pageSize: 50, 
        model: 'MyData', 
        //�Ƿ��ڷ�������� 
        remoteSort: true, 
        autoDestroy: true, 
        proxy: { 
           //�첽��ȡ���ݣ������URL���Ը�Ϊ�κζ�̬ҳ�棬ֻҪ����JSON���ݼ��� 
            type: 'ajax', 
            url: 'editgrid.asp', 
             
            reader: { 
                root: 'items', 
                totalProperty  : 'total' 
            }, 
            simpleSortMode: true 
        }, 
        sorters: [{ 
            //�����ֶΡ� 
            property: 'hits', 
            //�������ͣ�Ĭ��Ϊ ASC 
            direction: 'DESC' 
        }] 
    }); 
    //����������,�������ݡ� 
    var cbstore = Ext.create('Ext.data.Store', {  
    fields: ['id', 'name'],  
    data : [  
        {"id":"1","name":"����"}, 
        {"id":"2","name":"����Ա"}, 
        {"id":"3","name":"�༭"}, 
        {"id":"4","name":"�ܱ༭"}, 
        {"id":"5","name":"����Ա"} 
    ] 
});  

     
    //������ѡ 
     var selModel = Ext.create('Ext.selection.CheckboxModel'); 
     var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', { 
        clicksToEdit: 1 
     }); 
    //����Grid 
    var grid = Ext.create('Ext.grid.Panel',{ 
        store: store, 
        selModel: selModel, 
        columnLines: true, 
        columns: [{ 
            id:"title", 
            header: "����",  
            width: 110,  
            dataIndex: 'title',  
            sortable: true, 
            field: { 
                allowBlank: false 
            } 
        },{ 
            header: "����", 
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
            header: "�����",  
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
            header: "���ʱ��",  
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
            header:'���', 
            dataIndex:'checked', 
            width:55 
        }], 
        height:400, 
        width:520, 
        x:20, 
        y:40, 
        title: 'ExtJS4 EditGrid(�ɱ༭��Grid)', 
         
        disableSelection: false,//ֵΪTRUE����ʾ��ֹѡ�� 
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
                text:'��ʾ��ѡ', 
                tooltip:'Add a new row', 
                iconCls:'add', 
                handler:function(){ 
                    var record = grid.getSelectionModel().getSelection(); 
                    if(record.length == 0){ 
                        Ext.MessageBox.show({ 
                            title:"��ʾ", 
                            msg:"����ѡ����Ҫ��������!", 
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
                            title:"��ѡID�б�", 
                            msg:ids 
                            //icon: Ext.MessageBox.INFO 
                        }) 
                    } 
                } 
            },'-',{ 
                width: 300, 
                fieldLabel: '����', 
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
            displayMsg: '��ʾ {0} - {1} �������� {2} ��', 
            emptyMsg: 'û������' 
        }], 
        plugins: [cellEditing] 
         
    }) 
    store.loadPage(1); 
    grid.on('edit', onEdit, this); 
     
    function onEdit(){ 
        var record = grid.getSelectionModel().getSelection()[0]; 
        //��������첽����������Extjs���첽�������ﲻ����ʾ�����г�����ֵ�� 
        var title   = record.get('title'); 
        var author  = record.get('author');//ע�⣬����õ�����idֵ��������nameֵ,���û���޸����ߣ���ô�õ���ֵ��Ĭ����ʾ���ַ����������Ҫ�ڷ���˽����жϲ����� 
        var clk     = record.get('hits'); 
        var addtime = Ext.Date.dateFormat(record.get('addtime'), 'Y-m-d'); 
        var checked = record.get('checked'); 
        Ext.MessageBox.show({ 
            title:"�޸ĵ�����Ϊ", 
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
