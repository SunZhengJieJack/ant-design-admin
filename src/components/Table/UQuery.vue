<template>
  <div class="c-query">
    <form @submit="handleSubmit">


    </form>
  </div>
</template>
<script>
export default {
  name: 'Query',
  props: {

  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    handleSubmit(){
      this.$emit('input',this.value)
    }
  }
}
</script>
