import Vue from 'vue';
import Vuex from 'vuex';

import { Post, SectionMap, PageQuery } from '@/common/types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sections: {} as SectionMap,
    posts: [] as Post[],
    cursor: '',
    pageQuery: {
      group: 'default',
      type: 'hot',
      after: '',
    } as PageQuery,
  },
  getters: {
    after: (state) => new URLSearchParams(state.cursor).get('after') || '',
    section: (state) => state.sections[state.pageQuery.group],
  },
  mutations: {
    setSections(state, sections: SectionMap) {
      state.sections = sections;
    },
    clearPosts(state) {
      state.posts = [];
    },
    addPosts(state, posts: Post[]) {
      state.posts = [...state.posts, ...posts];
    },
    setCursor(state, cursor: string) {
      state.cursor = cursor;
    },
    setPageQuery(state, query: PageQuery) {
      state.pageQuery = query;
    },
  },
  actions: {
    fetchSections({ state, commit }) {
      if (!Object.keys(state.sections).length) {
        return fetch('/sections.json')
          .then((res) => res.json())
          .then((res) => {
            commit('setSections', res);
          });
      }
      return Promise.resolve();
    },
    fetchPosts({ state, commit }) {
      return fetch(
        `/api.php/v1/group-posts/group/${state.pageQuery.group}/type/${state.pageQuery.type}?${state.cursor}`,
      )
        .then((res) => res.json())
        .then((res) => {
          commit('addPosts', res.data.posts);
          commit('setCursor', res.data.nextCursor);
        });
    },
    checkPosts({ state: {pageQuery}, commit }, payload: PageQuery) {
      if (pageQuery.group !== payload.group ||
        pageQuery.type !== payload.type ||
        pageQuery.after !== payload.after
      ) {
        commit('setPageQuery', payload);
        commit('setCursor', `after=${payload.after}&c=`);
        commit('clearPosts');
      }
    },
  },
});
