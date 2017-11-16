<template>
  <container class="contain-nav canOrder">
    <div style="height:44px;">
      <grid class="order-header">
        <grid-item v-for="(item, index) in gridHeader" :key="index" class="header-item">
          <span class="grid-center info" v-html="item"></span>
        </grid-item>
      </grid>
    </div>
    <div>
      <x-table full-bordered style="background-color:#fff; table-layout:fixed" >
        <tbody>
        <tr v-for="(item, index) in orders" :key="index" class="order-item">
          <td v-html="item.contacts"></td>
          <td v-html="item.serve_type"></td>
          <td v-html="item.commission_amount"></td>
          <td >
            <span class="grid-center success" @click="onDetail(item)" v-html="item.status"></span>
          </td>
        </tr>
        </tbody>
      </x-table>
    </div>
    <divider class="no-more">没有更多数据了</divider>
  </container>
</template>

<script>
  import Container from '../components/Container.vue'
  import { Sticky, Grid, GridItem, Divider, XTable } from 'vux'
  import OrderItem from '../components/OrderItem.vue'
  import api from '../api'
  import { mapActions } from 'vuex'

  export default {
    name: 'canOrder',
    data: () => {
      return {
        gridHeader: ['客户姓名', '服务项目', '服务佣金', '佣金状态'],
        orders: []
      }
    },
    methods: {
      onDetail (order) {
        this.upNowOrder(order)
        this.$router.push('/order/detail?status=3')
      },
      ...mapActions([
        'upNowOrder',
        'upCompletedTotal'
      ])
    },
    async mounted () {
      this.$vux.loading.show({
        text: 'Loading'
      })
      const res = await api.getComplete()
      this.$vux.loading.hide()
      if (res.code === 20000) {
        this.orders = res.data.lists
        this.upCompletedTotal(res.data.total)
      } else {
        let self = this
        this.$vux.alert.show({
          title: '提示',
          content: res.message,
          onHide () {
            if (res.code === 402) {
              self.$router.replace('/login')
            }
          }
        })
      }
    },
    components: {
      Container,
      Sticky,
      Grid,
      GridItem,
      OrderItem,
      Divider,
      XTable
    }
  }
</script>

<style lang="less">
  .canOrder {
    .order-header {
      background-color: #fff;
    }
    .header-item {
      padding: 0;
      font-size: 14px;
      color: #333;
      text-align: center;
      line-height: 32px;
    }
    .no-more {
      font-size: 10px;
      padding: 10px;
    }

    .order-item {
      td {
        padding: 6px 3px;
        font-size: 12px;
        color: #333;
        text-align: center;
        line-height: 16px;
      }
    }
  }
</style>
