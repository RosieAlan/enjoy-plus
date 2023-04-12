Page({
  data: {
    dialogVisible: false,
  },
  async onLoad() {
    // 目前该段代码只用于测试登录
    try {
      // 请求一个需要 token 的路径
      await wx.http.get('/room')
    } catch (err) {
      wx.utils.toast(err.message)
    }
  },
  swipeClose(ev) {
    const { position, instance } = ev.detail

    if (position === 'right') {
      // 显示 Dialog 对话框
      this.setData({
        dialogVisible: true,
      })

      // swiper-cell 滑块关闭
      instance.close()
    }
  },

  goDetail() {
    wx.navigateTo({
      url: '/house_pkg/pages/detail/index',
    })
  },

  addHouse() {
    wx.navigateTo({
      url: '/house_pkg/pages/locate/index',
    })
  },
})
