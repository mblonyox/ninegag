import Vue from 'vue';
import Vuex from 'vuex';

import { Post } from '@/common/types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [] as Post[],
    cursor: '',
    pageQuery: '',
    scrollPosition: 0,
  },
  getters: {
    after: (state) => new URLSearchParams(state.cursor).get('after') || '',
  },
  mutations: {
    clearPosts(state) {
      state.posts = [];
    },
    addPosts(state, posts: Post[]) {
      state.posts = [...state.posts, ...posts];
    },
    setCursor(state, cursor: string) {
      state.cursor = cursor;
    },
    setPageQuery(state, query: string) {
      state.pageQuery = query;
    },
  },
  actions: {
    fetchPosts({ state, commit }) {
      return fetch(
        '/api.php/v1/group-posts/group/default/type/hot?' + state.cursor,
      )
        .then((res) => res.json())
        .then((res) => {
          commit('addPosts', res.data.posts);
          commit('setCursor', res.data.nextCursor);
        });
    },
    checkPosts({ state, commit }, query: string) {
      if (state.pageQuery !== query) {
        commit('setPageQuery', query);
        commit('setCursor', `after=${query}&c=`);
        commit('clearPosts');
      }
    },
  },
});
