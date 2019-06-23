<template>
  <div>
    <Tree :data="data2" :load-data="loadData" :render="renderContent"></Tree>
  </div>
</template>

<script>
  import { Tree, Icon } from "iview";
  import {mergeKeys} from './func.js'
  export default {
    data() {
      return {
        data2: [
          {
            title: "pa",
            expand: true,
            render: (h, { root, node, data }) => {
                            return h('span', {
                                style: {
                                    display: 'inline-block',
                                    width: '100%'
                                }
                            }, [
                                h('span', [
                                    h('Icon', {
                                        props: {
                                            type: 'ios-folder-outline'
                                        },
                                        style: {
                                            marginRight: '8px'
                                        }
                                    }),
                                    h('span', data.title)
                                ]),
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        float: 'right',
                                        marginRight: '32px'
                                    }
                                }, [
                                    h('Button', {
                                        props: Object.assign({}, this.buttonProps, {
                                            icon: 'ios-add',
                                            type: 'primary'
                                        }),
                                        style: {
                                            width: '64px'
                                        },
                                        on: {
                                            click: () => { this.append(data) }
                                        }
                                    })
                                ])
                            ]);
                        },
            children: [{ title: "c1" }, { title: "c2" }],

          }
        ]
      };
    },
    components: {
      Tree,
      Icon
    },
    methods: {
      renderContent(h, { root, node, data }) {

        let isFolder = data.type!=1?true:false;

        // <Icon type="md-folder" />

        return h(
          "span",
          {
            style: {
              display: "inline-block",
              width: "100%"
            }
          },
          [
            h("span", [
              h("Icon", {
                // <Icon type="ios-folder-outline" />
                props: {
                  type:data.iconType
                },
                style: {
                  marginRight: "8px"
                }
              }),
              h("span", data.name)
            ]),
            h(
              "span",
              {
                style: {
                  display: "inline-block",
                  float: "right",
                  marginRight: "32px"
                }
              },
              []
            )
          ]
        );
      },
      loadData(item, callback) {
        let json = {
        name: "f1",
        files: null,
        type: 2,
        folder: [
          {
            name: "file1",
            type: 2,
            files: [{ name: "file11", type: 1 }, { name: "file12", type: 1 }],
            folder:[
              {
                name:'fol3',
                type:2,
                files: [{ name: "file31", type: 1 }, { name: "file32", type: 1 }],

              },{
                name:'fol32',
                type:3
              }
            ]
          },
          {
            name: "f22",
            type: 2,
            files: null,
            folder: []
          }
        ]
      };

      json=mergeKeys(json,'folder','files');
       

 
        setTimeout(function() {
          callback(json.children);
        }, 1000);
      }
    },
    mounted() {
      let json = {
        name: "f1",
        files: null,
        type: 2,
        folder: [
          {
            name: "file1",
            type: 2,
            files: [{ name: "file11", type: 1 }, { name: "file12", type: 1 }],
            folder:[
              {
                name:'fol3',
                type:2,
                files: [{ name: "file31", type: 1 }, { name: "file32", type: 1 }],

              },{
                name:'fol32',
                type:3
              }
            ]
          },
          {
            name: "f22",
            type: 2,
            files: null,
            folder: []
          }
        ]
      };

      json=mergeKeys(json,'folder','files');
       


      this.data2[0].name = json.name; 
      this.data2[0].type = 2;
      this.data2[0].children = json.children;
    }
  };
</script>
