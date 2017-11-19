<template>
  <container class="amount">
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
        <tr v-for="(item, index) in list" :key="index" class="order-item">
          <td v-html="item.amount"></td>
          <td v-html="item.status"></td>
          <td v-if="item.withdraw_at" v-html="item.withdraw_at"></td>
          <td v-if="item.frozen_at" v-html="item.frozen_at"></td>
        </tr>
        </tbody>
      </x-table>
    </div>
    <divider class="no-more">没有更多数据了</divider>
  </container>
</template>

<script>
  import Container from '../components/Container.vue'
  import { Sticky, Group, CellBox, XButton, Grid, GridItem, Divider, XTable } from 'vux'
  import OrderItem from '../components/OrderItem.vue'
  import api from '../api'

  export default {
    name: 'amount',
    data () {
      return {
        status: null,
        gridHeader: ['佣金', '状态', '时间'],
        list: []
      }
    },
    async mounted () {
      console.log(1231)
      this.status = parseInt(this.$route.params['id'])
      console.log(this.status)
      let res
      if (this.status === 1) {
        res = await api.getFrozenList()
      } else if (this.status === 2) {
        res = await api.getWithdrawList()
      } else {
        this.$vux.alert.show({
          title: '提示',
          content: '网络有问题'
        })
        return false
      }
      if (res.code === 20000) {
        this.list = res.data.lists
      } else {
        let self = this
        this.$vux.alert.show({
          title: '提示',
          content: res.message,
          onHide () {
            if (res.code === 402 || res.code === 405) {
              self.$router.replace('/user/login?path=order')
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
      Group,
      CellBox,
      XButton,
      XTable
    }
  }
</script>

<style lang="less">
  .amount {
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
        padding: 10px 3px;
        font-size: 12px;
        color: #333;
        text-align: center;
        line-height: 16px;
      }
    }
  }
</style>
