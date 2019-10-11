<template>
  <div id="app">
    <app-navbar></app-navbar>
    <b-container class="px-1" style="margin-top: 64px;">
      <b-card class="my-3">
        <b-row>
          <b-col align-h="center" lg="8" class="px-0">
            <router-view/>
          </b-col>
          <b-col align-h="center" lg="4" class="d-none d-lg-block">
            <section-bar></section-bar>
          </b-col>
        </b-row>
      </b-card>
    </b-container>
    <share-modal />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { BContainer, BCard, BRow, BCol } from 'bootstrap-vue';
import AppNavbar from '@/components/AppNavbar.vue';
import ShareModal from '@/components/ShareModal.vue';
import SectionBar from '@/components/SectionBar.vue';

export default Vue.extend({
  name: 'App',
  metaInfo: {
    title: '',
    titleTemplate: (chunk) => chunk ? `${chunk} | Ninegag` : 'Ninegag',
  },
  components: { AppNavbar, ShareModal, SectionBar, BContainer, BCard, BRow, BCol },
});
</script>

<style>
</style>
