import vInput from "../Input.vue";
import vSelect from "../Select.vue";

export default {
  name: 'build',
  components: {
    vInput, vSelect
  },
  props: {
    
  },
  data() {
    return {
    }
  },
  computed: {

  },
  watch: {
  },
  created(h) {
  },
  mounted(h) {
  },
  methods: {
    $_getBuild(h) {
      return (
        <div>Build</div>
      )
    }
  },
  render(h) {
    const build = this.$_getBuild(h)
    return (
      <div class="v-build" style={{ 'background': '#fff', 'padding': '10px' }}>
        { build}
      </div>
    )
  }
}