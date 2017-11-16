<template>
  <container class="order-detail">
    <div v-show="step === 1">
      <checklist :title="'第一步: 请选择你能提供的服务（可多选）'" :label-position="labelPosition" :required="true" :options="commonList" v-model="checklist001" @on-change="change01" :max='1'></checklist>
      <x-button type="primary" @click.native="step=2">下一步</x-button>
    </div>
    <div v-show="step === 2">
      <group :title="'第一步: 请选择你能提供的城市'">
        <x-address :title="'第一步: 请选择你能提供的城市'" @on-hide="logHide" v-model="value_0_1" :list="addressData" placeholder="请选择地址">
          <template slot="title" slot-scope="props"><!-- use scope="props" when vue < 2.5.0 -->
            <span :class="props.labelClass" :style="props.labelStyle" style="height:24px;">
          <span style="vertical-align:middle;">地址</span>
        </span>
          </template>
        </x-address>
      </group>
      <x-button type="primary" @click.native="step=3">下一步</x-button>
    </div>
    <div v-show="step === 3">
      <checklist :title="'第一步: 请选择你能提供的服务（可多选）'" :label-position="labelPosition" :required="true" :options="commonList" v-model="checklist001" @on-change="change" :max='1'></checklist>
      <x-button type="primary" @click.native="step = 4">下一步</x-button>
    </div>
    <div v-show="step === 4">
      <checklist :title="'第一步: 请选择你能提供的服务（可多选）'" :label-position="labelPosition" :required="true" :options="commonList" v-model="checklist001" @on-change="change" :max='1'></checklist>
      <x-button type="primary" @click.native="onSubmit">确认提交</x-button>
    </div>
  </container>
</template>

<script>
  import Container from '../components/Container.vue'
  import { CellBox, Divider, Group, GroupTitle, XButton, Checklist, XAddress, ChinaAddressV4Data } from 'vux'

  export default {
    name: 'detail',
    data () {
      return {
        step: 1,
        labelPosition: '',
        commonList: [ '工商注册／变更', '记账报税', '只是产权注册' ],
        checklist001: [],
        value_0_1: [],
        addressData: ChinaAddressV4Data
      }
    },
    methods: {
      change01 (val, label) {
        console.log('change', val, label)
      },
      change () {
        console.log('test')
      },
      logHide (str) {
        console.log('on-hide', str)
      },
      onSubmit () {
        console.log('submit')
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
