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
          console.log(res)
          this.posts = this.posts.concat(res.data.posts)
          this.cursor = res.data.nextCursor
          $state.loaded()
        })
    }
  },
  components: {
    InfiniteLoading,
    CardContent
  }
}
</script>
