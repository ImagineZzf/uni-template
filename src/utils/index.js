import { ACCESS_TOKEN, EXPIRE_TIME } from './contants'
/**
 * 设置缓存
 */
export const setStorage = (value, key = ACCESS_TOKEN) => {
  try {
    const params = {
      date: new Date().getTime(),
      value
    }
    uni.setStorageSync(key, JSON.stringify(params))
  } catch (error) {}
}
/**
 * 获取缓存
 */
export const getStorage = (key = ACCESS_TOKEN, day = EXPIRE_TIME) => {
  // key 存储的键名
  // day 过期时间
  try {
    let obj = uni.getStorageSync(key)
    if (!obj) return null
    obj = JSON.parse(obj)
    const date = new Date().getTime()
    if (date - obj.date > 86400000 * day) {
      removeStorage(key)
      return null
    }
    return obj.value
  } catch (error) {
    return null
  }
}
/**
 * 清楚缓存
 */
export const removeStorage = (key = ACCESS_TOKEN) => {
  try {
    uni.removeStorageSync(key)
  } catch (error) {}
}
/**
 * 将常用api的回调，转换为promise
 */
export const promisify = (fn = () => {}, options = {}) => {
  return new Promise((resolve, reject) => {
    fn({
      success: resolve,
      fail: reject,
      ...options
    })
  })
}

/**
 * 页面跳转
 */
export const navigate = (url = '', options = {}) => {
  if (!url) return
  return promisify(uni.navigateTo, {
    url,
    ...options
  })
}
/**
 * 关闭当前页，页面重定向
 */
export const redirect = (url = '', options = {}) => {
  if (!url) return
  return promisify(uni.redirectTo, {
    url,
    ...options
  })
}
/**
 * 关闭所有页，重新打开某个页
 */
export const reLaunch = (url = '', options = {}) => {
  if (!url) return
  return promisify(uni.reLaunch, {
    url,
    ...options
  })
}
/**
 * 返回上一页
 */
export const goBack = (delta = 1, options = {}) => {
  return promisify(uni.navigateBack, {
    delta,
    ...options
  })
}
/**
 * 显示toast
 */
export const showToast = (title, icon = 'none', options = {}) => {
  if (!title) return
  return promisify(uni.showToast, {
    title,
    icon,
    ...options
  })
}
/**
 * 隐藏toast
 */
export const hideToast = (options = {}) => promisify(uni.hideToast, options)
/**
 * 显示loading
 */
export const showLoading = (title = '加载中', icon = 'none', options = {}) =>
  promisify(uni.showLoading, {
    title,
    icon,
    mask: true,
    ...options
  })
/**
 * 隐藏loading
 */
export const hideLoading = (options = {}) => promisify(uni.hideLoading, options)
/**
 * 显示弹框
 */
export const showModal = (title, content, options = {}) => {
  if (!title) return
  return promisify(uni.showModal, {
    title,
    content,
    ...options
  })
}
/**
 * 显示底部操作菜单
 */
export const showActionSheet = (
  itemList,
  itemColor = '#000000',
  options = {}
) => {
  if (!itemList || !itemList.length) return
  return promisify(uni.showActionSheet, {
    itemList,
    itemColor,
    ...options
  })
}
/**
 * 小程序上传文件
 */
