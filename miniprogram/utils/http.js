// 导入 http 模块
import http from 'wechat-http'
/**
 * 接口基础路径
 */
http.baseURL = 'https://live-api.itheima.net'
/**
 * 配置响应拦截器
 */
// 添加响应拦截器：返回服务器的数据
http.intercept.response = async ({ data, statusCode, config }) => {
  // 判断状态码是否为 401
  if (statusCode === 401) {
    // 由于返回的是 401 也有可能是 refreshToken 过期：判断请求的路径是否包含 refreshToken
    if (config.url.includes('/refreshToken')) {
      const pagesStack = getCurrentPages()
      const lastPage = pagesStack[pagesStack.length - 1]
      const route = lastPage.route
      // 跳转到登录页面
      wx.redirectTo({
        url: `/pages/login/index?redirectURL=${route}`,
      })
      return
    }
    // 判断：是否存在 refreshToken
    if (!getApp().refresh_token) return Promise.reject(new Error('未登录'))
    // token 过期，需要请求延时的接口
    const { data } = await http({
      url: '/refreshToken',
      method: 'POST',
      header: {
        Authorization: getApp().refresh_token,
      },
    })
    const { token, refresh_token } = data
    // 保存 token 和 refreshToken
    getApp().setToken(token, refresh_token)
    // 重新请求之前未完成的请求（请求信息：response.config）
    const res = await http(
      Object.assign(config, {
        header: {
          Authorization: 'Bearer ' + token,
        },
      })
    )
    return res
  }
  return data
}
/**
 * 配置响应拦截器
 */

http.intercept.request = (config) => {
  // 在请求拦截器添加一个 token
  const token = getApp().token
  // 创建一个管理所有额外属性的对象
  const defaultHeader = {
    client: 'app',
  }
  if (token) defaultHeader.Authorization = token
  // 将所有的属性与 config 中的 header 进行合并
  config.header = Object.assign(defaultHeader, config.header)
  return config
}

/**
 * 挂载到wx全局对象
 */
wx.http = http
/**
 * 模块导出
 */

export default http
