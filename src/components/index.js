import Vue from 'vue'
import Table from './Table'
import {Grid} from './Table'
import Input from './Input.vue'
import Select from './Select.vue'
import Date from './Date.vue'
import Daterange from './DateRange.vue'
import Button from './Button.vue'
const Components = {
  Grid,
  Table,
  Input,
  Select,
  Date,
  Daterange,
  Button
}
export default () => {
  return Object.keys(Components).forEach((name) => {
    Vue.component(name, Components[name])
  })
}