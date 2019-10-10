<template>
  <div>
    <section-info></section-info>
    <card-content v-for="post in posts" :post="post" :key="post.id" />
    <infinite-loading @infinite="infiniteHandler" :identifier="$route">
      <div slot="no-more">
        <b-button block :to="{ query: { after } }">More...</b-button>
      </div>
    </infinite-loading>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { BButton } from 'bootstrap-vue';
import InfiniteLoading, { StateChanger } from 'vue-infinite-loading';
import CardContent from '@/components/CardContent.vue';
import SectionInfo from '@/components/SectionInfo.vue';
import { Post, PageQuery } from '@/common/types';

export default Vue.extend({
  computed: {
    posts(): Post[] {
      return this.$store.state.posts;
    },
    after(): string {
      return this.$store.getters.after;
    },
    pageQuery(): PageQuery {
      return {
        group: this.$route.params.group || 'default',
        type: this.$route.params.type || 'hot',
        after: typeof this.$route.query.after !== 'object' && this.$route.query.after || '',
      };
    },
  },
  watch: {
    $route() {
      this.$store.dispatch('checkPosts', this.pageQuery);
    },
  },
  methods: {
    infiniteHandler($state: StateChanger) {
      const navigator: any = window.navigator;
      const ram = navigator.deviceMemory || 2;
      if (this.posts.length > ram * 10) {
        $state.loaded();
        $state.complete();
        return;
      }
      this.$store.dispatch('fetchPosts')
        .then($state.loaded)
        .catch($state.error);
    },
  },
  created() {
    this.$store.dispatch('checkPosts', this.pageQuery);
  },
  components: {
    BButton,
    InfiniteLoading,
    CardContent,
    SectionInfo,
  },
});
</script>
