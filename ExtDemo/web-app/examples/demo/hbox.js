    Ext.onReady(function(){
       var d1 = Ext.create('Ext.Panel',{
      title:'HBox 顶对齐，且组件在容器的左边',
      frame:true,
      width:600,
      height:100,
      items:[{
        anchor:'100%',
        layout: {
            type:'hbox',
            padding:'10',
            pack:'start',
            align:'top'
        },
        defaults:{margins:'0 5 0 0'},
        items:[{
            xtype:'button',
            text: 'Button 1'
        },{
            xtype:'button',
            text: 'Button 2'
        },{
            xtype:'button',
            text: 'Button 3'
        },{
            xtype:'button',
            text: 'Button 4'
        }]
      }]
    });
       
    d1.render('d1');


    var d2 = Ext.create('Ext.Panel',{
      title:'HBox 垂直对齐，且组件在容器的右边',
      frame:true,
      width:600,
      height:100,
      items:[{
        anchor:'100%',
        layout: {
            type:'hbox',
            padding:'10',
            align:'middle',
            pack:'end'
        },
        defaults:{margins:'0 5 0 0'},
        items:[{
            xtype:'button',
            text: 'Button 1'
        },{
            xtype:'button',
            text: 'Button 2'
        },{
            xtype:'button',
            text: 'Button 3'
        },{
            xtype:'button',
            text: 'Button 4'
        }]
      }]
    });
       
    d2.render('d2');

    var d3 = Ext.create('Ext.Panel',{
      title:'HBox 垂直水平居中，并且所有控件高度为最高控件的高度',
      frame:true,
      width:600,
      height:100,
      items:[{
         anchor:'100%',
            
         layout: {
            type: 'hbox',
            padding:'5',
            align:'stretchmax',
            pack:'center'
        },
        defaults:{margins:'0 5 0 0'},
        items:[{
            xtype:'button',
            text: 'Small Size'
        },{
            xtype:'button',
            scale: 'medium',
            text: 'Medium Size'
        },{
            xtype:'button',
            scale: 'large',
            text: 'Large Size'
        }]
      }]
    });
    d3.render('d3');
     })