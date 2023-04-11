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
 * 挂载到wx全局对象
 */
wx.http = http
/**
 * 模块导出
 */
export default http
