// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import store from './store/index'


Vue.config.productionTip = false

fastclick.attach(document.body);

import './common/stylus/index.styl'
/* eslint-disable no-new */

Vue.use(VueLazyLoad,{
  loading:require('common/image/default.png')
});
new Vue({
  el: '#app',
    store,
  router,
  components: { App },
  template: '<App/>'
})
