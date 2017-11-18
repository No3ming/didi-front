<template>
  <container class="order-detail">
    <checklist :title="'订单编号： 12323123'" disabled :label-position="labelPosition" :required="true" :options="commonList" v-model="checklist" @on-change="change01"></checklist>
  </container>
</template>

<script>
  import Container from '../components/Container.vue'
  import { CellBox, Divider, Group, GroupTitle, XButton, Checklist, XAddress, ChinaAddressV4Data } from 'vux'
  import api from '../api'

  export default {
    name: 'orderDetailStep',
    data () {
      return {
        labelPosition: '',
        id: null,
        commonList: [],
        checklist: [],
        value_0_1: [],
        addressData: ChinaAddressV4Data
      }
    },
    async mounted () {
      this.id = this.$route.query['id']
      const res = await api.schedule({id: this.id})
      if (res.code === 20000) {
        this.commonList = []
        this.checklist = []
        res.data.map((item) => {
          this.commonList.push({key: item.id, value: item.name})
          if (item.check) {
            this.checklist.push(item.id)
          }
        })
      } else {
        let self = this
        this.$vux.alert.show({
          title: '提示',
          content: res.message,
          onHide () {
            if (res.code === 402) {
              self.$router.replace('/user/login')
            }
          }
        })
      }
    },
    methods: {
      next () {
        this.$router.push('/user/registered/step2')
      },
      change01 (str) {
        console.log(str)
      },
      async onSubmit () {
        if (this.checklist.length > 0) {
          const res = await api.postProgress({order_id: this.id, type: this.checklist.join(',')})
          if (res.code === 20000) {
            this.$router.replace('/user/progress')
          } else {
            let self = this
            this.$vux.alert.show({
              title: '提示',
              content: res.message,
              onHide () {
                if (res.code === 402) {
                  self.$router.replace('/user/login')
                }
              }
            })
          }
        } else {
          this.$vux.alert.show({
            title: '提示',
            content: '未选择'
          })
        }
      }
    },
    components: {
      Container,
      CellBox,
      Divider,
      Group,
      GroupTitle,
      XButton,
      Checklist,
      XAddress
    }
  }
</script>

<style lang="less">
  .order-detail {
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
