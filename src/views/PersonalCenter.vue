<template>
  <container class="center">
    <group :title="'我的赚钱'">
      <cell title="账户金额(可提现)" :value="'¥' + amount" value-align="right" @click.native="onWithdraw"></cell>
      <cell title="已结算金额" value="查看" value-align="right" link="/amount/1"></cell>
      <cell title="已提现金额" value="查看" value-align="right" link="/amount/2"></cell>
    </group>
    <group :title="'我的信息'">
      <cell title="我的信息(服务项目,城市,个人信息)" value="查看" value-align="right" link="/personal/my-info"></cell>
    </group>
    <div v-transfer-dom>
      <confirm v-model="isWithdraw"
         show-input
         ref="confirm"
         title="输入金额"
         @on-cancel="onCance"
         @on-confirm="onConfirm"
         @on-show="onShow"
         @on-hide="onHide">
      </confirm>
    </div>
  </container>
</template>

<script>
  import Container from '../components/Container.vue'
  import {CellBox, Divider, Group, GroupTitle, XButton, Cell, Confirm, TransferDom} from 'vux'
  import api from '../api'

  export default {
    name: 'center',
    directives: {
      TransferDom
    },
    data () {
      return {
        isWithdraw: false,
        withdraw: null,
        amount: null,
        frozen_amount: null,
        withdraw_amount: null
      }
    },
    async mounted () {
      const res = await api.getCenter()
      if (res.code === 20000) {
        this.amount = res.data.amount
        this.frozen_amount = res.data.frozen_amount
        this.withdraw_amount = res.data.withdraw_amount
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
    methods: {
      onWithdraw () {
        console.log('提款')
        this.isWithdraw = true
      },
      onCance () {
        this.isWithdraw = false
        this.$refs.confirm.setInputValue('')
      },
      async onConfirm (value) {
        this.$refs.confirm.setInputValue('')
        const res = await api.getWithdraw({amount: value})
        if (res.code === 20000) {
          let self = this
          this.$vux.alert.show({
            title: '提示',
            content: '已经提交处理！',
            onHide () {
              self.$router.replace('/personal')
            }
          })
        } else {
          this.$vux.alert.show({
            title: '提示',
            content: res.message
          })
        }
      },
      onShow () {
        console.log('show')
      },
      onHide () {
        console.log('hide')
      }
    },
    components: {
      Container,
      CellBox,
      Divider,
      Group,
      GroupTitle,
      XButton,
      Cell,
      Confirm
    }
  }
</script>

<style lang="less">
  .center {
    .order-cell {
      background-color: #fff;
    }

    .title {

    }

    .word {
      color: #666;
    }

    .tips {
      line-height: 20px;
    }
  }

</style>
