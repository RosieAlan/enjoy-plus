// pages/notify/index.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({ id }) {
    // 保存 id
    this.setData({ id })
    // 获取公告详情
    this.getNotify(id)
  },
  // 根据 id 得到公告详情
  async getNotify(id) {
    const { code, message, data: notify } = await wx.http.get(`/announcement/${id}`)
    // 判断
    if (code !== 10000) return wx.utils.toast(message)
    // 保存数据
    this.setData({ notify })
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
