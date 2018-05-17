<template>
  <b-card
    :title="post.title"
    class="my-5"
  >
    <div class="video-wrapper" v-if="post.type === 'Animated'">
      <video
        ref="video"
        controls
        :poster="post.images.image460.url"
        onclick="this.paused ? this.play() : this.pause();"
      >
        <source :src="post.images.image460sv.vp9Url" v-if="!!post.images.image460sv.vp9Url" type="video/webm">
        <source :src="post.images.image460sv.h265Url" v-if="!!post.images.image460sv.h265Url" type="video/mp4">
        <source :src="post.images.image460sv.url" type="video/mp4">
      </video>
      <svg class="video-overlay-play-button" viewBox="0 0 200 200" alt="Play video" @click="onClickPlay" v-if="!played">
        <circle cx="100" cy="100" r="90" fill="none" stroke-width="15" stroke="#fff"/>\
        <polygon points="70, 55 70, 145 145, 100" fill="#fff"/>
      </svg>
    </div>
    <b-img
      :src="post.images.image700.url"
      :alt="post.title"
      center
      fluid
      v-else
    />
    <div>
      <b-badge
        pill="true"
        v-for="tag in post.tags"
        :key="tag.url"
        class="m-1"
      >
        {{tag.key}}
      </b-badge>
    </div>
  </b-card>
</template>

<script>
export default {
  data: () => ({
    played: false
  }),
  methods: {
    onClickPlay () {
      this.played = true
      this.$refs.video.play()
    }
  },
  props: ['post']
}
</script>

<style>
.video-wrapper {
    position: relative;
}

.video-wrapper > video {
    width: 100%;
    vertical-align: middle;
}

.video-overlay-play-button {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 10px calc(50% - 50px);
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    opacity: 0.95;
    cursor: pointer;
    background-image: linear-gradient(transparent, #000);
    transition: opacity 150ms;
}

.video-overlay-play-button:hover {
    opacity: 1;
}
</style>
