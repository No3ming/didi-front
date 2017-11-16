<template>
  <container class="certification">
    <group title="证件图片">
      <cell-box class="img-box">
        <div v-show="imgs.length > 0" class="img-box">
          <div v-for="(item, i) in imgs" class="img-item" >
            <img :src="item.url" :key="i" />
            <div class="doing">
              <icon type="clear" @click.native="onDel(i)"></icon> |
              <icon type="search" @click.native="onSee(item.url)"></icon>
            </div>
          </div>
        </div>
        <div v-show="imgs.length === 0">未上传图片</div>
      </cell-box>
    </group>
    <group-title>请按提示上传以下证件照片</group-title>
    <grid class="upload-box">
      <grid-item>
        <vue-core-image-upload
          :crop="false"
          :data="uploadData"
          inputOfFile="file"
          @imageuploaded="uploaded"
          @imagechanged="imagechanged"
          url="/api/upload" >
          <x-button type="primary">点击上传</x-button>
        </vue-core-image-upload>
      </grid-item>
    </grid>
    <grid>
      <grid-item v-for="(item, i) in imgList" :key="i">
        <img :src="item.url" alt=""/>
      </grid-item>
    </grid>
    <group>
      <cell-box>
        <x-button type="primary" @click.native="onSure">确认</x-button>
      </cell-box>
    </group>
    <div v-transfer-dom>
      <x-dialog v-model="isShow" class="dialog-demo" hide-on-blur>
        <div class="img-box">
          <img :src="seeImg" style="max-width:100%">
        </div>
        <div @click="isShow=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
  </container>
</template>

<script>
  import Container from '../components/Container.vue'
  import VueCoreImageUpload from 'vue-core-image-upload'
//  import fan from '@/assets/fan.png'
//  import logo from '@/assets/logo.png'
  import { Icon, CellBox, Divider, XInput, Group, GroupTitle, Grid, GridItem, XButton, Cell, Checklist, XAddress, XTextarea, Selector, XDialog, TransferDomDirective as TransferDom } from 'vux'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'certification',
    directives: {
      TransferDom
    },
    data () {
      return {
        doType: 1,
        Remarks1: '',
        Remarks2: '',
        imgList: [],
        uploadZheng: '',
        uploadFan: '',
        uploadTou: '',
        imgs: [],
        seeImg: '',
        isShow: false,
        uploadData: {
          type: 1
        }
      }
    },
    mounted () {
      this.imgs = this.certificateImgs
    },
    methods: {
      onSure () {
        this.upCertificateImgs(this.imgs)
        this.$router.back()
      },
      uploaded (res) {
        this.$vux.loading.hide()
        if (res.code === 20000) {
          this.imgs = this.imgs.concat(res.data)
        } else {
          console.log('err')
        }
      },
      imagechanged () {
        this.$vux.loading.show({
          text: 'Loading'
        })
        console.log('loading')
      },
      onSee (src) {
        this.seeImg = src
        this.isShow = true
      },
      onDel (index) {
        this.imgs.splice(index, 1)
      },
      ...mapActions([
        'upCertificateImgs'
      ])
    },
    computed: {
      ...mapGetters([
        'certificateImgs'
      ])
    },
    components: {
      Container, CellBox, Divider, XInput, Group, GroupTitle, Grid, GridItem, XButton, Cell, Checklist, XAddress, XTextarea, Selector, VueCoreImageUpload, Icon, XDialog
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/close';
  .certification {
    .care-item {
      padding: 0;
      color: #000;
    }

    .weui-label, .vux-label {
      font-size: 14px;
    }
    .weui-label {
      width: 6em;
    }

    .label-2 {
      font-size: 8px;
    }

    .weui-input {
      font-size: 14px;
      line-height: 14px;
    }

    .img-box{
      min-height: 100px;
    }
    .img-item {
      width: 22%;
      float: left;
      height: 100px;
      border: 1px solid #ccc;
      border-radius: 3px;
      margin: 3px;
      img {
        width: 100%;
        height: calc(100% - 30px);
        border: none;
      }
      .doing {
        text-align: center;
        font-size: 10px;

        i {
          font-size: 18px;
        }
      }
    }

    .dialog-demo {
      .weui-dialog{
        border-radius: 8px;
        padding-bottom: 8px;
      }
      .dialog-title {
        line-height: 30px;
        color: #666;
      }
      .img-box {
        height: 350px;
        overflow: hidden;
      }
      .vux-close {
        margin-top: 8px;
        margin-bottom: 8px;
      }
    }
    .img-box {
      flex: 1;
    }
  }
</style>
