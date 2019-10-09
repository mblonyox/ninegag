<template>
  <b-list-group>
    <b-list-group-item><b>POPULAR:</b></b-list-group-item>
    <b-list-group-item
      v-for="(type, key) in types"
      :to="{name: 'PageIndexDefault', params: {type: key}}"
      active-class="active"
      :key="key"
    >
      <span style="min-width: 1.5em; display: inline-block;">{{type.icon}}</span>
      {{type.name}}
    </b-list-group-item>
    <b-list-group-item><b>SECTIONS:</b></b-list-group-item>
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
import { BListGroup, BListGroupItem } from 'bootstrap-vue';
import { SectionMap } from '@/common/types';

export default Vue.extend({
  data: () => ({
    types: {
      hot: {
        icon: '🔥',
        name: 'Hot',
      },
      trending: {
        icon: '📈',
        name: 'Trending',
      },
      fresh: {
        icon: '🕒',
        name: 'Fresh',
      },
    },
  }),
  computed: {
    sections(): SectionMap {
      return this.$store.state.sections;
    },
  },
  created() {
    this.$store.dispatch('fetchSections');
  },
  components: { BListGroup, BListGroupItem },
});
</script>