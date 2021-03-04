'use strict'
import axios from 'axios'
import qs from 'qs'
import router from '../router'
// import utils from '@/tool/utils'
// axios.defaults.baseURL = '/api'
//80996801
axios.interceptors.request.use(config => {
    // console.log(config, 'config')
    // config.headers = {
    // }
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    // console.log(response, 'response')
    return response
}, error => {
    return Promise.resolve(error.response)
})

function checkStatus(response) {
    console.log('status', response.status)
    // loading
    // 如果http状态码正常，则直接返回数据
    if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
        return response
            // 如果不需要除了data之外的数据，可以直接 return response.data
    }
    // 没有登陆
    if (response && response.status === 401) {
        window.location.href = 'http://o2o-support-dev.o2o-support-idaas-cas.devgw.yonghui.cn/cas/login?service=http://o2o-support-dev.cas-client.devgw.yonghui.cn/v1/login'
    }
    // 没有权限
    if (response && response.status === 403) {
        router.push({ path: '/403' })
    }
    // 异常状态下，把错误信息返回去
    return {
        status: -404,
        msg: '网络异常'
    }
}

function checkCode(res) {
    // 校验前后端约定的状态码
    if (res.data && /^(4|5)[0-9]*/.test(res.data.code)) {
        if (!res.data) {
            res.data = {
                message: res.data.message
            }
        }
        return Promise.reject(res.data)
    }
    return res.data
}

export default {
    post(url, data , contentType) {
        let reqConfig = {
            method: 'post',
            // baseURL: global_.baseUrl,
            url,
            data: JSON.stringify(data),
            timeout: 10000,
            withCredentials: true, // 允许携带cookie
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                // 'Access-Control-Allow-Origin': '$http_origin',
                // "Access-Control-Allow-Credentials": "true",
                // "Access-Control-Allow-Methods": "GET, POST, OPTIONS, DELETE, PATCH, PUT, HEAD",
                // "Access-Control-Allow-Headers": "DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type",
                // "Access-Control-Allow-Origin": "*",
            }
        }
        if(contentType === 'Application/x-www-form-urlencoded') {
            reqConfig.headers = {
                ...reqConfig.headers,
                'Content-Type': contentType
            }
            reqConfig.data = qs.stringify(data)
        }
        // console.log(reqConfig, 'ss')
        return axios({
            ...reqConfig
        }).then(
            (response) => {
                return checkStatus(response)
            }
        ).then(
            (res) => {
                return checkCode(res)
            }
        )
    },
    // responseType为可选参数
    get(url, params, extraHeaders, responseType) {
        let reqConfig = {
            method: 'get',
            url,
            params, // get 请求时带的参数
            timeout: 10000,
            withCredentials: true, // 允许携带cookie
            headers: {
                'Content-Type': 'application/json; charset=UTF-8', 
            }
        }
        if (extraHeaders) {
            reqConfig.headers = {
                ...reqConfig.headers,
                ...extraHeaders
            }
        }
        if(responseType) {
            reqConfig.responseType = responseType
        }
        return axios({
            ...reqConfig
        }).then(
            (response) => {
                return checkStatus(response)
            }
        ).then(
            (res) => {
                return checkCode(res)
            }
        )
    },
    delete(url, params) {
        return axios({
            method: 'delete',
            //baseURL: global_.baseUrl,
            url,
            params,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        }).then(
            (response) => {
                return checkStatus(response)
            }
        ).then(
            (res) => {
                return checkCode(res)
            }
        )
    },
    put(url, data) {
        return axios({
            method: 'put',
            // baseURL: global_.baseUrl,
            url,
            data: JSON.stringify(data),
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        }).then(
            (response) => {
                return checkStatus(response)
            }
        ).then(
            (res) => {
                return checkCode(res)
            }
        )
    }
}