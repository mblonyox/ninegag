<template>
  <b-card class="my-3">
    <h1>Hot</h1>
    <b-row>
      <b-col align-h="center" lg="8" class="px-0">
        <card-content v-for="post in posts" :post="post" :key="post.id" />
        <infinite-loading @infinite="infiniteHandler">
          <div slot="no-more">
            <b-button block :to="{query: {after}}">More...</b-button>
          </div>
        </infinite-loading>
      </b-col>
    </b-row>
  </b-card>
</template>

<script lang="ts">
import Vue from 'vue';
import InfiniteLoading from 'vue-infinite-loading';
import CardContent from '@/components/CardContent.vue';

export default Vue.extend({
  data: () => ({
    posts: [],
    cursor: '',
  }),
  computed: {
    after(): string {
      return new URLSearchParams(this.cursor).get('after') || '';
    },
  },
  methods: {
    infiniteHandler($state: any) {
      if (this.posts.length > 20) {
        return $state.complete();
      }
      fetch('/api.php/v1/group-posts/group/default/type/hot?' + this.cursor)
        .then((res) => res.json())
        .then((res) => {
          this.posts = this.posts.concat(res.data.posts);
          this.cursor = res.data.nextCursor;
          $state.loaded();
        })
        .catch($state.error);
    },
  },
  created() {
    this.cursor = `after=${this.$route.query.after}&c=${this.$route.query.c}`;
  },
  components: {
    InfiniteLoading,
    CardContent,
  },
});
</script>
