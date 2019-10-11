<template>
  <div>
    <b-row align-h="between">
      <b-col cols="5" sm="4" md="3">
        <b-button block :to="{ name: 'PageIndexDefault' }">🏠 Home</b-button>
      </b-col>
      <b-col cols="5" sm="4" md="3">
        <b-button block variant="primary" @click.prevent="nextPost"
          >Next ➡️</b-button
        >
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
import he from 'he';
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
      const $this = this as any;
      if ($this.post && $this.post.id !== to.params.id) {
        $this.fetchPosts();
      }
    },
  },
  metaInfo() {
    const title: string = 'Ninegag';
    const description: string = this.post && he.decode(this.post.title) || '';
    const url: string = window.location.origin + window.location.pathname;
    const image: string = this.post &&
                          this.post.images &&
                          this.post.images.image460 &&
                          this.post.images.image460.url || '';

    return {
      title: this.post && he.decode(this.post.title),
      meta: [
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: title },
        { property: 'og:url', content: url },
        { property: 'og:image', content: image },
        { property: 'og:description', content: description },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:site', content: '@mblonyox' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:image', content: image },
        { name: 'twitter:description', content: description },
        { itemprop: 'name', content: title },
        { itemprop: 'description', content: description },
        { itemprop: 'image', content: image },
      ],
    };
  },
  methods: {
    fetchPosts() {
      this.post = null;
      return fetch('/api.php/v1/post?id=' + this.id)
        .then((res) => res.json())
        .then((res) => {
          this.post = res.data.post;
          this.nextPosts = res.data.nextPosts;
        });
    },
    nextPost() {
      const $this = this as any;
      (!$this.nextPosts.length ? $this.fetchPosts() : Promise.resolve()).then(
        () => {
          $this.post = $this.nextPosts.splice(0, 1)[0];
          $this.$router.push({
            name: 'PagePost',
            params: { id: $this.post!.id },
          });
        },
      );
    },
  },
  created() {
    const $this = this as any;
    window.scrollTo({ top: 0 });
    $this.fetchPosts();
  },
  props: ['id'],
  components: {
    BRow,
    BCol,
    BButton,
    BCard,
    BSpinner,
    CardContent,
    PostComments,
    SectionBar,
  },
});
</script>
