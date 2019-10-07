<template>
  <b-card class="my-3">
    <h1>Hot</h1>
    <b-row>
      <b-col align-h="center" lg="8" class="px-0">
        <card-content v-for="post in posts" :post="post" :key="post.id" />
        <infinite-loading @infinite="infiniteHandler">
          <div slot="no-more">
            <b-button block :to="{ query: { after } }">More...</b-button>
          </div>
        </infinite-loading>
      </b-col>
    </b-row>
  </b-card>
</template>

<script lang="ts">
import Vue from 'vue';
import InfiniteLoading, { StateChanger } from 'vue-infinite-loading';
import CardContent from '@/components/CardContent.vue';
import { Post } from '@/common/types';

export default Vue.extend({
  computed: {
    posts(): Post[] {
      return this.$store.state.posts;
    },
    after(): string {
      return this.$store.getters.after;
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
    this.$store.dispatch('checkPosts', this.$route.query.after);
  },
  components: {
    InfiniteLoading,
    CardContent,
  },
});
</script>
