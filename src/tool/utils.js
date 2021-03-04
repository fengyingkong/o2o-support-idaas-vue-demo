import * as cookies from 'js-cookie'
const utils = {}

utils.removeCookie = function (key) {
    cookies.remove(key)
}

utils.setCookie = function (key, value) {
    cookies.set(key, value)
}
utils.getCookie = function (name) {
    return cookies.get(name)
}

export default utils
