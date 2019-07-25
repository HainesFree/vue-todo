import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';

import './assets/styles/global.styl';

import createRouter from './config/router';
import createStore from './store/store'
import Vuex from "vuex";

Vue.use(VueRouter);
Vue.use(Vuex);
const router = createRouter();
const store = createStore();

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root');
