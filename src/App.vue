<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-container>
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand>9GAG</b-navbar-brand>
      </b-container>
    </b-navbar>
    <b-container class="px-1">
      <router-view :key="$route.query.after"/>
    </b-container>
    <share-modal/>
  </div>
</template>

<script>
import ShareModal from './components/ShareModal'

export default {
  name: 'App',
  components: {ShareModal}
}
</script>

<style>
</style>
