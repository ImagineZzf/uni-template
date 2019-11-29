import Fly from 'flyio/dist/npm/wx'
import { getStorage, showToast, showLoading, hideLoading } from './index'
import { AUTH_ERRORS } from './contants'

/**
 * 错误处理
 * authErrorPath  权限错误跳转路径
 */

const HanderError = ({ code, message }, options) => {
  // 权限错误
  if (AUTH_ERRORS[code]) {
    return showModal('温馨提示', AUTH_ERRORS[code])
      .then(res => {
        if (res.confirm) {
          return options.authErrorPath ? reLaunch(options.authErrorPath) : ''
        } else if (res.cancel) {
          return
        }
      })
      .catch(err => {
        return options.authErrorPath ? reLaunch(options.authErrorPath) : ''
      })
  } else {
    // 其他错误，仅仅toast提示一下
    return options.showToast ? showToast(message) : ''
  }
}

// token拦截器
const tokenInterceptor = config => {
  const token = getStorage()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}

// loading拦截器
const loadingInterceptor = config => {
  showLoading('加载中', 'loading')
  return config
}

// 默认配置
const defaultOptions = {
  showLoading: false, // 是否显示loading
  showToast: true, // 是否显示全局toast
  authErrorPath: '/pages/login/login' // 默认权限错误跳转路径
}

// 创建实例
const createInstance = (options = {}, config = {}) => {
  options = {
    ...defaultOptions,
    ...options
  }

  // 默认配置
  const defaultConfig = {
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 60000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    ...config
  }

  const httpClient = new Fly()
  httpClient.config = {
    ...httpClient.config,
    ...defaultConfig
  }

  // 请求拦截器
  httpClient.interceptors.request.use(tokenInterceptor)

  // 是否显示loading
  if (options.showLoading) {
    httpClient.interceptors.request.use(loadingInterceptor)
  }

  // 响应拦截器
  httpClient.interceptors.response.use(
    (res, promise) => {
      if (options.showLoading) {
        hideLoading()
      }
      if (typeof res.data === 'string' && res.data !== '') {
        res.data = JSON.parse(res.data)
      }
      return res.data
    },
    (err, promise) => {
      if (err.response && err.response.data) {
        HanderError(err.response.data, options)
        return promise.reject(err.response.data)
      }
      return promise.reject(err)
    }
  )

  return httpClient
}

// 无loading实例
export const http = createInstance()
// 有loading实例
export const httpLoading = createInstance({
  showLoading: true
})

export const Http = createInstance
