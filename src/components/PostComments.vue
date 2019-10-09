<template>
  <div>
    <b v-if="total">{{total}} Comments</b>
    <b-form-checkbox v-model="orderScore" switch class="float-right">
      <b>{{ orderScore ? 'Hot' : 'Fresh' }}</b>
    </b-form-checkbox>
    <hr />
    <comments-item
      v-for="comment in comments"
      :key="comment.commentId"
      :comment="comment"
      :post-id="id"
      :order-score="orderScore"
    />
    <infinite-loading @infinite="infiniteHandler" :key="orderScore" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { BFormCheckbox } from 'bootstrap-vue';
import InfiniteLoading from 'vue-infinite-loading';
import CommentsItem from './CommentsItem.vue';
import { Comment } from '../common/types';

export default Vue.extend({
  data: () => ({
    comments: [] as Comment[],
    total: 0,
    hasNext: true,
    orderScore: true,
  }),
  computed: {
    ref(): string {
      if (!this.comments.length) {
        return '';
      }
      return this.comments[this.comments.length - 1].orderKey;
    },
  },
  watch: {
    orderScore() {
      this.comments = [];
      this.hasNext = true;
    },
  },
  props: ['id'],
  methods: {
    getComments() {
      const query = new URLSearchParams(
        'appId=a_dd8f2b7d304a10edaf6f29517ea0ca4100a43d1b&count=10',
      );
      query.set('url', 'http://9gag.com/gag/' + this.id);
      query.set('order', this.orderScore ? 'score' : 'ts');
      if (this.ref) {
        query.set('ref', this.ref);
      }
      return fetch(
        '/comment.php/v1/cacheable/comment-list.json?' + query.toString(),
      )
        .then((res) => res.json())
        .then((res) => {
          this.comments = this.comments.concat(res.payload.comments);
          this.total = res.payload.total;
          this.hasNext = res.payload.hasNext;
        });
    },
    infiniteHandler($state: any) {
      if (!this.hasNext) {
        return $state.complete();
      }
      return this.getComments()
        .then(() => $state.loaded())
        .catch($state.error);
    },
  },
  components: { BFormCheckbox, InfiniteLoading, CommentsItem },
});
</script>
