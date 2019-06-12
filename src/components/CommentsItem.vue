<template>
  <b-media class="mx-2 my-3 comment">
    <b-img
      slot="aside"
      :src="`https://robohash.org/${comment.user.hashedAccountId}`"
      :alt="comment.user.displayName"
      fluid
      rounded="circle"
      class="avatar" />
    <h5 class="mt-0">{{comment.user.displayName}}</h5>
    <template v-if="comment.type === 'userMedia'">
      <b-img
        v-for="img in comment.media"
        :key="img.hash"
        :src="img.imageMetaByType.type === 'ANIMATED' ? img.imageMetaByType.animated.url : img.imageMetaByType.image.url"
        fluid
      />
      <p v-html="comment.mediaText" />
    </template>
    <p v-html="comment.richtext" v-else />
    <b-link v-if="!showChildren && comment.childrenTotal" @click.prevent="showChildren = !showChildren"> {{comment.childrenTotal}} {{ comment.childrenTotal === 1 ? 'reply' : 'replies' }}. </b-link>
    <template v-else-if="children.length">
      <comments-item
        v-for="child in children"
        :comment="child"
        :post-id="postId"
        :order-score="orderScore"
        :key="child.commentId" />
      <infinite-loading @infinite="infiniteHandler">
        <hr slot="no-more">
      </infinite-loading>
    </template>
  </b-media>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'comments-item',
  data: () => ({
    showChildren: false,
    children: [],
    hasNext: true
  }),
  computed: {
    refCommentId () {
      if (!this.children.length) return null
      return this.children[this.children.length - 1].commentId
    }
  },
  props: ['comment', 'postId', 'orderScore'],
  methods: {
    getChildren () {
      const query = new URLSearchParams('appId=a_dd8f2b7d304a10edaf6f29517ea0ca4100a43d1b&count=10')
      query.set('url', 'http://9gag.com/gag/' + this.postId)
      query.set('order', this.orderScore ? 'score' : 'ts')
      query.set('refCommentId', this.refCommentId)
      return fetch('/comment.php/v1/cacheable/comment-list.json?' + query.toString())
        .then(res => res.json())
        .then(res => {
          this.children = this.children.concat(res.payload.comments)
          this.hasNext = res.payload.hasNext
        })
    },
    infiniteHandler ($state) {
      if (!this.hasNext) return $state.complete()
      this.getChildren()
        .then(() => $state.loaded())
        .catch($state.error)
    }
  },
  created () {
    this.children = this.comment.children
  },
  components: {InfiniteLoading}
}
</script>

<style>
.comment .avatar {
  background-color: #afafaf;
  max-width: 4rem;
  max-height: 4rem;
}

@media (max-width: 767.98px) {
  .comment .avatar {
    max-width: 3rem;
    max-height: 3rem;
  }
}

@media (max-width: 575.98px) {
  .comment .avatar {
    max-width: 2rem;
    max-height: 2rem;
  }
}
</style>
