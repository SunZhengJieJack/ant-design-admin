<template>
  <div class="c-grid">
    <div class="u-query-container">
      <u-query
        ref="query"
        v-bind="query"
        v-if="query"
        @input="handleQuerySubmit"
        @on-query-change="handleQueryChange"
      ></u-query>
    </div>
    <div class="u-table-container">
      <u-table ref="tabel" :store="store"></u-table>
    </div>
    <div class="u-pagination-container">
      <u-pagination
        ref="pagination"
        :store="store.states"
        @on-page="handlePage"
        @on-page-size="handlePageSize"
      ></u-pagination>
    </div>
  </div>
</template>
<script>
import UQuery from './UQuery'
import UTable from './UTable'
import UPagination from './UPagination'
import Store from './GridStore'
import Emitter from '../mixins/emitter.js'
import { mapState, mapMethod } from '@/components/utils/utlis.js'
export default {
  name: 'Grid',
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    value: {
      type: Object,
      default: () => {}
    },
    choices: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    UQuery,
    UTable,
    UPagination
  },
  mixins: [Emitter],
  provide() {
    return { managerElement: this }
  },
  computed: {
    ...mapState(
      'columns',
      'columnResizing',
      'checkCol',
      'indexCol',
      'gridWidth',
      'width',
      'height',
      'resizable',
      'columnPosition',
      'guiderHeight',
      'defaultColWidth',
      'leftWidth',
      'rightWidth',
      'checkColTitle',
      'checkColWidth',
      'indexColWidth',
      'indexColTitle',
      'scrollLeft',
      'total',
      'pageSizeOpts',
      'pagination',
      'loading',
      'loadingText',
      'loadingTop',
      'loadingLeft',
      'autoLoad',
      'url',
      'param',
      'buttons',
      'rightButtons',
      'bottomButtons',
      'buttonSize',
      'selected',
      'editMode',
      'actionColumn',
      'deleteRowConfirm',
      'onSaveRow',
      'onDeleteRow',
      'onError',
      'onLoadData',
      'onBeforeEditing',
      'onEditing',
      'onCancelEdit',
      'query',
      'theme',
      'cellTitle',
      'isScrollRight',
      'page',
      'start',
      'pageSize',
      'nowrap',
      'addAutoScrollTo',
      'onRowEditRender',
      'static',
      'xscroll',
      'afterLoadData',
      'multiHeaderSep',
      'zebra',
      'oldParentWidth'
    )
  },
  data() {
    const store = new Store(this, this.data, this.value)
    return {
      store,
      autoloaded: false,
      btns: {}
    }
  },
  mounted() {
    if (this.autoLoad) {
      // this.$nextTick(() => {
        this.loadData()
      // })
    }
  },
  methods: {
    ...mapMethod(
      'getSelection',
      'showLoading',
      'setSelection',
      'removeRow',
      'setComment',
      'removeComment',
      'getSelectedRows',
      'getColumn',
      'getDefaultRow',
      'makeRows',
      'sendInputEvent',
      'deselectAll',
      'selectAll',
      'select',
      'deselect',
      'toggle',
      'getComment',
      'clearRowComment',
      'getClass',
      'removeClass',
      'setClass',
      'addRow',
      'addEditRow',
      'updateRow',
      'addChildRow',
      'addEditChildRow',
      'moveRow',
      'expand',
      'collapse',
      'isEditing'
    ),
    handleQuerySubmit(data) {
      this.go(1, data)
    },
    handleQueryChange(change) {
      this.$emit('on-query-change', change)
    },
    go(page, opts) {
      this.page = page
      if (opts && opts.pageSize) this.pageSize = opts.pageSize
      this.start = (this.page - 1) * this.pageSize + 1
      this.$set(this.param, 'page', page)
      this.loadData(opts || {})
    },
    loadData(url, param) {
      let _url
      if (url instanceof Object) {
        _url = this.url
        param = url
      } else {
        _url = url || this.url
      }
      Object.assign(this.param, param || {})
      // data 为数据行， others 为其它信息，如total
      const callback = (data, others) => {
        if (data) {
          this.store.states.data = []
          this.store.states.data = this.makeRows(data)
        }
        if (others && others instanceof Object) {
          this.store.mergeStates(others)
        }
        if (this.afterLoadData) {
          this.afterLoadData()
          this.afterLoadData = null // 清除
        }
        this.$nextTick(() => {
          // this.showLoading(false)
          this.setSelection(this.selected)
          this.sendInputEvent()
        })
      }
      if (this.onLoadData) {
        // this.showLoading(true)
        this.onLoadData(_url, this.param, callback)
      }
    },
    handlePage(page) {
      this.go(page)
    },
    handlePageSize(size) {
      this.go(1, { pageSize: size })
    }
  },
  destroy() {
    removeListener(this.$parent.$el, this.__resizeHandler);
  },
}
</script>
