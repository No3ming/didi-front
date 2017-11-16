<template>
  <container class="step3">
    <group title="第三步：请提供您的个人信息" label-width="7em" label-margin-right="0.5em" label-align="center">
      <x-input title="我的姓名<br/><span class='label-2'>(实名认证)</span>" text-align="right" @on-change="onRealName" v-model="realname1"
               placeholder="编辑" required ref="realname"></x-input>
      <x-input required is-type="china-mobile" :max="13" title="我的手机<br/><span class='label-2'>(也是本平台登陆账号)</span>" @on-change="onPhone" text-align="right" ref="phone" v-model="phone1"
               placeholder="编辑"></x-input>
      <x-input required ref="address" title="我的地址<br/><span class='label-2'>(用于快递票据)</span>" @on-change="onAddress" text-align="right" v-model="address1"
               placeholder="编辑"></x-input>
      <cell title="我的证件图片" inline-desc="(用于资质认证)" value-align="right" link="/registered/certification">
        <span v-show="certificateImgs.length === 0">编辑</span>
        <div v-show="certificateImgs.length > 0">
          <img v-for="(item, i) in certificateImgs" :src="item.url" :key="i" class="img-item"/>
        </div>
      </cell>
      <cell title="我的从业经历" inline-desc="(用于评估经验)" value-align="right"
            @click.native="isShow = true">
        <span v-show="workingExperienceImgs1.length === 0">编辑</span>
        <div v-show="workingExperienceImgs1.length > 0">
          <img v-for="(item, i) in workingExperienceImgs1" :src="item.url" :key="i" class="img-item"/>
        </div>
      </cell>
      <x-input required ref="password1" title="请设置一个登陆密码" type="password" @on-change="onPassword" placeholder="编辑" text-align="right" v-model="password1"></x-input>
      <x-input required ref="password2" title="请重复输入密码" type="password" placeholder="编辑" :is-type="onComirePassword" text-align="right" v-model="password2"></x-input>
    </group>
    <divider class="tips">以上信息用于证明您的服务能力和资格，<br/>请确保提供的信息真实有效，我们<br/>不会泄漏您的信息</divider>
    <group>
      <cell-box>
        <x-button type="primary" :disabled="isNext" @click.native="next">下一步</x-button>
      </cell-box>
    </group>
    <div class="text-box" v-show="isShow">
      <div class="text-header">
        <x-button type="取消" class="pull-left cancel" mini @click.native="cancel">取消</x-button>
        <x-button type="primary" class="pull-right" mini @click.native="textStatus(false)">保存</x-button>
      </div>
      <group class="text-container">
        <x-textarea ref="textarea" required :rows="10" :max="500" :placeholder="'我的经历'" @on-focus="onEvent('focus')"
                    @on-blur="onEvent('blur')" @on-change="onWorkingExperience" v-model="workingExperience1"></x-textarea>
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
          <span class="miniImg" v-show="workingExperienceImgs1.length === 0">无</span>
          <img v-for="(item, i) in workingExperienceImgs1" :src="item.url" alt="缩略图" class="miniImg"/>
        </grid-item>
      </grid>
    </div>
  </container>
</template>

<script>
  import Container from '../components/Container.vue'
  import VueCoreImageUpload from 'vue-core-image-upload'
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
        realname1: '',
        phone1: '',
        address1: '',
        workingExperience1: '',
        workingExperienceImgs1: [],
        password1: '',
        password2: '',
        isShow: false,
        xiangJi: xiangJi,
        uploadData: {
          type: 2
        }
      }
    },
    methods: {
      onRealName (value) {
        this.upRealname(value)
      },
      onPhone (value) {
        this.upPhone(value)
      },
      onAddress (value) {
        this.upAddress(value)
      },
      onWorkingExperience (value) {
        this.upWorkingExperience(value)
      },
      onWorkingExperienceImgs (value) {
        this.upWorkingExperienceImgs(value)
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
      next () {
        if (this.$refs.realname.valid && this.$refs.phone.valid && this.$refs.password1.valid && this.$refs.password2.valid && this.$refs.address.valid) {
          this.$router.push('/registered/step4')
        } else {
          this.$vux.alert.show({
            title: '提示',
            content: '填写不正确'
          })
        }
      },
      logHide (str) {
        console.log(this.value)
      },
      cancel () {
        this.isShow = false
        this.workingExperienceImgs1 = []
        this.workingExperience1 = ''
        this.upWorkingExperienceImgs([])
        this.upWorkingExperience('')
      },
      textStatus (status) {
        this.isShow = false
        this.upWorkingExperienceImgs(this.workingExperienceImgs1)
        this.upWorkingExperience(this.workingExperience1)
      },
      onEvent (tips) {
        console.log(tips)
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
        'upRealname',
        'upPhone',
        'upAddress',
        'upWorkingExperience',
        'upWorkingExperienceImgs',
        'upPassword'
      ])
    },
    mounted () {
      this.realname1 = this.realname
      this.phone1 = this.phone
      this.address1 = this.address
      this.workingExperience1 = this.workingExperience
      this.workingExperienceImgs1 = this.workingExperienceImgs
      this.password1 = this.password
      this.password2 = this.password
    },
    computed: {
      isNext () {
        return !(this.realname1 && this.phone1 && this.address1 && this.workingExperience1 && this.certificateImgs && this.password1 && this.password2 && this.password1 === this.password2)
      },
      ...mapGetters([
        'certificateImgs',
        'workingExperienceImgs',
        'workingExperience',
        'realname',
        'phone',
        'address'
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
