<template>
  <b-card no-body v-if="section">
    <b-card-body>
      <b-media>
        <template v-slot:aside>
          <b-img :src="section.ogImageUrl" width="100" alt="placeholder"></b-img>
        </template>
        <h2>{{section.name}}</h2>
        <p>{{section.description}}</p>
      </b-media>
    </b-card-body>
    <b-card-footer footer-tag="nav">
      <b-nav card-header fill tabs>
        <b-nav-item
          :to="{name: 'PageIndexGroup', params: {group: section.url}}"
          :active="type !== 'fresh'"
        >
          Hot
        </b-nav-item>
        <b-nav-item
          :to="{name: 'PageIndexGroup', params: {group: section.url, type: 'fresh'}}"
          :active="type === 'fresh'"
        >
          Fresh
        </b-nav-item>
      </b-nav>
    </b-card-footer>
  </b-card>
  <b-card v-else>
    <h2>{{type.toUpperCase()}}</h2>
  </b-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { BCard, BCardBody, BCardFooter, BMedia, BImg, BNav, BNavItem } from 'bootstrap-vue';
import { Section } from '@/common/types';

export default Vue.extend({
  computed: {
    section(): Section {
      return this.$store.getters.section;
    },
    type(): string {
      return this.$store.state.pageQuery.type;
    },
  },
  components: { BCard, BCardBody, BCardFooter, BMedia, BImg, BNav, BNavItem },
});
</script>