export const uploadFile = (url, filePath, name = 'file', formData = {}) => {
  return promisify(uni.uploadFile, {
    url: `${process.env.VUE_APP_BASE_API}${url}`,
    filePath,
    name,
    formData,
    header: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
/**
 * 小程序检查更新
 */
export const checkVersion = () => {
  const updateManager = uni.getUpdateManager()

  updateManager.onCheckForUpdate(({ hasUpdate }) => {
    if (!hasUpdate) return
    updateManager.onUpdateReady(() => {
      showModel('更新提示', '新版本已经准备好，是否重启应用？').then(res => {
        if (res.confirm) {
          updateManager.applyUpdate()
        } else {
          showModel('提示', '升级到最新版本体验更好哦')
        }
      })
    })

    updateManager.onUpdateFailed(() => {
      showModel(
        '更新失败',
        '请您删除当前小程序，到微信 “发现-小程序” 页，重新搜索打开小程序'
      ).then(res => {})
    })
  })
}
/**
 *
 * @param {*} datetime 要格式化的时间
 * @param {*} format 格式化配置
 */
export const formatDate = (datetime = '', format = 'YYYY-MM-DD HH:mm') => {
  if (!datetime) {
    datetime = new Date()
  } else if (typeof datetime == 'string') {
    datetime = datetime.replace(/\-/g, '/')
    datetime = new Date(datetime)
  } else if (typeof datetime == 'number') {
    datetime = new Date(datetime)
  } else if (!(datetime instanceof Date)) {
    datetime = new Date()
  }

  const padDate = time => (time < 10 ? '0' + time : time)
  const week = ['日', '一', '二', '三', '四', '五', '六']
  return format.replace(/YYYY|YY|MM|DD|HH|hh|mm|SS|ss|week/g, function(key) {
    switch (key) {
      case 'YYYY':
        return datetime.getFullYear()
      case 'YY':
        return (datetime.getFullYear() + '').slice(2)
      case 'MM':
        return padDate(datetime.getMonth() + 1)
      case 'DD':
        return padDate(datetime.getDate())
      case 'HH':
      case 'hh':
        return padDate(datetime.getHours())
      case 'mm':
        return padDate(datetime.getMinutes())
      case 'SS':
      case 'ss':
        return padDate(datetime.getSeconds())
      case 'week':
        return week[datetime.getDay()]
    }
  })
}
//获取当前时间戳
export const getUnix = date => {
  date = date instanceof Date ? date : date ? new Date(date) : new Date()
  return date.getTime()
}

//获取今天0点0分0秒的时间戳
export const getTodayUnix = date => {
  date = date instanceof Date ? date : date ? new Date(date) : new Date()
  date.setHours(0, 0, 0, 0)
  return date.getTime()
}
/**
 * 获取时间字符串
 */
export const getDateStr = (time, format = 'YYYY-MM-DD') => {
  let date
  let type = 0
  if (time instanceof Date) {
    date = time
  } else if (typeof time === 'string') {
    time = time.replace(/\-/g, '/')
    date = new Date(time)
  } else if (typeof time === 'number') {
    date = time
    type = 1
  } else {
    date = new Date()
  }
  const now = getUnix()
  const today = getTodayUnix()
  const timestamp = type ? date : getUnix(date)
  const timer = (now - timestamp) / 1000
  let tip = ''
  if (timer <= 0 || Math.floor(timer / 60) <= 0) {
    tip = '刚刚'
  } else if (timer < 3600) {
    tip = Math.floor(timer / 60) + '分钟前'
  } else if (timer >= 3600 && timestamp - today >= 0) {
    tip = Math.floor(timer / 3600) + '小时前'
  } else if (timer / 86400 <= 7) {
    tip = Math.ceil(timer / 86400) + '天前'
  } else {
    tip = formatDate(timestamp, format)
  }
  return tip
}
/**
 * 预览图片
 */
export const previewImage = (current, urls, options = {}) => {
  if (!current || !urls || !urls.length) return
  return promisify(uni.previewImage, {
    current,
    urls,
    ...options
  })
}
/**
 * 选择图片
 */
export const chooseImage = (options = {}) => {
  return promisify(uni.chooseImage, {
    ...options
  })
}
/**
 * 跳转页面
 */
export const navToView = link => {
  if (link.includes('http')) {
    // 跳转webview
    navigate(`/subpages/public/webview?link=${JSON.stringify(link)}`)
  } else if (link.includes('/pages') || link.includes('/subpages')) {
    // 跳转普通页面
    navigate(link)
  }
}
