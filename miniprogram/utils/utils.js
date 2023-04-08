const utils = {
  toast (title = '数据加载失败....') {
    wx.showToast({
      title,
      masl: true,
      icon: 'none'
    })
  }
}
wx.utils = utils
export default utils
