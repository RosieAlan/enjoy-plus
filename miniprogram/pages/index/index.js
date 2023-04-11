import utils from '../../utils/utils'

Page({
  data: {},
  async onLoad () {
    utils.toast()

    utils.toast('用户名只能中文字符！')
  }
})
