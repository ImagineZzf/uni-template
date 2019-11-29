import Vue from 'vue'
import App from './App'
import store from '@store/index'
import { http, httpLoading } from '@utils/http'

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$http = http
Vue.prototype.$httpLoading = httpLoading

App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})
app.$mount()
