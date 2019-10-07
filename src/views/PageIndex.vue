<template>
  <b-card class="my-3">
    <h1>{{ group !== 'default' ? group + ' / ' : '' }}{{ type }}</h1>
    <b-row>
      <b-col align-h="center" lg="8" class="px-0">
        <card-content v-for="post in posts" :post="post" :key="post.id" />
        <infinite-loading @infinite="infiniteHandler">
          <div slot="no-more">
            <b-button block :to="{ query: { after } }">More...</b-button>
          </div>
        </infinite-loading>
      </b-col>
      <b-col align-h="center" lg="4" class="d-none d-lg-block">
        <section-bar></section-bar>
      </b-col>
    </b-row>
  </b-card>
</template>

<script lang="ts">
import Vue from 'vue';
import InfiniteLoading, { StateChanger } from 'vue-infinite-loading';
import CardContent from '@/components/CardContent.vue';
import SectionBar from '@/components/SectionBar.vue';
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
    InfiniteLoading,
    CardContent,
    SectionBar,
  },
});
</script>
