<template>
  <b-card class="my-3">
    <b-row>
      <b-col
        align-h="center"
        lg="8"
        class="px-0"
      >
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import CardContent from './CardContent'

export default {
  data: () => ({
    post: {}
  }),
  props: ['id'],
  components: {CardContent}
}
</script>
