<template>
  <div>
    <b v-if="total">{{total}} Comments</b>
    <hr>
    <comments-item v-for="comment in comments" :comment="comment" :key="comment.commentId"/>
    <infinite-loading @infinite="infiniteHandler" />
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import CommentsItem from './CommentsItem'

export default {
  data: () => ({
    comments: [],
    total: 0,
    hasNext: true,
    orderScore: true
  }),
  computed: {
    ref () {
      if (!this.comments.length) return null
      return this.comments[this.comments.length - 1].orderKey
    }
  },
  props: ['id'],
  methods: {
    getComments () {
      const query = new URLSearchParams('appId=a_dd8f2b7d304a10edaf6f29517ea0ca4100a43d1b&count=10')
      query.set('url', 'http://9gag.com/gag/' + this.id)
      query.set('order', this.orderScore ? 'score' : 'ts')
      if (this.ref) query.set('ref', this.ref)
      return fetch('/comment.php/v1/cacheable/comment-list.json?' + query.toString())
        .then(res => res.json())
        .then(res => {
          this.comments = this.comments.concat(res.payload.comments)
          this.total = res.payload.total
          this.hasNext = res.payload.hasNext
        })
    },
    infiniteHandler ($state) {
      if (!this.hasNext) return $state.complete()
      return this.getComments()
        .then(() => $state.loaded())
        .catch($state.error)
    }
  },
  components: {InfiniteLoading, CommentsItem}
}
</script>
