<template>
  <container class="login">
    <blur :blur-amount=40 :url="url">
      <p class="center"><img :src="url"></p>
    </blur>
    <group label-width="3em" label-margin-right="2em" label-align="right">
      <x-input title="手机" placeholder="您注册时的手机号码" ref="username" required is-type="china-mobile" v-model="username"></x-input>
      <x-input title="密码" placeholder="您注册时使用的密码" ref="password" required v-model="password"></x-input>
    </group>
    <group>
      <cell-box>
        <x-button type="primary" @click.native="onLogin">登陆</x-button>
      </cell-box>
    </group>
    <flexbox class="link-to">
      <flexbox-item class="link-box">
        <a @click="onRegister" class="link">注册和通过平台认证</a>
      </flexbox-item>
      <flexbox-item class="link-box">
        <a class="link" @click="linkService">忘记手机号码</a>
      </flexbox-item>
    </flexbox>
  </container>
</template>

<script>
  import Container from '../components/Container.vue'
  import {Blur, Group, Cell, XInput, XButton, CellBox, Flexbox, FlexboxItem} from 'vux'
  import defaultImg from '@/assets/header.jpg'
  import api from '../api'
  import { mapActions, mapGetters } from 'vuex'
  import axios from 'axios'

  export default {
    name: 'login',
    data () {
      return {
        url: defaultImg,
        username: '',
        password: ''
      }
    },
    methods: {
      async onLogin () {
        if (this.$refs.username.valid && this.$refs.password.valid) {
          this.$vux.loading.show({
            text: 'Loading'
          })
          const res = await api.login({ username: this.username, password: this.password })
          if (res.code === 20000) {
            this.upToken(res.data.token)
            let self = this
            let path = this.$route.query['path'] || 'order'
            this.$vux.alert.show({
              title: '登陆成功',
              onHide () {
                axios.defaults.params = {token: res.data.token}
                self.upIsLogin(true)
                self.upIsCenter(window.sessionStorage.getItem('user-isCenter') === 'true')
                if (path === 'center') {
                  self.$router.replace('/user/personal')
                } else {
                  self.$router.replace('/user/waitOrder')
                }
              }
            })
          } else {
            this.$vux.alert.show({
              title: '提示',
              content: res.message
            })
          }
          this.$vux.loading.hide()
        } else {
          this.$vux.alert.show({
            title: '提示',
            content: '输入不正确'
          })
        }
      },
      linkService () {
        this.$vux.alert.show({
          title: '联系客服',
          content: '电话： 12312313<br/>'
        })
      },
      onRegister () {
        this.upToken('', 0)
        this.$router.push('/user/step1')
      },
      ...mapActions([
        'upToken',
        'upIsLogin',
        'upIsCenter'
      ])
    },
    computed: {
      ...mapGetters([
        'isCenter'
      ])
    },
    components: {
      Container,
      Blur,
      Group,
      Cell,
      XInput,
      XButton,
      CellBox,
      FlexboxItem,
      Flexbox
    }
  }
</script>

<style lang="less">
  .login {
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

    .link-to {
      padding: 10px 0;
    }

    .link-box {
      padding: 10px;
    }

    .link {
      display: block;
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border: 1px solid #46b8da;
      border-radius: 3px;
      color: #46b8da;
    }
  }
</style>
