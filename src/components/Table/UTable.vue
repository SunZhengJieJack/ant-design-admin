<template>
  <div class="c-table">
    <a-table :columns="isColumns" :data-source="isData">
      <slot></slot>
    </a-table>
  </div>
</template>
<script>
import Emitter from '../mixins/emitter.js'
export default {
  name: 'Table',
  props: ['store'],
  mixins: [Emitter],
  data() {
    return {
    }
  },
  computed: {
    isColumns(){
      return this.store.states.columns
    },
    isData(){
      return this.store.states.data
    }
  },
  mounted() {},
  methods: {}
}
</script>
