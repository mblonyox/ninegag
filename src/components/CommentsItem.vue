<template>
  <b-media class="mx-2 my-3">
    <b-img
      slot="aside"
      :src="`https://robohash.org/${comment.user.hashedAccountId}`"
      :alt="comment.user.displayName"
      width="64"
      height="64"
      rounded="circle"
      style="background-color: #afafaf;"/>
    <h5 class="mt-0">{{comment.user.displayName}}</h5>
    <template v-if="comment.type === 'userMedia'">
      <b-img
        v-for="img in comment.media"
        :key="img.hash"
        :src="img.imageMetaByType.image.url"
        fluid
      />
      <p v-html="comment.mediaText" />
    </template>
    <p v-html="comment.richtext" v-else />
    <b-link v-if="!showChildren && comment.childrenTotal" > {{comment.childrenTotal}} {{ comment.childrenTotal === 1 ? 'reply' : 'replies' }}. </b-link>
    <comments-item
      v-for="child in children"
      :comment="child"
      :key="child.commentId" />
  </b-media>
</template>

<script>
export default {
  name: 'comments-item',
  data: () => ({
    showChildren: false,
    children: []
  }),
  props: ['comment']
}
</script>
