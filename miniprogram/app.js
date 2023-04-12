// app.js
// 加载 utils/uitls.js
import './utils/utils'
// 加载 utils/http.js
import './utils/http'
App({
  globalData: {},
  onLaunch() {
    // 获取本地存储的 token 判断登录状态
    this.getToken('token')
    this.getToken('refresh_token')
  },
  getToken(key) {
    wx.getStorage({
      key,
      success: ({ data }) => {
        this[key] = data
      },
    })
  },
  setToken(token, refresh_token) {
    // 拼凑合法token格式
    token = 'Bearer ' + token
    refresh_token = 'Bearer ' + refresh_token

    // 本地存储 token 和 refresh_token
    wx.setStorageSync('token', token)
    wx.setStorageSync('refresh_token', refresh_token)
    // 更新全局 token 和 refresh_token
    this.token = token
    this.refresh_token = refresh_token
  },
})
