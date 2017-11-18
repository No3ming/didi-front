<template>
  <container class="order-detail">
    <group :title="'订单编号：' + order.order_no">
      <cell-box v-if="order.serve_type">
        <span class="title">需求项目：</span>
        <span class="word" v-html="order.serve_type"></span>
      </cell-box>
      <cell-box v-if="order.serve_city">
        <span class="title">需求城市：</span>
        <span class="word" v-html="order.serve_city"></span>
      </cell-box>
      <cell-box v-if="order.contacts">
        <span class="title">客户联系人：</span>
        <span class="word" v-html="order.contacts"></span>
      </cell-box>
      <cell-box v-if="order.phone">
        <span class="title">联系电话：</span>
        <span class="word" v-html="order.phone"></span>
      </cell-box>
      <cell-box v-if="order.company">
        <span class="title">公司名称：</span>
        <span class="word" v-html="order.company"></span>
      </cell-box>
      <cell-box v-if="order.commission_amount && order.enable_pay === 1">
        <span class="title">服务佣金：</span>
        <span class="danger" v-html="order.commission_amount"></span>
      </cell-box>
      <cell-box v-if="order.rob_depost || order.rob_depost === 0">
        <span class="title">抢单需支付保证金：</span>
        <span class="danger" type="warn" v-html="'¥' + order.rob_depost"></span>
      </cell-box>
      <cell-box></cell-box>
    </group>
    <div v-if="status === 1">
      <div v-if="order.enable_pay === 1">
        <divider class="tips">温馨提示：支付后订单会进入"进行中的订单"</divider>
        <group>
          <cell-box >
            <x-button type="primary" @click.native="onPay" >立即支付</x-button>
          </cell-box>
        </group>
      </div>
      <div v-else>
        <divider class="tips">温馨提示：客服会联系您处理需求</divider>
      </div>
    </div>
    <div v-if="status === 2">
      <group>
        <cell-box>
          <x-button plain type="primary" :link="'/user/order-detail-step?id=' + order.id">完成进度：<span v-html="order.status"></span></x-button>
        </cell-box>
        <cell-box>
          <x-button type="primary" @click.native="isShow = true">完成订单</x-button>
        </cell-box>
      </group>
    </div>
    <div v-if="status === 3">
      <group>
        <cell-box>
          <x-button plain type="primary" @click.native="onFinished">订单已完成</x-button>
        </cell-box>
      </group>
    </div>
    <div class="text-box" v-show="isShow">
      <div class="text-header clearfix">
        <x-button type="取消" class="pull-left cancel" mini @click.native="isShow = false; mark = ''; markImgs = []">取消</x-button>
        <x-button type="primary" class="pull-right" mini @click.native="onCompleted(false)">提交</x-button>
      </div>
      <group class="text-container">
        <x-textarea ref="textarea" required :rows="10" :max="1000" :placeholder="'备注，审核资料'" v-model="mark"></x-textarea>
      </group>
      <grid class="clearfix">
        <grid-item class="xiangji-box">
          <vue-core-image-upload
            :crop="false"
            class="xiangji"
            :data="uploadData"
            inputOfFile="file"
            @imageuploaded="miniUploaded"
            @imagechanged="miniChanged"
            url="/api/upload">
            <img :src="xiangJi" class="icon-upload">
          </vue-core-image-upload>
        </grid-item>
        <grid-item class="miniImg-box">
          <span class="miniImg" v-show="markImgs.length === 0">无</span>
          <img v-for="(item, i) in markImgs" :src="item.url" alt="缩略图" class="miniImg"/>
        </grid-item>
      </grid>
    </div>
  </container>
</template>

<script>
  import Container from '../components/Container.vue'
  import { CellBox, Divider, Group, GroupTitle, Grid, GridItem, XButton, XTextarea } from 'vux'
  import VueCoreImageUpload from 'vue-core-image-upload'
  import { mapGetters } from 'vuex'
  import xiangJi from '@/assets/xiangji.png'
  import api from '../api'

  export default {
    name: 'detail',
    data () {
      return {
        status: null,
        order: {},
        isShow: false,
        uploadData: {
          type: 3
        },
        xiangJi: xiangJi,
        mark: '',
        markImgs: []
      }
    },
    async mounted () {
      this.status = parseInt(this.$route.query['status'])
      this.order = this.nowOrder
    },
    methods: {
      async onPay () {
        if (this.order.rob_depost === 0) {
          const res = await api.robing({id: this.order.id})
          if (res.code === 20000) {
            let self = this
            this.$vux.alert.show({
              title: '提示',
              content: '抢单成功！',
              onHide () {
                self.$router.replace('/user/progress')
              }
            })
          } else {
            this.$vux.alert.show({
              title: '提示',
              content: res.message
            })
          }
        } else {
          let self = this
          this.$vux.alert.show({
            title: '提示',
            content: '暂不支持支付！',
            onHide () {
              self.$router.replace('/user/waitOrder')
            }
          })
        }
      },
      async onCompleted () {
        const res = await api.robOrdering()
        if (res.code === 20000) {
          let self = this
          this.$vux.alert.show({
            title: '提示',
            content: '已经提交！',
            onHide () {
              self.$router.replace('/user/completed')
            }
          })
        } else {
          this.$vux.alert.show({
            title: '提示',
            content: res.message
          })
        }
      },
      onFinished () {
        this.$router.replace('/user/completed')
      },
      miniUploaded (res) {
        this.$vux.loading.hide()
        if (res.code === 20000) {
          this.markImgs = this.markImgs.concat(res.data)
        } else {
          this.$vux.alert.show({
            title: '提示',
            content: res.message
          })
        }
      },
      miniChanged () {
        this.$vux.loading.show({
          text: 'Loading'
        })
      }
    },
    computed: {
      ...mapGetters([
        'nowOrder'
      ])
    },
    components: {
      Container,
      CellBox,
      Divider,
      Group,
      GroupTitle,
      XButton,
      XTextarea,
      Grid,
      GridItem,
      VueCoreImageUpload
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

    .text-box {
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: #fff;
    }

    .text-header {
      line-height: 20px;
      text-align: right;
      padding: 10px;
      overflow: hidden;
    }

    .text-container {
      .weui-cells {
        margin-top: 0;
      }
    }

    .xiangji-box {
      padding: 5px;
      border: 0;
    }

    .xiangji {
      width: 50px;
      height: 30px;
      padding: 5px;
    }

    .icon-upload {
      height: 100%;
    }

    .miniImg-box {
      height: 50px;
      padding: 10px 5px;
      text-align: right;
      background-color: #fff;
    }

    .miniImg {
      display: inline-block;
      height: 30px;
      width: 30px;
      color: #000;
      line-height: 30px;
      border: 1px solid #ccc;
      border-radius: 3px;
      overflow: hidden;
      font-size: 10px;
      text-align: center;
    }

    .img-item {
      width: 20px;
      height: 20px;
      border: 1px solid #ccc;
      border-radius: 3px;
      margin: 1px;
    }

    .weui-cell__bd {
      font-size: 14px;
    }

    .pull-left {
      float: left;
    }
    .pull-right {
      float: right;
    }
    .cancel {
      margin-top: 15px;
    }
  }

</style>
