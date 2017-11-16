<template>
  <div class="nav-bar one-px-top">
    <router-link class="nav-bar-item" to="/waitOrder">
      <i class="icon-qiangdan"></i>
      <p class="nav-bar-label">待处理的订单</p>
    </router-link>
    <router-link class="nav-bar-item" to="/progress">
       <span class="badge-box">
        <badge :text="progressTotal" v-show="progressTotal > 0" class="badge"></badge>
        <i class="icon-progress"></i>
       </span>
      <p class="nav-bar-label">进行中的订单</p>
    </router-link>
    <router-link class="nav-bar-item" to="/completed">
      <span class="badge-box">
        <i class="icon-wancheng"></i>
        <badge :text="completedTotal" v-show="completedTotal > 0" class="badge"></badge>
      </span>
      <p class="nav-bar-label">完成的订单</p>
    </router-link>
  </div>
</template>

<script>
  import { Badge } from 'vux'
  import { mapGetters } from 'vuex'

  export default {
    name: 'nav-bar',
    computed: {
      ...mapGetters([
        'progressTotal',
        'completedTotal'
      ])
    },
    components: {
      Badge
    }
  }
</script>

<style lang="less">
  .nav-bar {
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50px;
    background-color: #FEFDFE;
    box-shadow: 0 -1px 3px 0 rgba(0, 0, 0, .1);
    z-index: 25;

    &.hide {
      display: none;
    }
  }

  .nav-bar-item {
    display: block;
    flex: 1;
    text-align: center;
    font-size: 22px;
    line-height: 22px;
    i {
      font-size: 22px;
      color: #C2C2C3;
    }
  }

  .nav-bar-label {
    font-size: 10px;
    color: #9E9E9E;
  }

  .router-link-active {
    i,
    .nav-bar-label {
      color: #46b8da;
    }
    .vux-x-icon {
      fill: #46b8da;
    }
  }

  .badge-box {
    position: relative;
    left: 0;
    top: 0;

    .badge {
      position: absolute;
      right: -14px;
      top: 0;
      font-size: 10px;
    }
  }
</style>
