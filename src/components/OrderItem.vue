<template>
  <grid class="order-item">
    <grid-item class="header-item">
      <span class="grid-center" v-html="order.contacts"></span>
    </grid-item>
    <grid-item  class="header-item">
      <span class="grid-center" v-html="order.serve_type"></span>
    </grid-item>
    <grid-item  class="header-item">
      <span class="grid-center" v-html="order.commission_amount"></span>
    </grid-item>
    <grid-item  class="header-item">
      <router-link class="grid-center success" :to="'/order/detail?id=' + order.id" v-html="order.company"></router-link>
    </grid-item>
  </grid>
</template>

<script>
  import { Grid, GridItem } from 'vux'

  export default {
    name: 'orderItem',
    data () {
      return {

      }
    },
    props: {
      order: Object
    },
    components: {
      Grid,
      GridItem
    }
  }
</script>
<style lang="less">
  .order-item {
    background-color: #fff;
    .link {
      color: rgba(45, 168, 44, 0.67);
    }
  }

</style>
