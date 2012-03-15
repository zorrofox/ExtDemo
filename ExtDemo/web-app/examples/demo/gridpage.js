
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
            url: 'mydata.asp',
            
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
        columns: [{
            text:"������Ϣ",
            columns:[
                {text: "����", width: 120, dataIndex: 'title', sortable: true},
                {text: "����", width: 200, dataIndex: 'author', sortable: false},
                {text: "�����", width: 100, dataIndex: 'hits', sortable: true}]
            },
            {text: "���ʱ��", width: 100, dataIndex: 'addtime', sortable: true}
        ],
        height:400,
        width:520,
        x:20,
        y:40,
        title: 'ExtJS4 Grid ��ҳʾ��',
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
            displayMsg: '��ʾ {0} - {1} �������� {2} ��',
            emptyMsg: "û������"
        })
    })
    store.loadPage(1);
})