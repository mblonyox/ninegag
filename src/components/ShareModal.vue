<template>
  <b-modal v-model="show" title="Share to..." ok-only centered>
    <b-row class="text-center">
      <b-col>
        <b-link :href="twitterUrl" target="_blank" rel="noopener noreferrer">
          <b-img :src="require('../assets/twitter-logo.png')" width="64" />
          <br />Twitter
        </b-link>
      </b-col>
      <b-col>
        <b-link :href="facebookUrl" target="_blank" rel="noopener noreferrer">
          <b-img :src="require('../assets/facebook-logo.png')" width="64" />
          <br />Facebook
        </b-link>
      </b-col>
      <b-col>
        <b-link :href="emailUrl" target="_blank" rel="noopener noreferrer">
          <b-img :src="require('../assets/email-logo.png')" width="64" />
          <br />Email
        </b-link>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { BModal, BRow, BCol, BLink, BImg } from 'bootstrap-vue';

export default Vue.extend({
  data: () => ({
    show: false,
    title: '',
    text: '',
    url: '',
  }),
  computed: {
    twitterUrl() {
      const query = new URLSearchParams();
      query.set('text', `${this.text} - ${this.url}`);
      query.set('url', this.url);
      return `https://twitter.com/intent/tweet?${query.toString()}`;
    },
    facebookUrl() {
      const query = new URLSearchParams();
      query.set('t', `${this.text} - ${this.url}`);
      query.set('u', this.url);
      return `https://www.facebook.com/sharer/sharer.php?${query.toString()}`;
    },
    emailUrl() {
      const query = new URLSearchParams();
      query.set('subject', this.title);
      query.set('body', `${this.text} - ${this.url}`);
      return `mailto:?${query.toString()}`;
    },
  },
  methods: {
    onShare(data: { title: string; text: string; url: string }) {
      this.title = data.title;
      this.text = data.text;
      this.url = data.url;
      this.show = true;
    },
  },
  created() {
    this.$root.$on('share::post', this.onShare);
  },
  beforeDestroy() {
    this.$root.$off('share::post', this.onShare);
  },
  components: { BModal, BRow, BCol, BLink, BImg },
});
</script>
