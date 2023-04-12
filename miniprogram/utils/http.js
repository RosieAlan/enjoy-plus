// 导入 http 模块
import http from 'wechat-http'
/**
 * 接口基础路径
 */
http.baseURL = 'https://live-api.itheima.net'
/**
 * 配置响应拦截器
 */
http.intercept.response = (res) => {
  // 过滤接口返回的数据
  return res.data
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
