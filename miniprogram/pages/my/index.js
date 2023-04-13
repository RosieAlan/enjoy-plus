Page({
  goLogin() {
    wx.navigateTo({
      url: '/pages/login/index',
    })
  },
  onShow() {
    // 获取登录用户信息
    this.getUserInfo()
  },

  // 用户信息接口
  async getUserInfo() {
    // 请求数据接口
    const { code, data: userInfo } = await wx.http.get('/userInfo')
    // 校验数据是否合法
    if (code !== 10000) return wx.utils.toast('数据加载失败, 请稍后重试!')
    // 设置数据，更新渲染
    this.setData({ userInfo })
  },
})
