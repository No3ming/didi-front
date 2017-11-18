<template>
  <container class="step4">
    <group title="预览您即将提交的信息" label-width="7em" label-margin-right="0.5em" label-align="center">
      <cell title="需求项目" value-align="right" link="/user/step1">
        <span v-show="services.length === 0">编辑</span>
        <div v-show="services.length > 0">
          <span v-for="(item, i) in services" v-html="item + ' '"></span>
        </div>
      </cell>
      <cell title="需求城市" value-align="right" link="/user/step2">
        <span v-show="serveCitys.length === 0">编辑</span>
        <div v-show="serveCitys.length > 0">
          <span v-for="(item, i) in serveCitys" v-html="item + ' '"></span>
        </div>
      </cell>
      <cell title="联系人" :value="contacts" value-align="right" link="/user/step3"></cell>
      <cell title="地址" :value="address" value-align="right" link="/user/step3"></cell>
      <cell title="联系手机" :value="phone" value-align="right" link="/user/step3"></cell>
      <cell v-if="!token" title="登陆密码" value="******" value-align="right" link="/user/step3"></cell>
    </group>
    <divider class="tips">以上信息用于证明您的服务能力和资格，<br/>请确保提供的信息真实有效，我们<br/>不会泄漏您的信息</divider>
    <group>
      <cell-box>
        <x-button type="primary" @click.native="onSure">确认提交</x-button>
      </cell-box>
    </group>
  </container>
</template>

<script>
  import Container from '../components/Container.vue'
  import VueCoreImageUpload from 'vue-core-image-upload'
  import { CellBox, Divider, XInput, Group, GroupTitle, Grid, GridItem, XButton, Cell, Checklist, XAddress, XTextarea, ChinaAddressV4Data } from 'vux'
  import { mapGetters } from 'vuex'
  import api from '../api'

  export default {
    name: 'detail',
    data () {
      return {
        commonList: []
      }
    },
    mounted () {
      // this.commonList = this.newServiceList
    },
    methods: {
      async onSure () {
        this.$vux.loading.show({
          text: 'Loading'
        })
        const serviceList = this.serviceList.join(',')
        const serveCityId = this.serveCityId.join(',')
        let res
        if (this.token) {
          res = await api.onOrder({
            serve_type: serviceList,
            serve_city_id: serveCityId,
            company: this.company,
            address: this.address,
            contacts: this.contacts,
            phone: this.phone
          })
        } else {
          res = await api.registered({
            serve_type: serviceList,
            serve_city_id: serveCityId,
            address: this.address,
            company: this.company,
            contacts: this.contacts,
            phone: this.phone,
            password: this.password
          })
        }

        this.$vux.loading.hide()
        if (res.code === 20000) {
          // this.$router.push('/user/registered/step4')
          let self = this
          this.$vux.alert.show({
            title: '提交成功',
            content: res.message,
            onHide () {
              if (self.token) {
                self.$router.push('/user/waitOrder')
              } else {
                self.$router.push('/user/login')
              }
            }
          })
        } else {
          this.$vux.alert.show({
            title: '提示',
            content: res.message
          })
        }
      },
      logHide (str) {
        console.log(this.value)
      },
      textStatus (status) {
        this.isShow = status
        if (status) {
          this.$refs.textarea.focus()
        }
      }
    },
    computed: {
      services () {
        return this.serviceList.map((item, i) => {
          return this.newServiceList[i].value
        })
      },
      serveCitys () {
        let citys = []
        ChinaAddressV4Data.forEach((item, i) => {
          this.serveCityId.forEach((value, i) => {
            if (item.value === value) {
              citys.push(item.name)
            }
          })
        })
        return citys
      },
      ...mapGetters([
        'certificateImgs',
        'workingExperienceImgs',
        'workingExperience',
        'contacts',
        'password',
        'company',
        'phone',
        'address',
        'serveCityId',
        'serviceList',
        'token',
        'newServiceList'
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
      XAddress,
      XInput,
      XTextarea,
      Cell,
      VueCoreImageUpload,
      Grid,
      GridItem
    }
  }
</script>

<style lang="less">
  .step4 {
    .order-cell {
      background-color: #fff;
    }

    .title {

    }

    .word {
      color: #666;
    }

    .weui-label, .vux-label {
      font-size: 14px;
    }

    .vux-label-desc {
      font-size: 8px;
      text-align: left;
      text-indent: 3em;
      display: block;
    }

    .label-2 {
      font-size: 8px;
    }
    .tips {
      line-height: 14px;
      font-size: 12px;
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

    .weui-cell__ft {
      font-size: 14px;
    }

    .img-item {
      width: 20px;
      height: 20px;
      border: 1px solid #ccc;
      border-radius: 3px;
      margin: 1px;
    }
  }

</style>
