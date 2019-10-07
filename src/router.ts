import Vue from 'vue';
import Router from 'vue-router';
import PageIndex from '@/views/PageIndex.vue';
import PagePost from '@/views/PagePost.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/:type(hot|trending|fresh)?',
      name: 'PageIndexDefault',
      component: PageIndex,
    },
    {
      path: '/:group/:type(hot|trending|fresh)?',
      name: 'PageIndexGroup',
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
