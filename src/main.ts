import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueObserveVisibility from 'vue-observe-visibility';

import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.use(VueObserveVisibility);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
