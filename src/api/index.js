/**
 * Created by ldm on 2017/11/1.
 */
import service from './service'

const api = {
  // 注册
  registered (payload) {
    return service.post('/user/register', payload)
  },
  // 登陆
  login (payload) {
    return service.post('/user/login', payload)
  },
  // 待处理列表 <需token>
  getRobOrder (payload) {
    return service.post('/user/waitingOrder', payload)
  },
  // 服务类型
  getServeType (payload) {
    return service.post('/user/serve_type', payload)
  },
  // 进行中订单列表 <需token>
  getProgress (payload) {
    return service.post('/user/progressOrder', payload)
  },
  // 完成的订单
  getComplete (payload) {
    return service.post('/user/completeOrder', payload)
  },
  // 抢单<到这个页面要请求一次,返回是否需要支付或要支付多少保证金>
  getRobOrdering (payload) {
    return service.post('/accountant/robOrdering', payload)
  },
  robOrdering (payload) {
    return service.post('/accountant/robOrdering', payload)
  },
  // 获取完成进度
  schedule (payload) {
    return service.post('/user/schedule', payload)
  },
  // 提交订单进度
  postProgress (payload) {
    return service.post('/accountant/postProgress', payload)
  },
  // 完成订单
  postCompleted (payload) {
    return service.post('/accountant/postProgress', payload)
  },
  // 提需求
  onOrder (payload) {
    return service.post('/user/order', payload)
  },
  // 不需保证金抢订单
  robing (payload) {
    return service.post('/accountant/robing', payload)
  },
  getCenter (payload) {
    return service.post('/user/center', payload)
  },
  getInfo (payload) {
    return service.post('/accountant/info', payload)
  },
  getWithdrawList (payload) {
    return service.post('/accountant/withdrawList', payload)
  },
  getWithdraw (payload) {
    return service.post('/user/withdraw', payload)
  },
  getFrozenList (payload) {
    return service.post('/accountant/frozenList', payload)
  }
}

export default api
