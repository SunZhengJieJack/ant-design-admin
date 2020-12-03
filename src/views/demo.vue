<template>
  <div class="demo">
    <a-card title="Grid 组件" :bordered="false">
      <Grid :config="config" ref="grid" :choices="choices" :queryval="isvalue">
        <div slot="tabs">
          <a-tabs default-active-key="0" @change="tabsChange">
            <a-tab-pane key="0" tab="tab1"> </a-tab-pane>
            <a-tab-pane key="1" tab="tab2" force-render></a-tab-pane>
          </a-tabs>
        </div>
      </Grid>
    </a-card>
  </div>
</template>
<script>
import { getList,getSelect } from "@/api/api.js";
export default {
  name: "demo",
  data() {
    let self = this;
    let table = {
      bordered: true,
      pageState: true,
      buttons:[
        {
          name:'一个btn',
          props:{
            type: "primary"
          }
        },
         {
          name:'另一个btn',
          props:{
            type: "danger"
          }
        }
      ],
      query: {
        labelWidth: "100px",
        layout: [
          {
            name: "addSelect",
            type: "select",
            label: "动态select",
            props: {
              showSearch: true,
            },
            on: {
              input: function (h) {
                console.log(h, "change");
              },
            },
          },
          {
            name: "query1",
            type: "input",
            label: "input",
          },
          {
            name: "query2",
            type: "select",
            label: "下拉框",
            props: {
              options: [
                {
                  label: "静态selct1",
                  value: "0",
                },
                {
                  label: "静态selct2",
                  value: "1",
                },
              ],
            },
          },
          {
            name: "date1",
            type: "date",
            label: "单时间",
          },
          {
            name: "date2",
            type: "daterange",
            label: "区间时间",
          },
        ],
        defaultQuery: {
          query1: "默认值",
        },
      },
      pagingOptions: {
        showSizeChanger: true,
        showQuickJumper: true,
        size: "small",
      },
      columns: [
        {
          dataIndex: "data",
          title: "页",
          width: 100,
        },
        {
          dataIndex: "name",
          title: "名字",
        },
        {
          dataIndex: "age",
          title: "年龄",
        },
        {
          dataIndex: "gender",
          title: "性别",
        },
        {
          title: "操作",
          width: 200,
          scopedSlots: { customRender: "action" },
        },
      ],
      onloadData: async function (parmas, callback) {
        try {
          console.log(parmas);
          let data = {
            ...parmas,
          };
          let { list, total } = await getList(data);
          callback(list, total);
        } catch (error) {
          callback([], 0);
        }
      },
    };
    return {
      config: table,
      choices: {
        // addSelect: []
      },
      isvalue: {},
    };
  },
  created() {
    this.setSelect()
  },
  mounted() {
  
  },
  methods: {
    async setSelect(){
      let {list} = await  getSelect()      
      this.$set(this.choices,'addSelect',list)
      this.$set(this.isvalue,'addSelect','0')
    },
    tabsChange(e) {
      this.$refs.grid.go(
        {
          tabs: e,
        },
        1
      );
    },
  },
};
</script>