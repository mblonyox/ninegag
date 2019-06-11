<template>
  <b-card class="my-3">
    <h1>Hot</h1>
    <b-row>
      <b-col
        align-h="center"
        lg="8"
        class="px-0"
      >
        <card-content
          v-for="post in posts"
          :post="post"
          :key="post.id"
        />
        <infinite-loading @infinite="infiniteHandler"/>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import CardContent from './CardContent'

export default {
  data: () => ({
    posts: [],
    cursor: ''
  }),
  methods: {
    infiniteHandler ($state) {
      fetch('/api.php/v1/group-posts/group/default/type/hot?' + this.cursor)
        .then(res => res.json())
        .then(res => {
          if (this.posts.length > 20) {
            const query = new URLSearchParams(this.cursor)
            this.$router.push({query: { after: query.get('after'), c: query.get('c') }})
          } else {
            this.posts = this.posts.concat(res.data.posts)
            this.cursor = res.data.nextCursor
            $state.loaded()
          }
        })
    }
  },
  created () {
    this.cursor = `after=${this.$route.query.after}&c=${this.$route.query.c}`
  },
  components: {
    InfiniteLoading,
    CardContent
  }
}
</script>
