// app.js
// 加载 utils/uitls.js
import './utils/utils'
// 加载 utils/http.js
import './utils/http'
App({
  globalData: {},
  onLaunch() {
    // 打开页面时获取 token
    this.getToken()
  },
  getToken() {
    wx.getStorage({
      key: 'token',
      success: ({ data }) => {
        this.token = data
      },
      complete: () => {
        console.log('complete')
      },
    })
  },
  setToken(token) {
    // 拼凑合法token格式
    token = 'Bearer ' + token
    // 本地存储 token 和 refresh_token
    wx.setStorageSync('token', token)
    // 更新全局 token 和 refresh_token
    this.token = token
  },
})
