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
    
    //��������Դ
    var store = Ext.create('Ext.data.Store', {
        //��ҳ��С
        pageSize: 50,
        model: 'MyData',
        //�Ƿ��ڷ��������
        remoteSort: true,
        proxy: {
           //�첽��ȡ���ݣ������URL���Ը�Ϊ�κζ�̬ҳ�棬ֻҪ����JSON���ݼ���
            type: 'ajax',
            url: 'selectgrid.asp',
            
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
    
    //������ѡ
     var selModel = Ext.create('Ext.selection.CheckboxModel');
    //����Grid
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
        
        disableSelection: false,//ֵΪTRUE����ʾ��ֹѡ����
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
                            title:"��ѡID�б�",
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
            displayMsg: 'TOTAL {0} - {1} ������ {2} ��',
            emptyMsg: 'NO INFO'
        }]
        
    })
    store.loadPage(1);
})