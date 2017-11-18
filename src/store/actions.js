/**
 * Created by ldm on 2017/11/1.
 */
import setCookie from '../utils/setCookie'

export const showLoading = ({ commit }) => {
  commit('UPDATE_LOADING', { status: true })
}

export const upToken = ({ commit }, token, time) => {
  commit('UPDATE_TOKEN', token)
  setCookie('user-token', token, time || 50)
}

export const upServiceList = ({ commit }, serviceList) => {
  commit('UPDATE_SERVICE_LIST', serviceList)
}

export const upAddress = ({ commit }, address) => {
  commit('UPDATE_ADDRESS', address)
}

export const upServeCityId = ({ commit }, serveCityId) => {
  commit('UPDATE_SERVE_CITY_ID', serveCityId)
}

export const upCertificateImgs = ({ commit }, certificateImgs) => {
  commit('UPDATE_CERTIFICATE_IMGS', certificateImgs)
}

export const upWorkingExperienceImgs = ({ commit }, workingExperienceImgs) => {
  commit('UPDATE_WORKING_EXPERIENCE_IMG', workingExperienceImgs)
}

export const upWorkingExperience = ({ commit }, workingExperience) => {
  commit('UPDATE_WORKING_EXPERIENCE', workingExperience)
}

export const upContacts = ({ commit }, contacts) => {
  commit('UPDATE_CONTACTS', contacts)
}

export const upPhone = ({ commit }, phone) => {
  commit('UPDATE_PHONE', phone)
}

export const upPassword = ({ commit }, password) => {
  commit('UPDATE_PASSWORD', password)
}

export const upNowOrder = ({ commit }, nowOrder) => {
  commit('UPDATE_NOW_ORDER', nowOrder)
}

export const upProgressTotal = ({ commit }, progressTotal) => {
  commit('UPDATE_PROGRESS_TOTAL', progressTotal)
}

export const upCompletedTotal = ({ commit }, completedTotal) => {
  commit('UPDATE_COMPLETE_TOTAL', completedTotal)
}

export const upIsCenter = ({ commit }, isCenter) => {
  commit('UPDATE_IS_CENTER', isCenter)
  window.sessionStorage.setItem('user-isCenter', isCenter)
}

export const upCompany = ({ commit }, company) => {
  commit('UPDATE_COMPANY', company)
}

export const upIsLogin = ({ commit }, isLogin) => {
  commit('UPDATE_IS_LOGIN', isLogin)
}

export const upNewServiceList = ({ commit }, newServiceList) => {
  commit('UPDATE_NEW_SERVICE_LIST', newServiceList)
}
