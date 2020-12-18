<template>
  <div class="c-grid">
    <Query ref="query"></Query>
    <Table ref="tabel" :store="store"></Table>
    <Pagination ref="Pagination"></Pagination>
  </div>
</template>
<script>
import Query from './Query'
import Table from './Table'
import Pagination from './Pagination'
import Store from './GridStore' 
export default {
  name: 'Grid',
  components:{
    Query,
    Table,
    Pagination
  },
  data() {
    const store = new Store(this, this.data, this.value);
    return {
      store
    }
  },
  mounted() {},
  methods: {}
}
</script>
