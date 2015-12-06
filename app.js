/*
   This file is generated and updated by Sencha Cmd. You can edit this file as
   needed for your application, but these edits will have to be merged by
   Sencha Cmd when it performs code generation tasks such as generating new
   models, controllers or views and when running "sencha app upgrade".

   Ideally changes to this file would be limited and most work would be done
   in other places (such as Controllers). If Sencha Cmd cannot merge your
   changes and its generated code, it will produce a "merge conflict" that you
   will need to resolve manually.
   */

Ext.application({
  name: 'dia3',

  launch: function() {

    Ext.define('ListItem', {
      extend: 'Ext.data.Model',
      config: {
        fields: ['text']
      }
    });

    var treeStore = Ext.create('Ext.data.TreeStore', {
      model: 'ListItem',
      defaultRootProperty: 'items',
      proxy: {
        type: 'ajax',
        url: 'resources/data/skill.json'
      }
    });

    Ext.create('Ext.NestedList', {
      title: '디아블로3 스킬',
      fullscreen: true,
      store: treeStore,
      detailCard: {
        html: ''
      },
      listeners: {
        leafitemtap: function(nestedList, list, index, target, record) {
          var detailCard = nestedList.getDetailCard();
          var detail = record.get('text') + ".html"
          Ext.Ajax.request({
            url: 'resources/data/' + detail,
            success: function(response, opts) {
              detailCard.setHtml(response.responseText);
            },
            failure: function() {
              detailCard.setHtml('error');
            }
          });
        }
      }
    });
  }
});
