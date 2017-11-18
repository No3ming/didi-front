<template>
  <container class="order-detail">
    <checklist :title="'第一步: 请选择你能需要的服务（可多选）'" :label-position="labelPosition" :required="true" :options="commonList" v-model="checks" @on-change="change01"></checklist>
    <group>
      <cell-box>
        <x-button type="primary" :disabled="checks.length === 0" @click.native="next">下一步</x-button>
      </cell-box>
    </group>
  </container>
</template>

<script>
  import Container from '../components/Container.vue'
  import { CellBox, Divider, Group, GroupTitle, XButton, Checklist, XAddress, ChinaAddressV4Data } from 'vux'
  import { mapGetters, mapActions } from 'vuex'
  import api from '../api'

  export default {
    name: 'detail',
    data () {
      return {
        labelPosition: '',
        commonList: [],
        checks: [],
        value_0_1: [],
        addressData: ChinaAddressV4Data
      }
    },
    async mounted () {
      const res = await api.getServeType()
      if (res.code === 20000) {
        this.commonList = Object.keys(res.data).map((item) => {
          return {key: item, value: res.data[item]}
        })
        this.upNewServiceList(this.commonList)
      } else {
        this.$vux.alert.show({
          title: '提示',
          content: res.message
        })
      }
      this.checks = this.serviceList
    },
    methods: {
      next () {
        this.upServiceList(this.checks)
        this.$router.push('/user/step2')
      },
      change01 (str) {
        console.log(str)
      },
      ...mapActions([
        'upServiceList',
        'upNewServiceList'
      ])
    },
    computed: {
      ...mapGetters([
        'serviceList',
        'isLogin'
      ])
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
