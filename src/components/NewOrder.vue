<template>
  <router-link class="new-button" to="/step1">新增</router-link>
</template>

<script>
  import { Badge } from 'vux'
  import { mapGetters } from 'vuex'

  export default {
    name: 'nav-bar',
    computed: {
      ...mapGetters([
        'progressTotal',
        'completedTotal'
      ])
    },
    components: {
      Badge
    }
  }
</script>

<style lang="less">
  .new-button {
    position: absolute;
    left: 20px;
    bottom: 90px;
    z-index: 23;
    padding: 10px;
    background-color: #46b8da;
    border-radius: 50%;
    color: #fff;
    box-shadow: 4px 3px 3px #ccc;
  }
</style>
