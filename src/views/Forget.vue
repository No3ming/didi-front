<template>
  <container class="forget">
    forget
  </container>
</template>

<script>
  import Container from '../components/Container.vue'

  export default {
    name: 'login',
    data () {
      return {
        url: '',
        number: '',
        passWord: ''
      }
    },
    components: {
      Container
    }
  }
</script>

<style lang="less">
  .forget {

  }
</style>
