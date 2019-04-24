import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

import { routes } from './routes.js';
import './directives/Transform.js';

const router = new VueRouter({
	routes,
});

Vue.use(VueResource);
Vue.use(VueRouter);

Vue.http.options.root = 'http://localhost:3000';

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
