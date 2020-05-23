// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

// import VuePapaParse from 'vue-papa-parse'
// Vue.use(VuePapaParse)

import * as d3 from 'd3'
Vue.prototype.$d3 = d3;


import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.prototype.$axios = axios;
 
Vue.use(VueAxios, axios)

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
