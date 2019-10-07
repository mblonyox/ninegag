<template>
  <div id="app">
    <b-navbar fixed="top" toggleable="md" type="dark" variant="dark">
      <b-container>
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand :to="{name: 'PageIndexDefault'}">9GAG</b-navbar-brand>
      </b-container>
      <b-collapse id="nav_collapse" class="w-100 my-2">
        <b-navbar-nav>
          <div class="overflow-auto" style="max-height: 50vh;">
            <section-bar></section-bar>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-container class="px-1" style="margin-top: 64px;">
      <router-view :key="routeKey" />
    </b-container>
    <share-modal />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ShareModal from './components/ShareModal.vue';
import SectionBar from '@/components/SectionBar.vue';

export default Vue.extend({
  name: 'App',
  computed: {
    routeKey(): string {
      return '' +
        this.$route.params.group +
        this.$route.params.type +
        this.$route.query.after;
    },
  },
  components: { ShareModal, SectionBar },
});
</script>

<style>
</style>
