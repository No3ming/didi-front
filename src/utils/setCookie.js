/**
 * Created by ldm on 2017/11/15.
 */
const setCookie = (cName, value, expireM) => {
  let exdate = new Date()
  exdate.setMinutes(exdate.getMinutes() + expireM)
  document.cookie = cName + '=' + escape(value) +
    ((expireM === null) ? '' : ';expires=' + exdate.toGMTString())
}

export default setCookie
