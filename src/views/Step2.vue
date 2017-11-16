<template>
  <container class="step2">
    <group :title="'第二步: 请选择你能提供的城市'">
      <x-address :title="'第e二步: 请选择你能提供的城市'" @on-hide="logHide" v-model="value" :list="addressData" placeholder="请选择地址" >
        <template slot="title" slot-scope="props"><!-- use scope="props" when vue < 2.5.0 -->
          <span :class="props.labelClass" :style="props.labelStyle" style="height:24px;">
          <span style="vertical-align:middle;">地址</span>
        </span>
        </template>
      </x-address>
    </group>
    <group>
      <cell-box>
        <x-button type="primary" :disabled="value.length === 0" @click.native="next">下一步</x-button>
      </cell-box>
    </group>
  </container>
</template>

<script>
  import Container from '../components/Container.vue'
  import { CellBox, Divider, Group, GroupTitle, XButton, Checklist, XAddress, ChinaAddressV4Data } from 'vux'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'step2',
    data () {
      return {
        value: [],
        addressData: ChinaAddressV4Data
      }
    },
    mounted () {
      this.value = this.serveCityId
    },
    methods: {
      next () {
        this.upServeCityId(this.value)
        this.$router.push('/registered/step3')
      },
      logHide (str) {
        console.log(this.value)
      },
      ...mapActions([
        'upServeCityId'
      ])
    },
    computed: {
      ...mapGetters([
        'serveCityId'
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
  .step2 {
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
    .weui-cell {
      font-size: 14px;
    }
  }

</style>
