Page({
  data: {},
  async onLoad() {
    this.getNotifyList()
  },
  // 获取公告列表
  async getNotifyList() {
    const { code, message, data: notifyList } = await wx.http.get('/announcement')
    // 判断响应的状态
    if (code !== 10000) return wx.utils.toast(message)
    // 保存数据
    this.setData({ notifyList: notifyList })
  },
})
