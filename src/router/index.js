import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import NavBar from '../components/NavBar.vue'
import NewOrder from '../components/NewOrder.vue'

import WaitOrder from '../views/WaitOrder.vue'
import Progress from '../views/Progress.vue'
import Completed from '../views/Completed.vue'
import OrderDetail from '../views/OrderDetail.vue'
import OrderDetailStep from '../views/OrderDetailStep.vue'
import Login from '../views/Login.vue'
import Step1 from '../views/Step1.vue'
import Step2 from '../views/Step2.vue'
import Step3 from '../views/Step3.vue'
import Step4 from '../views/Step4.vue'
import Certification from '../views/Certification.vue'
import Amount from '../views/Amount.vue'
import PersonalCenter from '../views/PersonalCenter.vue'
import MyInfo from '../views/MyInfo.vue'
import Forget from '../views/Forget.vue'

import NotFound from '../views/NotFound.vue'

Vue.use(Router)

const routes = [
  {
    path: '/user/waitOrder',
    name: 'waitOrder',
    components: {
      default: WaitOrder,
      nav: NavBar,
      new: NewOrder
    }
  },
  {
    path: '/user/progress',
    components: {
      default: Progress,
      nav: NavBar
    }
  },
  {
    path: '/user/completed',
    components: {
      default: Completed,
      nav: NavBar
    }
  },
  {
    path: '/user/order/detail',
    name: 'detail',
    component: OrderDetail
  },
  {
    path: '/user/order-detail-step',
    name: 'orderDetailStep',
    component: OrderDetailStep
  },
  {
    path: '/user',
    name: 'login',
    component: Login
  },
  {
    path: '/user/login',
    name: 'login',
    component: Login
  },
  {
    path: '/user/step1',
    name: 'step1',
    component: Step1
  },
  {
    path: '/user/step2',
    name: 'step2',
    component: Step2
  },
  {
    path: '/user/step3',
    name: 'step3',
    component: Step3
  },
  {
    path: '/user/step4',
    name: 'step4',
    component: Step4
  },
  {
    path: '/user/registered/certification',
    name: 'certification',
    component: Certification
  },
  {
    path: '/user/forget',
    name: 'forget',
    component: Forget
  },
  {
    path: '/user/amount/:id',
    name: 'amount',
    component: Amount
  },
  {
    path: '/user/personal',
    name: 'personal',
    component: PersonalCenter
  },
  {
    path: '/user/personal/my-info',
    name: 'myInfo',
    component: MyInfo
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  let flag
  switch (to.path) {
    case '/user/step1':
    case '/user/step2':
    case '/user/step3':
    case '/user/step4':
    case '/user/registered/certification':
    case '/user/forget':
    case '/user/login':
    case '/user/':
    case '':
      flag = true
      break
    case '/user/personal':
    case '/user/personal/my-info':
      store.dispatch('upIsCenter', true)
      break
    default:
      store.dispatch('upIsCenter', false)
      flag = false
      break
  }
  if (!store.getters.token && !flag) {
    next({ path: '/user/login' })
  } else if (!store.getters.token && flag) {
    if (to.path === '/user') {
      next({path: '/user/login'})
    } else {
      next()
    }
  } else {
    if (to.path === '/user') {
      next({path: '/user/waitOrder'})
    } else {
      next()
    }
  }
})

router.afterEach(to => {
  switch (to.path) {
    case '/':
    case '/login':
    case '/canOrder':
      document.title = '我有需求'
      break
    case '/progress':
      document.title = '进行中的订单'
      break
    case '/completed':
      document.title = '完成的订单'
      break
    case '/order/detail':
      document.title = '订单详情'
      break
    case '/registered/step1':
    case '/registered/step2':
    case '/registered/step3':
    case '/registered/certification':
      document.title = '进行认证'
      break
    case '/personal':
      document.title = '个人中心'
      break
    case '/not-found':
      document.title = '404'
      break
    default:
      break
  }
})

export default router
