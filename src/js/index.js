import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';

Vue.use(BootstrapVue);
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';


import App from './App.vue';

new Vue({
  el: '#app',
  render: h => h(App)
});

import './storage-driver/backend/isomorphic-git/index.js';
