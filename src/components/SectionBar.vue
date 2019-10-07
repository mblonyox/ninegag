<template>
  <b-list-group>
    <b-list-group-item
      v-for="(section, key) in sections"
      :to="{name: 'PageIndexGroup', params: {group: section.url}}"
      active-class="active"
      :key="key"
    >
      <img :src="section.ogImageUrl" :alt="section.name" style="height: 1.5em;" />
      {{section.name}}
    </b-list-group-item>
  </b-list-group>
</template>

<script lang="ts">
import Vue from 'vue';
import { SectionMap } from '@/common/types';

export default Vue.extend({
  computed: {
    sections(): SectionMap {
      return this.$store.state.sections;
    },
  },
  created() {
    this.$store.dispatch('fetchSections');
  },
});
</script>