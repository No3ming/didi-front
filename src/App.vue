<template>
  <div class="app" id="app">
    <router-view name="nav"></router-view>
    <transition :name="transitionName">
      <router-view class="transition"></router-view>
    </transition>
    <router-view name="new"></router-view>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import './assets/font/iconfont.css'

  export default {
    name: 'app',
    computed: {
      ...mapGetters([
        'transitionName'
      ])
    },
    components: {
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import './styles/color-theme.less';
  @import './styles/order-item.less';

  .app,
  .transition {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    z-index: 11;
    font-size: 14px;
  }

  .transition {
    transition: transform .5s cubic-bezier(.55, 0, .1, 1);
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }

  .forward-enter,
  .reverse-leave-active {
    transform: translate3d(100%, 0, 0);
  }

  .forward-leave-active,
  .reverse-enter {
    transform: translate3d(-100%, 0, 0);
  }
</style>
