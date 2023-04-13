// pages/profile/index.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {},
  getUserNickName(ev) {
    console.log(ev.detail)
    // 更新用户昵称
    this.updateNickName(ev.detail.value)
  },
  async updateNickName(nickName) {
    // 请求数据接口
    const { code } = await wx.http.put('/userInfo', { nickName })
    // 检测接口调用的结果
    if (code !== 10000) return wx.utils.toast('更新用户信息失败!')

    // 保存用户昵称
    this.setData({ 'userInfo.nickName': nickName })
  },
  getUserAvatar(ev) {
    // 用户头像地址
    // console.log(ev.detail.avatarUrl)
    this.updateUserAvatar(ev.detail.avatarUrl)
  },

  updateUserAvatar(avatarUrl) {
    // 调用接口上传图片
    wx.uploadFile({
      url: wx.http.baseURL + '/upload',
      filePath: avatarUrl,
      name: 'file',
      header: {
        Authorization: getApp().token,
      },
      formData: {
        type: 'avatar',
      },
      success: (res) => {
        // 转换 json 数据
        const data = JSON.parse(res.data)
        // 检测接口调用结果
        if (data.code !== 10000) return wx.utils.toast('更新头像失败!')

        // 保存并预览图片地址
        this.setData({ 'userInfo.avatar': data.data.url })
      },
    })
  },
  async getUserInfo() {
    const { code, data } = await wx.http.get('/userInfo')
    if (code !== 10000) return wx.utils.toast()
    // 保存数据
    this.setData({
      userInfo: {
        avatar: data.avatar,
        nickName: data.nickName,
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const token = getApp().token
    console.log('getApp()', getApp())
    // 2.0判断 token
    if (!token) {
      // 未登录：跳转到登录页面
      wx.reLaunch({
        url: '/pages/login/index',
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
})
