<template>
  <b-card class="my-3">
    <b-row>
      <b-col
        align-h="center"
        lg="8"
        class="px-0"
      >
        <b-row align-h="between">
          <b-col cols="5" sm="4" md="3"><b-button block :to="{name: 'PageIndex'}">🏠 Home</b-button></b-col>
          <b-col cols="5" sm="4" md="3"><b-button block variant="primary" @click.prevent="nextPost">Next ➡️</b-button></b-col>
        </b-row>
        <card-content :post="post" v-if="!!post" :key="post.id" />
        <b-card class="my-5" v-else>
          <div class="text-center">
            <b-spinner label="Loading..."/>
          </div>
        </b-card>
        <post-comments :id="id" :key="id"/>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import CardContent from './CardContent'
import PostComments from './PostComments'

export default {
  data: () => ({
    post: null,
    nextPosts: []
  }),
  methods: {
    getPosts () {
      this.post = null
      return fetch('/api.php/v1/post?id=' + this.id)
        .then(res => res.json())
        .then(res => {
          this.post = res.data.post
          this.nextPosts = res.data.nextPosts
        })
    },
    nextPost () {
      (!this.nextPosts.length ? this.getPosts() : Promise.resolve())
        .then(() => {
          this.post = this.nextPosts.splice(0, 1)[0]
          this.$router.push({name: 'PagePost', params: {id: this.post.id}})
        })
    }
  },
  created () {
    this.getPosts()
  },
  props: ['id'],
  components: {CardContent, PostComments}
}
</script>
