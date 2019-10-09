<template>
  <div>
    <h1>{{ group !== 'default' ? group + ' / ' : '' }}{{ type }}</h1>
    <card-content v-for="post in posts" :post="post" :key="post.id" />
    <infinite-loading @infinite="infiniteHandler">
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
import { Post, PageQuery } from '@/common/types';

export default Vue.extend({
  computed: {
    posts(): Post[] {
      return this.$store.state.posts;
    },
    after(): string {
      return this.$store.getters.after;
    },
    group(): string {
      return this.$store.state.pageQuery.group;
    },
    type(): string {
      return this.$store.state.pageQuery.type;
    },
  },
  methods: {
    infiniteHandler($state: StateChanger) {
      if (this.posts.length > 20) {
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
    const payload: PageQuery = {
      group: this.$route.params.group || 'default',
      type: this.$route.params.type || 'hot',
      after: typeof this.$route.query.after !== 'object' && this.$route.query.after || '',
    };
    this.$store.dispatch('checkPosts', payload);
  },
  components: {
    BButton,
    InfiniteLoading,
    CardContent,
  },
});
</script>
