<template>
  <b-modal v-model="show" title="Share to..." ok-only centered >
    <b-row class="text-center">
      <b-col>
        <b-link :href="twitterUrl" target="_blank" rel="noopener noreferrer"><b-img :src="require('../assets/twitter-logo.png')" width="64" /></b-link>
      </b-col>
      <b-col>
        <b-link :href="facebookUrl" target="_blank" rel="noopener noreferrer"><b-img :src="require('../assets/facebook-logo.png')" width="64" /></b-link>
      </b-col>
      <b-col>
        <b-link :href="emailUrl" target="_blank" rel="noopener noreferrer"><b-img :src="require('../assets/mail-logo.png')" width="64" /></b-link>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
export default {
  data: () => ({
    show: false,
    title: '',
    text: '',
    url: ''
  }),
  computed: {
    twitterUrl () {
      const query = new URLSearchParams()
      query.set('text', this.title)
      query.set('url', this.url)
      return `https://twitter.com/intent/tweet?${query.toString()}`
    },
    facebookUrl () {
      const query = new URLSearchParams()
      query.set('t', this.title)
      query.set('u', this.url)
      return `https://www.facebook.com/share/sharer.php?${query.toString()}`
    },
    emailUrl () {
      const query = new URLSearchParams()
      query.set('subject', this.title)
      query.set('body', `${this.text} - ${this.url}`)
      return `mailto:?${query.toString()}`
    }
  },
  methods: {
    onShare (data) {
      this.title = data.title
      this.text = data.text
      this.url = data.url
      this.show = true
    }
  },
  created () {
    this.$root.$on('share::post', this.onShare)
  },
  beforeDestroy () {
    this.$root.$off('share::post', this.onShare)
  }
}
</script>
