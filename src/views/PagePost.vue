<template>
  <div>
    <b-row align-h="between">
      <b-col cols="5" sm="4" md="3">
        <b-button block :to="{name: 'PageIndexDefault'}">🏠 Home</b-button>
      </b-col>
      <b-col cols="5" sm="4" md="3">
        <b-button block variant="primary" @click.prevent="nextPost">Next ➡️</b-button>
      </b-col>
    </b-row>
    <card-content :post="post" :key="`post-${id}`" v-if="!!post"/>
    <b-card class="my-5" v-else>
      <div class="text-center" style="height: 460px;">
        <b-spinner label="Loading..." />
      </div>
    </b-card>
    <post-comments :id="id" :key="`comments-${id}`" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { BRow, BCol, BButton, BCard, BSpinner } from 'bootstrap-vue';
import CardContent from '@/components/CardContent.vue';
import PostComments from '@/components/PostComments.vue';
import SectionBar from '@/components/SectionBar.vue';

export default Vue.extend({
  data: () => ({
    post: null as any,
    nextPosts: [],
  }),
  watch: {
    $route(to) {
      if (to.params.id !== this.post.id) {
        this.getPosts();
      }
    },
  },
  methods: {
    getPosts() {
      this.post = null;
      return fetch('/api.php/v1/post?id=' + this.id)
        .then((res) => res.json())
        .then((res) => {
          this.post = res.data.post;
          this.nextPosts = res.data.nextPosts;
        });
    },
    nextPost() {
      (!this.nextPosts.length ? this.getPosts() : Promise.resolve()).then(
        () => {
          this.post = this.nextPosts.splice(0, 1)[0];
          this.$router.push({
            name: 'PagePost',
            params: { id: this.post!.id },
          });
        },
      );
    },
  },
  created() {
    window.scrollTo({ top: 0 });
    this.getPosts();
  },
  props: ['id'],
  components: { BRow, BCol, BButton, BCard, BSpinner, CardContent, PostComments, SectionBar },
});
</script>
