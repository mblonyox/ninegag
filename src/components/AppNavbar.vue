<template>
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
</template>

<script lang="ts">
import Vue from 'vue';
import { BNavbar, BContainer, BNavbarBrand, BNavbarToggle, BNavbarNav, BCollapse } from 'bootstrap-vue';
import SectionBar from '@/components/SectionBar.vue';

export default Vue.extend({
  components: { BNavbar, BContainer, BNavbarBrand, BNavbarToggle, BNavbarNav, BCollapse, SectionBar },
});
</script>