<template>
  <container class="info">
    <blur :blur-amount=40 :url="info.avatar_url">
      <p class="center"><img :src="info.avatar_url"></p>
    </blur>
    <group title="我的信息">
      <cell-box>
        <span class="title">我的地址：</span>
        <span class="word" v-html="info.address"></span>
      </cell-box>
      <cell-box>
        <span class="title">服务城市：</span>
        <span class="word" v-html="info.serve_city"></span>
      </cell-box>
      <cell-box>
        <span class="title">服务项目：</span>
        <span class="word" v-html="info.serve_type"></span>
      </cell-box>
      <cell-box></cell-box>
    </group>
  </container>
</template>

<script>
  import Container from '../components/Container.vue'
  import { Blur, Group, CellBox } from 'vux'
  import api from '../api'

  export default {
    name: 'myInfo',
    data () {
      return {
        info: {
          address: '',
          serve_city: '',
          avatar_url: '',
          serve_type: ''
        }
      }
    },
    async mounted () {
      const res = await api.getInfo()
      if (res.code === 20000) {
        this.info = res.data
      } else {
        this.$vux.alert.show({
          title: '提示',
          content: res.message
        })
      }
    },
    components: {
      Group, CellBox, Container, Blur
    }
  }
</script>

<style lang="less">
  .info {
    .center {
      text-align: center;
      padding-top: 20px;
      color: #fff;
      font-size: 18px;
    }
    .center img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 4px solid #ececec;
    }
    .order-cell {
      background-color: #fff;
    }

    .title {
      color: #333;
    }

    .word {
      color: #666;
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
  }
</style>
