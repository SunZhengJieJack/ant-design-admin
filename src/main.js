import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Grid from '@/components/vTable/index.js'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.config.productionTip = false;
const components = {
  install(Vue) {
    Vue.use(Grid)
  }
}
Vue.use(Antd);
Vue.use(components)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
