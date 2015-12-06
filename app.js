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
      root: {
        items: [
          {
            text: '마법사',
            items: [
              {
                text: '주기술',
                items: [
                  { text: '마력탄', leaf: true },
                  { text: '전기 충격', leaf: true },
                  { text: '저승의 칼날', leaf: true },
                  { text: '감전', leaf: true }
                ]
              },
              { text: '보조기술',
                items: [
                  { text: '서리 광선', leaf: true },
                  { text: '비전 보주', leaf: true },
                  { text: '비전 격류', leaf: true },
                  { text: '파열', leaf: true }
                ]
              },
              { text: '방어',
                items: [
                  { text: '서릿발', leaf: true },
                  { text: '다이아몬드 피부', leaf: true },
                  { text: '감속 지대', leaf: true },
                  { text: '순간이동', leaf: true }
                ]
              },
              { text: '위력',
                items: [
                  { text: '힘의 파동', leaf: true },
                  { text: '마력 돌개바람', leaf: true },
                  { text: '히드라', leaf: true },
                  { text: '운석 낙하', leaf: true },
                  { text: '눈보라', leaf: true }
                ]
              },
              { text: '창조',
                items: [
                  { text: '얼음 갑옷', leaf: true },
                  { text: '천둥 갑옷', leaf: true },
                  { text: '마법 무기', leaf: true },
                  { text: '사역마', leaf: true },
                  { text: '마력 갑옷', leaf: true }
                ]
              },
              { text: '통달',
                items: [
                  { text: '에너지 폭발', leaf: true },
                  { text: '분신', leaf: true },
                  { text: '마인', leaf: true },
                  { text: '블랙홀', leaf: true }
                ]
              },
            ]
          },
          {
            text: '부두술사'
          },
          {
            text: '성전사'
          },
          {
            text: '수도사'
          },
          {
            text: '악마사냥꾼'
          },
          {
            text: '야만용사'
          }
        ]
      }
    });

    Ext.create('Ext.NestedList', {
      title: '디아블로3 스킬',
      fullscreen: true,
      store: treeStore,
      detailCard: {},
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
