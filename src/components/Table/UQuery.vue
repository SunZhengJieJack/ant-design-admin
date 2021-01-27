<template>
  <div class="c-query">
    <form @submit="handleSubmit">
      <Row>
        <FormCell v-for="col in firstLayout"> </FormCell>
      </Row>
    </form>
  </div>
</template>
<script>
import FormCell from '../FormCell'
import config from '../config'
export default {
  name: 'Query',
  props: {
    fields: {
      type: Array,
      default() {
        return []
      }
    },
    layout: {
      type: Array,
      requied: true
    },
    firstLineLayout: {
      type: Array,
      default() {
        return []
      }
    },
    labelWidth: {
      type: Number,
      default: 80
    },
    defaultValue: {
      type: Object,
      default() {
        return {}
      }
    },
    value: {
      type: Object,
      default() {
        return {}
      }
    },
    showLine: {
      // 当条件为多行时，初始显示几行，缺省为1
      type: Number,
      default: 1
    },
    choices: {
      type: Object,
      default() {
        return {}
      }
    },
    firstLayoutAlign: {
      default: 'left'
    },
    showSelected: {
      type: Boolean,
      default: false
    },
    staticSuffix: {
      type: String,
      default: '_static'
    },
    submitText: {
      type: String,
      default: '查询'
    },
    resetText: {
      type: String,
      default: '重置'
    },
    parseUrl: {
      type: Boolean,
      default: false
    },
    buttons: {
      type: Array,
      default() {
        return []
      }
    },
    showMoreText: {
      default() {
        return config.grid.query.showMoreText
      }
    },
    hiddenMoreText: {
      default() {
        return config.grid.query.hiddenMoreText
      }
    },
    btnSize: {
      default: 'default'
    }
  },
  computed: {
    selected() {
      let v = []
      for (let row of this.layout) {
        for (let col of row) {
          if (typeof col === 'object') {
            name = col.name
          } else {
            name = col
          }

          let value
          let field = this.f[name]
          let InputClass = getField(field.type)
          let options = Object.assign({}, field, {
            value: this.value,
            staticSuffix: this.staticSuffix
          })
          let input = new InputClass(this, options)
          if (!isEmpty(this.value[name])) {
            //判断是否有name_static值，如果有，则不再执行setStaticValue的方法
            input.setStaticValue(this.value[name])
            v.push({
              name: name,
              label: field.label,
              value:
                this.value[`${name}${this.staticSuffix}`] || this.value[name]
            })
          }
        }
      }
      return v
    },

    // 获取第一行的布局，可以单独设置style，如宽度 width
    firstLayout() {
      let fields = [],
        row
      if (this.firstLineLayout.length > 0) row = this.firstLineLayout
      else row = this.layout[0]
      for (let f of row) {
        let d = {}
        if (typeof f === 'string') {
          d.name = f
        } else {
          d = f
        }
        let col = this.f[d.name]
        if (!d.style) {
          d.style = {
            width: '200px'
          }
        }
        Object.assign(d, col)
        fields.push(d)
      }
      console.log(fields,'fields')
      return fields
    },

    firstLayoutStyle() {
      return { 'text-align': this.firstLayoutAlign }
    },

    rows() {
      let r = [],
        name
      for (let row of this.layout) {
        let new_r = []
        let span = 24 / row.length

        //重新计算col
        for (let col of row) {
          if (typeof col === 'object') {
            name = col.name
            span = col.colspan || span
          } else {
            name = col
          }
          let width = (100 / 24) * span
          let f = this.f[name]
          if (!f)
            throw Error(
              `Can't find field ${name} in fields, please check if the name is not correct between layout and fields`
            )
          if (f.hidden) continue
          let field = Object.assign(
            {
              colspan: span,
              labelWidth: this.labelWidth,
              static: col.static || this.static
            },
            f
          )

          new_r.push(field)
        }
        if (new_r.length > 0) r.push(new_r)
      }
      return r
    }
  },
  components: {
    FormCell
  },
  data() {
    return {
      f: {}, // fields
      current_value: {},
      old_value: {}, //保存上一次的值,用于数据比较
      isShow: false, // 是否显示隐藏内容
    }
  },
  mounted() {},
  methods: {
    handleSubmit() {
      this.$emit('input', this.value)
    }
  }
}
</script>
