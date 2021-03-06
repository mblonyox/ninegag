import Vue from 'vue';
import Meta from 'vue-meta';
import { ModalPlugin } from 'bootstrap-vue';
import VueObserveVisibility from 'vue-observe-visibility';

import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(Meta);
Vue.use(ModalPlugin);
Vue.use(VueObserveVisibility);

Vue.config.productionTip = false;

const vm = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

export function confirmAppReload() {
  return vm.$bvModal.msgBoxConfirm(
    'Click "OK" to refresh update.',
    {
      title: 'New version installed.',
      centered: true,
    });
}
