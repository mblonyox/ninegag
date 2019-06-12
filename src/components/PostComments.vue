<template>
  <div>
    <hr>
    <p v-for="comment in comments" :key="comment">{{comment.richtext}}</p>
  </div>
</template>

<script>
export default {
  data: () => ({
    comments: [],
    total: 0,
    hasNext: true,
    orderScore: true,
    ref: ''
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
      fetch('https://comment-cdn.9gag.com/v1/cacheable/comment-list.json?' + query.toString())
        .then(res => res.json())
        .then(res => {
          this.comments = this.comments.concat(res.payload.comments)
          this.total = res.payload.total
          this.hasNext = res.payload.hasNext
        })
    }
  },
  created () {
    this.getComments()
  }
}
</script>
