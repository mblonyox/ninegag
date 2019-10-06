import Vue from 'vue';
import Router from 'vue-router';
import PageIndex from '@/views/PageIndex.vue';
import PagePost from '@/views/PagePost.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'PageIndex',
      component: PageIndex,
    },
    {
      path: '/post/:id',
      name: 'PagePost',
      component: PagePost,
      props: true,
    },
  ],
});
