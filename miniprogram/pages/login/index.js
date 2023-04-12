// 定义变量保存验证码
let secret_code = ''
// 获取应用实例
const app = getApp()
Page({
  data: {
    mobile: '15371536032',
    code: '',
    countDownVisible: false,
  },
  onLoad({ redirectURL }) {
    // 获取地址参数
    this.setData({ redirectURL })
  },
  countDownChange(ev) {
    this.setData({
      timeData: ev.detail,
      countDownVisible: ev.detail.minutes === 1 || ev.detail.seconds > 0,
    })
  },
  // 验证验证码
  verifyCode() {
    // 验证码为6位数字
    const reg = /^\d{6}$/
    // 验证验证码
    const valid = reg.test(this.data.code.trim())
    // 验证结果提示
    if (!valid) wx.utils.toast('请检查验证码是否正确!')
    // 返回验证结果
    return valid
  },
  // 验证手机号格式
  verifyMobile() {
    // 宽松的验证规则
    const reg = /^[1][3-9][0-9]{9}$/
    // 正则验证（去除两端空格）
    if (!this.data.mobile) return wx.utils.toast('请输入手机号码!')

    const valid = reg.test(this.data.mobile.trim())
    // 验证结果提示
    if (!valid) wx.utils.toast('请填写正确的手机号码!')
    // 返回验证结果
    return valid
  },
  async getCode() {
    // 验证手机号码格式是否正确
    if (!this.verifyMobile()) return
    // 请求数据接口
    const { code, data } = await wx.http.get('/code', { mobile: this.data.mobile.trim() })
    // 验证接口返回结果
    if (code !== 10000) return wx.uitls.toast('发送失败, 请稍后重试!')
    // 发送验证码成功
    wx.utils.toast('发送成功, 请查收短信!')
    // 开始倒计时
    this.setData({ countDownVisible: true })
    secret_code = data.code
  },
  copyCode() {
    console.log('secret_code', secret_code)
    wx.setClipboardData({ data: secret_code })
  },
  async submitForm() {
    // 逐个验证表单数据
    if (!this.verifyMobile()) return wx.uitls.toast('verifyMobile')
    if (!this.verifyCode()) return wx.uitls.toast('verifyCode')
    // 用户填写的手机号和验证码
    const { mobile, code } = this.data
    // 调用接口登录/注册
    const res = await wx.http.post('/login', { mobile, code })
    // 校验数据是否合法
    if (res.code !== 10000) return wx.utils.toast('请检查验证码是否正确!')
    // 拼凑完整 token
    // 存储记录token
    app.setToken(res.data.token)
    wx.redirectTo({
      url: this.data.redirectURL,
    })
    // const token = 'Bearer ' + res.data.token
    // console.log('token', token)
    // // 本地存储 token 和 refresh_token
    // wx.setStorageSync('token', token)
    // // 更新全局 token 和 refresh_token
    // app.token = token
  },
})
