<template>
  <container class="step3">
    <group title="第三步：请提供您的联系方式" label-width="7em" label-margin-right="0.5em" label-align="center">
      <x-input title="联系人<br/><span class='label-2'>(必填)</span>" text-align="right" @on-change="oncontacts" v-model="contacts1"
               placeholder="编辑" required ref="contacts"></x-input>
      <x-input required is-type="china-mobile" :max="13" title="联系手机<br/><span class='label-2'>(必填)</span>" @on-change="onPhone" text-align="right" ref="phone" v-model="phone1"
               placeholder="编辑"></x-input>
      <x-input required title="地址<br/><span class='label-2'>(必填)</span>" @on-change="onAddress" text-align="right" ref="phone" v-model="address1"
               placeholder="编辑"></x-input>
      <x-input ref="company" title="公司名<br/><span class='label-2'>(可填)</span>" @on-change="onCompany" text-align="right" v-model="company1"
               placeholder="编辑"></x-input>
      <x-input v-if="isLogin" required ref="password1" title="请设置一个登陆密码" type="password" @on-change="onPassword" placeholder="编辑" text-align="right" v-model="password1"></x-input>
      <x-input v-if="isLogin" required ref="password2" title="请重复输入密码" type="password" placeholder="编辑" :is-type="onComirePassword" text-align="right" v-model="password2"></x-input>
    </group>
    <divider class="tips">以上信息用于证明您的服务能力和资格，<br/>请确保提供的信息真实有效，我们<br/>不会泄漏您的信息</divider>
    <group>
      <cell-box>
        <x-button type="primary" :disabled="isNext" @click.native="onNext()">下一步</x-button>
      </cell-box>
    </group>
  </container>
</template>

<script>
  import Container from '../components/Container.vue'
  import xiangJi from '@/assets/xiangji.png'
  import {
    CellBox,
    Divider,
    XInput,
    Group,
    GroupTitle,
    Grid,
    GridItem,
    XButton,
    Cell,
    Checklist,
    XAddress,
    XTextarea
  } from 'vux'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'detail',
    data () {
      return {
        contacts1: '',
        phone1: '',
        address1: '',
        company1: '',
        password1: '',
        password2: '',
        isShow: false,
        xiangJi: xiangJi
      }
    },
    methods: {
      oncontacts (value) {
        this.upContacts(value)
      },
      onPhone (value) {
        this.upPhone(value)
      },
      onAddress (value) {
        this.upAddress(value)
      },
      onCompany (value) {
        this.upCompany(value)
      },
      onPassword (value) {
        this.upPassword(value)
      },
      onComirePassword (value) {
        if (!value) {
          return {valid: false, msg: '密码不能为空'}
        } else if (value !== this.password1) {
          return {valid: false, msg: '密码不一致'}
        } else {
          return {valid: true}
        }
      },
      onNext () {
        if (this.$refs.contacts.valid && this.$refs.phone.valid && this.$refs.password1.valid && this.$refs.password2.valid) {
          this.$router.push('/step4')
        } else {
          this.$vux.alert.show({
            title: '提示',
            content: '填写不正确'
          })
        }
      },
      miniUploaded (res) {
        this.$vux.loading.hide()
        if (res.code === 20000) {
          this.workingExperienceImgs1 = this.workingExperienceImgs1.concat(res.data)
        } else {
          console.log('err')
        }
      },
      miniChanged () {
        this.$vux.loading.show({
          text: 'Loading'
        })
        console.log('loading')
      },
      ...mapActions([
        'upContacts',
        'upPhone',
        'upAddress',
        'upWorkingExperience',
        'upWorkingExperienceImgs',
        'upPassword',
        'upCompany'
      ])
    },
    mounted () {
      this.contacts1 = this.contacts
      this.phone1 = this.phone
      this.address1 = this.address
      this.workingExperience1 = this.workingExperience
      this.workingExperienceImgs1 = this.workingExperienceImgs
      this.password1 = this.password
      this.password2 = this.password
      this.company1 = this.company
    },
    computed: {
      isNext () {
        return !(this.contacts1 && this.phone1 && this.address1 && this.password1 && this.password2 && this.password1 === this.password2)
      },
      ...mapGetters([
        'certificateImgs',
        'workingExperienceImgs',
        'workingExperience',
        'contacts',
        'phone',
        'address',
        'company',
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
      XAddress,
      XInput,
      XTextarea,
      Cell,
      Grid,
      GridItem
    }
  }
</script>

<style lang="less">
  .step3 {
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
