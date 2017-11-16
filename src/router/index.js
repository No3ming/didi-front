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
    path: '/waitOrder',
    name: 'waitOrder',
    components: {
      default: WaitOrder,
      nav: NavBar,
      new: NewOrder
    }
  },
  {
    path: '/progress',
    components: {
      default: Progress,
      nav: NavBar
    }
  },
  {
    path: '/completed',
    components: {
      default: Completed,
      nav: NavBar
    }
  },
  {
    path: '/order/detail',
    name: 'detail',
    component: OrderDetail
  },
  {
    path: '/order-detail-step',
    name: 'orderDetailStep',
    component: OrderDetailStep
  },
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/step1',
    name: 'step1',
    component: Step1
  },
  {
    path: '/step2',
    name: 'step2',
    component: Step2
  },
  {
    path: '/step3',
    name: 'step3',
    component: Step3
  },
  {
    path: '/step4',
    name: 'step4',
    component: Step4
  },
  {
    path: '/registered/certification',
    name: 'certification',
    component: Certification
  },
  {
    path: '/forget',
    name: 'forget',
    component: Forget
  },
  {
    path: '/amount/:id',
    name: 'amount',
    component: Amount
  },
  {
    path: '/personal',
    name: 'personal',
    component: PersonalCenter
  },
  {
    path: '/personal/my-info',
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
    case '/step1':
    case '/step2':
    case '/step3':
    case '/step4':
    case '/registered/certification':
    case '/forget':
    case '/login':
    case '/':
    case '':
      flag = true
      break
    case '/personal':
    case '/personal/my-info':
      store.dispatch('upIsCenter', true)
      break
    default:
      store.dispatch('upIsCenter', false)
      flag = false
      break
  }
  next()
  console.log(flag)
  // if (!store.getters.token && !flag) {
  //   next({ path: '/login' })
  // } else if (!store.getters.token && flag) {
  //   if (to.path === '/') {
  //     next({path: '/login'})
  //   } else {
  //     next()
  //   }
  // } else {
  //   if (to.path === '/') {
  //     next({path: '/canOrder'})
  //   } else {
  //     next()
  //   }
  // }
})

router.afterEach(to => {
  switch (to.path) {
    case '/':
    case '/login':
    case '/canOrder':
      document.title = '我要接单'
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
