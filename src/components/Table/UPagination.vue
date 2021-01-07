<template>
  <div class="c-Pagination">
    <a-pagination
      size="small"
      :total="50"
      v-model="current"
      show-size-changer
      show-quick-jumper
      @change="pageChange"
      @showSizeChange="pageSizeChange"
    />
  </div>
</template>
<script>
export default {
  name: 'Pagination',
  props: {
    store: Object
  },
  data() {
    return {
      current: this.store.page,
      pageSize: this.store.pageSize
    }
  },
  mounted() {},
  methods: {
    pageChange(page) {
      this.$emit('on-page', page)
    },
    pageSizeChange(page, pageSize) {
      this.current = 1
      this.$emit('on-page-size', pageSize)
    }
  }
}
</script>
