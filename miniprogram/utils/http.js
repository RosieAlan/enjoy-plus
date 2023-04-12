// 导入 http 模块
import http from 'wechat-http'
/**
 * 接口基础路径
 */
http.baseURL = 'https://live-api.itheima.net'
/**
 * 配置响应拦截器
 */
http.intercept.response = async ({ statusCode, data, config }) => {
  // statusCode 为状态码
  if (statusCode === 401) {
    // config 是调用接口的参数
    // refreshToken 过期的情形
    if (config.url.includes('/refreshToken')) {
      // 读取当前历史栈
      const pageStack = getCurrentPages()
      // 取出当前页面路径，登录成功能跳转到该页面
      const lastPage = pageStack[pageStack.length - 1]
      // 取出当前页面路径，登录成功能跳转到该页面
      const redirectURL = lastPage.route

      // 引导用户到登录页面
      return wx.redirectTo({
        url: `/pages/login/index?redirectURL=/${redirectURL}`,
      })
    }

    // 获取全局应用实例
    const app = getApp()
    // 使用 refreshToken 更新 token
    const res = await http({
      url: '/refreshToken',
      method: 'POST',
      header: {
        // 这时要注意使用的是 refresh_token
        Authorization: app.refresh_token,
      },
    })

    // 更新 token 和 refresh_token
    app.setToken(res.data.token, res.data.refreshToken)
    // 重新发起请求
    return http(
      Object.assign(config, {
        // 传递新的 token
        header: {
          Authorization: app.token,
        },
      })
    )
  }

  // 过滤接口返回的数据
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
