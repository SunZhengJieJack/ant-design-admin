import Vue from 'vue'
import Grid from './v-grid/v-grid.js'
import vInput from './Input.vue'
import vSelect from './Select.vue'
import vDate from './Date.vue'
import vDaterange from './DateRange.vue'
const Components = {
  Grid,
  vInput,
  vSelect,
  vDate,
  vDaterange
}
export default () => {
  return Object.keys(Components).forEach((name) => {
    Vue.component(name, Components[name])
  })
}