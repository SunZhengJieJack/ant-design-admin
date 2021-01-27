<template>
  <div class="demo">
    <a-card title="Grid 组件" :bordered="false">
      <Grid
        :data="config"
        ref="grid"
        :choices="choices"
        :value="isvalue"
      ></Grid>
    </a-card>
  </div>
</template>
<script>
import { getList, getSelect } from '@/api/api.js'
export default {
  name: 'demo',
  data() {
    let self = this
    let table = {
      size: 'small',
      buttons: [
        {
          name: '一个btn',
          props: {
            type: 'primary'
          },
          onChange: function(e) {
            debugger
          }
        },
        {
          name: '另一个btn',
          props: {
            type: 'danger'
          }
        }
      ],
      query: {
        defaultValue: {
          input02:'给input02一个静态值'
        },
        fields: [
          {
            name: 'input01',
            type: 'string',
            label: '输入框'
          },
          {
            name: 'input02',
            type: 'string',
            label: '输入框'
          },
          {
            name: 'select01',
            label: '静态下拉框',
            type: 'select',
            options: {
              choices: [
                {
                  label: 'options1',
                  value: '1'
                },
                {
                  label: 'options2',
                  value: '2'
                }
              ]
            }
          },
          {
            name: 'select02',
            type: 'string',
            label: '动态下拉框'
          }
        ],
        layout: [['input01', 'input02'],[{ colspan: 4, name: 'select01' },{ colspan: 4, name: 'select02' }]]
      },
      columns: [
        {
          dataIndex: 'data',
          title: '序号',
          width: 80
        },
        {
          dataIndex: 'name',
          title: '名字'
        },
        {
          dataIndex: 'age',
          title: '年龄'
        },
        {
          dataIndex: 'gender',
          title: '性别',
          customRender: function(text, record, index) {
            return text ? '女' : '男'
          }
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: 300,
          render: function(h, row, index) {
            console.log(row, index,'row, index')
            const child = [
              h('a-button', {
                domProps: {
                  innerHTML: '静态btn'
                },
                props: {
                  type: 'primary',
                  size: 'small'
                }
              }),
              h('a-button', {
                domProps: {
                  innerHTML: '存在事件btn'
                },
                style: {
                  margin: '0 0 0 10px'
                },
                props: {
                  type: 'primadashedry',
                  size: 'small'
                },
                on: {
                  click: function() {
                    self.$message.error('点我干嘛！！！')
                  }
                }
              })
            ]
            return child
          },
          customRender: function(text, record, index) {
            const h = self.$createElement
            const child = [
              h('a-button', {
                domProps: {
                  innerHTML: '静态btn'
                },
                props: {
                  type: 'primary',
                  size: 'small'
                }
              }),
              h('a-button', {
                domProps: {
                  innerHTML: '存在事件btn'
                },
                style: {
                  margin: '0 0 0 10px'
                },
                props: {
                  type: 'primadashedry',
                  size: 'small'
                },
                on: {
                  click: function() {
                    self.$message.error('点我干嘛！！！')
                  }
                }
              })
            ]
            return child
          }
        }
      ],
      onLoadData: async function(url, parmas, callback) {
        try {
          let data = {
            ...parmas
          }
          let { list, total } = await getList(data)
          callback(list, { total: total })
        } catch (error) {
          console.log(error)
          // callback([], { total: 0 })
        }
      }
    }
    return {
      config: table,
      choices: {},
      isvalue: {}
    }
  },
  created() {
    this.setSelect()
  },
  mounted() {},
  methods: {
    async setSelect() {
      let { list } = await getSelect()
      this.$set(this.choices, 'addSelect', list)
      this.$set(this.isvalue, 'addSelect', '0')
    },
    tabsChange(e) {
      this.$refs.grid.go(
        {
          tabs: e
        },
        1
      )
    }
  }
}
</script>
<style lang="less" scoped></style>
