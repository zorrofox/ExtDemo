 Ext.onReady(function(){   
            Ext.QuickTips.init();   
            	
            var ${domainClass.propertyName}CreateForm = new Ext.form.FormPanel({   
                labelAlign: 'right',   
                labelWidth: 80,   
                frame: true,   
                url: '/foundation/${domainClass.propertyName}/createJSON',   
                defaultType: 'textfield',   
                items: [   
                    {fieldLabel:'id',name: 'id',xtype: 'numberfield',hidden:true,hideLabel:true},<%  excludedProps = Event.allEvents.toList() << 'version' << 'id' << 'dateCreated' << 'lastUpdated'  
                    persistentPropNames = domainClass.persistentProperties*.name   
                    props = domainClass.properties.findAll { persistentPropNames.contains(it.name) && !excludedProps.contains(it.name) }   
                    Collections.sort(props, comparator.constructors[0].newInstance([domainClass] as Object[]))   
                    display = true  
                    props.eachWithIndex { p, i ->   
                                if (!Collection.class.isAssignableFrom(p.type)) {   
                                    if (hasHibernate) {   
                                        cp = domainClass.constrainedProperties[p.name]   
                                        display = (cp ? cp.display : true)   
                                    }   
                                    if (display) { %>   
                    {fieldLabel: '\${cgDomainProperties.${p.name}.chinese}',name: '${p.name}'<%   
                    output(p,cp)   
                    %>}<% if(props.size()>i+1){out<<","} %><%  }   }   } %>   
                ]   
            });   
  
            var ${domainClass.propertyName}CreateWin = new Ext.Window({   
                el: '${domainClass.propertyName}CreateWin',   
                closable:false,   
                layout: 'fit',   
                width: 400,   
                title: '����\${entityName}',   
                height: 300,   
                closeAction: 'hide',   
                items: [${domainClass.propertyName}CreateForm],   
                buttons: [{   
                    text:'����',   
                    handler: function(){   
                        ${domainClass.propertyName}CreateForm.getForm().submit({   
                            success:function(${domainClass.propertyName}CreateForm, action){   
                                Ext.foundation.msg('��Ϣ', action.result.msg);   
                                ${domainClass.propertyName}CreateWin.hide();   
                                store.reload();   
                                },   
                            failure:function(){   
                                Ext.foundation.msg('����', "����\${entityName}ʧ��!");   
                            }   
                        });   
                    }   
                },{   
                    text: 'ȡ ��',   
                    handler: function(){   
                        ${domainClass.propertyName}CreateWin.hide();   
                    }   
                }]   
            });   
  
            var ${domainClass.propertyName}UpdateForm = new Ext.form.FormPanel({   
                labelAlign: 'right',   
                labelWidth: 80,   
               frame: true,   
                url: '/foundation/${domainClass.propertyName}/updateJSON',   
                defaultType: 'textfield',   
                items: [   
                    {fieldLabel:'id',name: 'id',xtype: 'numberfield',hidden:true,hideLabel:true},<%  excludedProps = Event.allEvents.toList() << 'version' << 'id' << 'dateCreated' << 'lastUpdated'  
                    persistentPropNames = domainClass.persistentProperties*.name   
                    props = domainClass.properties.findAll { persistentPropNames.contains(it.name) && !excludedProps.contains(it.name) }   
                    Collections.sort(props, comparator.constructors[0].newInstance([domainClass] as Object[]))   
                    display = true  
100.                    props.eachWithIndex { p, i ->   
101.                                if (!Collection.class.isAssignableFrom(p.type)) {   
102.                                    if (hasHibernate) {   
103.                                        cp = domainClass.constrainedProperties[p.name]   
104.                                        display = (cp ? cp.display : true)   
105.                                    }   
106.                                    if (display) { %>   
107.                    {fieldLabel: '\${cgDomainProperties.${p.name}.chinese}',name: '${p.name}',xtype: <% if(p.type==String.class){ out << "'textfield'"} else if(p.type==Date.class){ out << "'datefield',format:'Y-m-d'"}%>}<% if(props.size()>i+1){out<<","} %><%  }   }   } %>   
108.                ]   
109.            });   
110.  
111.            var ${domainClass.propertyName}UpdateWin = new Ext.Window({   
112.                el: '${domainClass.propertyName}UpdateWin',   
113.                closable:false,   
114.                layout: 'fit',   
115.                width: 400,   
116.                title: '�޸�\${entityName}',   
117.                height: 300,   
118.                closeAction: 'hide',   
119.                items: [${domainClass.propertyName}UpdateForm],   
120.                buttons: [{   
121.                    text:'����',   
122.                    handler: function(){   
123.                        ${domainClass.propertyName}UpdateForm.getForm().submit({   
124.                            success:function(${domainClass.propertyName}UpdateForm, action){   
125.                                Ext.foundation.msg('��Ϣ', action.result.msg);   
126.                                ${domainClass.propertyName}UpdateWin.hide();   
127.                                store.reload();   
128.                                },   
129.                            failure:function(){   
130.                                Ext.foundation.msg('����', "����\${entityName}ʧ��!");   
131.                            }   
132.                        });   
133.                    }   
134.                },{   
135.                    text: 'ȡ ��',   
136.                    handler: function(){   
137.                        ${domainClass.propertyName}UpdateWin.hide();   
138.                    }   
139.                }]   
140.            });   
141.  
142.            var ${domainClass.propertyName}DetailForm = new Ext.form.FormPanel({   
143.                labelAlign: 'right',   
144.                labelWidth: 80,   
145.                frame: true,   
146.                url: '/foundation/${domainClass.propertyName}/detailJSON',   
147.                defaultType: 'textfield',   
148.                items: [   
149.                    {fieldLabel:'id',name: 'id',xtype: 'numberfield',hidden:true,hideLabel:true},<%  excludedProps = Event.allEvents.toList() << 'version' << 'id'  
150.                    persistentPropNames = domainClass.persistentProperties*.name   
151.                    props = domainClass.properties.findAll { persistentPropNames.contains(it.name) && !excludedProps.contains(it.name) }   
152.                    Collections.sort(props, comparator.constructors[0].newInstance([domainClass] as Object[]))   
153.                    display = true  
154.                    props.eachWithIndex { p, i ->   
155.                                if (!Collection.class.isAssignableFrom(p.type)) {   
156.                                    if (hasHibernate) {   
157.                                        cp = domainClass.constrainedProperties[p.name]   
158.                                        display = (cp ? cp.display : true)   
159.                                    }   
160.                                    if (display) { %>   
161.                    {fieldLabel: '\${cgDomainProperties.${p.name}.chinese}',name: '${p.name}',readOnly: true, xtype: <% if(p.type==String.class){ out << "'textfield'"} else if(p.type==Date.class){ out << "'datefield',format:'Y-m-d'"}%>}<% if(props.size()>i+1){out<<","} %><%  }   }   } %>   
162.                ]   
163.            });   
164.  
165.            var ${domainClass.propertyName}DetailWin = new Ext.Window({   
166.                el: '${domainClass.propertyName}DetailWin',   
167.                closable:false,   
168.                layout: 'fit',   
169.                width: 400,   
170.                title: '\${entityName}��ϸ',   
171.                height: 300,   
172.                closeAction: 'hide',   
173.                items: [${domainClass.propertyName}DetailForm],   
174.                buttons: [{   
175.                    text: 'ȷ��',   
176.                    handler: function(){   
177.                        ${domainClass.propertyName}DetailWin.hide();   
178.                    }   
179.                }]   
180.            });   
181.  
182.            var tb = new Ext.Toolbar();   
183.            tb.render('toolbar');   
184.  
            tb.add({   
                text: '�½�',   
                icon: '/foundation/images/skin/database_add.png',   
                handler:function(){   
                    ${domainClass.propertyName}CreateWin.show(this);   
                }   
            },{   
                text: '�޸�',   
                icon: '/foundation/images/skin/database_edit.png',   
                handler: function(){   
                    var id = (grid.getSelectionModel().getSelected()).id;   
                    ${domainClass.propertyName}UpdateForm.getForm().load({   
                        url:'/foundation/${domainClass.propertyName}/detailJSON?id='+id,   
                        success:function(form,action){},   
                        failure:function(){   
                            Ext.foundation.msg('����', "���������ִ����Ժ�����!");   
                        }   
                    });   
 
                    customerUpdateWin.show();   
                }   
            },{   
                text: 'ɾ��',   
                icon: '/foundation/images/skin/database_delete.png',   
                handler: function(){   
                    var count=sm.getCount();   
                    if(count==0)   
                    {   
                        Ext.foundation.msg('ע��', "��ѡ��Ҫɾ���ļ�¼");   
                    }else {   
                        var records = sm.getSelections();   
                        var id=[];   
                        for(var i=0;i<count;i++)   
                        {   
                            id.push(records[i].id);   
                        }   
                        Ext.MessageBox.confirm('��Ϣ', '��ȷ��ɾ��' + id + '��¼?', function(btn) {   
                            if (btn == 'yes') {   
                                Ext.Ajax.request({   
                                    url: '/foundation/${domainClass.propertyName}/deleteJSON',   
                                    params: {id:id},   
                                    success: function(result) {   
                                        var json_str = Ext.util.JSON.decode(result.responseText);   
                                        //Ext.foundation.msg('��Ϣ', json_str.msg);   
                                        MessageShow('��Ϣ',json_str.msg);   
                                        store.reload();   
                                    },   
                                    failure:function() {   
                                        Ext.foundation.msg('����', '���������ִ����Ժ�����!');   
                                    }   
                                });   
                            }   
                        });   
  
                    }   
                }   
            },{   
                text: '��ϸ',   
                icon: '/foundation/images/skin/database_save.png',   
                handler: function(){   
                    var id = (grid.getSelectionModel().getSelected()).id;   
                    ${domainClass.propertyName}DetailForm.getForm().load({   
                        url:'/foundation/${domainClass.propertyName}/detailJSON?id='+id,   
                        success:function(form,action){},   
                        failure:function(){   
                            Ext.foundation.msg('����', '���������ִ����Ժ�����!');   
                        }   
                    });   
                    customerDetailWin.show();   
                }   
            },'->',   
            {   
                xtype: 'textfield',   
                name: 'searchBar',   
                emptyText: '��������������'  
            },{   
                text: '����',   
                icon: '/foundation/images/skin/database_search.png',   
                handler: function(){   
                }   
            }   
            );   
  
            tb.doLayout();   
  
            var sm= new Ext.grid.CheckboxSelectionModel()   
            var cm = new Ext.grid.ColumnModel([   
            sm,<%  excludedProps = Event.allEvents.toList() << 'version'  
            allowedNames = domainClass.persistentProperties*.name << 'id' << 'dateCreated' << 'lastUpdated'  
            props = domainClass.properties.findAll { allowedNames.contains(it.name) && !excludedProps.contains(it.name) && !Collection.isAssignableFrom(it.type) }   
            Collections.sort(props, comparator.constructors[0].newInstance([domainClass] as Object[]))   
            props.eachWithIndex { p, i ->   
                if (i < 10) {   
                    if (p.isAssociation()) { %><%      } else { %>   
                {header:'\${cgDomainProperties.${p.name}.chinese}',dataIndex:'${p.name}'} <% if(props.size()>i+1){out<<","} %><%  }   }   } %>   
            ]);   
  
            var store= new Ext.data.Store({   
                autoLoad:true,   
                proxy: new Ext.data.HttpProxy({url:'/foundation/${domainClass.propertyName}/listJSON'}),   
                reader: new Ext.data.JsonReader({   
                    totalProperty:'total',   
                    root:'root'  
                },[<%  props.eachWithIndex { p, i ->   
                                if (i < 10) {   
                                    if (p.isAssociation()) { %><%      } else { %>   
                    {name:'${p.name}'}<% if(props.size()>i+1){out<<","} %><%  }   }   } %>   
                ])   
            });   
  
            var grid= new Ext.grid.GridPanel({   
                renderTo: 'grid',   
                store: store,   
                enableColumnMove:false,   
                enableColumnResize:true,   
                stripeRows:true,   
                enableHdMenu: false,   
                trackMouseOver: true,   
                loadMask:true,   
                cm: cm,   
                sm: sm,   
                height: 270,   
                viewConfig: {   
                    forceFit:true  
                },   
  
                bbar: new Ext.PagingToolbar({   
                    pageSize: 10,   
                    store: store,   
                    displayInfo: true,   
                    displayMsg: '��ʾ��{0}������{1}����¼, ��{2}��',   
                    emptyMsg: 'û�м�¼'  
                })   
            });   
  
            store.load({params:{start:0,limit:10}});   
  
            var window = new Ext.Window({   
                // contentEl : Ext.getBody(),   
                id: 'msgWindow',   
                width : 200,   
                height : 150,   
                shadow : false,   
                html : "��������...",   
                title : "��ܰ��ʾ:"  
            });   
  
            function show() {   
                this.el.alignTo(Ext.getBody(), 't');   
                this.el.slideIn('t', {   
                    easing : 'easeOut',   
                    callback : function() {   
                        this.close.defer(1000, this); //��ʱ�رմ���   
                    },   
                    scope : this,   
                    duration : 1  
                });   
  
            }   
  
            function hide() {   
                if (this.isClose === true) { //��ֹ����رպͶ�ʱ�رմ���   
                    return false;   
                }   
                this.isClose = true;   
                this.el.slideOut('t', {   
                    easing : 'easeOut',   
                    callback : function() {   
                        this.un('beforeclose', hide, this);   
                        this.close();   
                    },   
                    scope : this,   
                    duration : 1  
                });   
                return false;   
            }   
  
            window.on('show', show, window);   
            window.on('beforeclose', hide, window)   
           //window.show();   
  
            function MessageShow(title, content)   
            {   
                var win = Ext.getCmp('msgWindow');   
                win.setTitle(title);   
                //win.html=content;   
  
                win.show();   
            }   
        });   

