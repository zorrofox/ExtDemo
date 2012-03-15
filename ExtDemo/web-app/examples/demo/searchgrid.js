Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', '../../examples/ux');
Ext.require([
    'Ext.grid.*',
    'Ext.toolbar.Paging',
    'Ext.util.*',
    'Ext.data.*',
    'Ext.ux.form.SearchField'
]);

Ext.onReady(function(){
    Ext.define('MyData',{
        extend: 'Ext.data.Model',
        fields: [
            'title','author',
            //��һ���ֶ���Ҫָ��mapping�������ֶΣ�����ʡ�Ե���
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
            url: 'searchgrid.asp',
            
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
    
    //����Grid
    var grid = Ext.create('Ext.grid.Panel',{
        store: store,
        columnLines: true,
        columns: [
                {text: "����", width: 120, dataIndex: 'title', sortable: true},
                {text: "����", width: 140, dataIndex: 'author', sortable: false},
                {text: "�����", width: 100, dataIndex: 'hits', sortable: true},
            {text: "���ʱ��", width: 150, dataIndex: 'addtime', sortable: true}
        ],
        height:400,
        width:520,
        x:20,
        y:40,
        title: 'ExtJS4 SearchGrid-Grid ����',
        disableSelection: true,
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
            items: {
                width: 300,
                fieldLabel: '����',
                labelWidth: 50,
                xtype: 'searchfield',
                store: store
            }
        }, {
            dock: 'bottom',
            xtype: 'pagingtoolbar',
            store: store,
            pageSize: 25,
            displayInfo: true,
            displayMsg: '��ʾ {0} - {1} �������� {2} ��',
            emptyMsg: 'û������'
        }]
        
    })
    store.loadPage(1);
})