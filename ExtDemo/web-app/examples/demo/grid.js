Ext.require([
    'Ext.grid.*',
    'Ext.data.*'
]);
Ext.onReady(function(){
    Ext.define('MyData',{
        extend: 'Ext.data.Model',
        fields: [
            //��һ���ֶ���Ҫָ��mapping�������ֶΣ�����ʡ�Ե���
            {name:'UserName',mapping:'UserName'},
             'Sex',
             'Age',
             'XueHao',
             'BanJi'
        ]
    });
    
    //��������Դ
    var store = Ext.create('Ext.data.Store', {
        model: 'MyData',
        proxy: {
           //�첽��ȡ���ݣ������URL���Ը�Ϊ�κζ�̬ҳ�棬ֻҪ����JSON���ݼ���
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
    
    //����Grid
    var grid = Ext.create('Ext.grid.Panel',{
        store: store,
        columns: [
            {text: "����", width: 120, dataIndex: 'UserName', sortable: true},
            {text: "�Ա�", flex: 1, dataIndex: 'Sex', sortable: false},
            {text: "����", width: 100, dataIndex: 'Age', sortable: true},
            {text: "ѧ��", width: 100, dataIndex: 'XueHao', sortable: true},
            {text: "�༶", width: 100, dataIndex: 'BanJi', sortable: true}
        ],
        height:400,
        width:480,
        x:20,
        y:40,
        title: 'ExtJS4 Gridʾ��',
        renderTo: 'grid',
        viewConfig: {
            stripeRows: true
        }
    })
})