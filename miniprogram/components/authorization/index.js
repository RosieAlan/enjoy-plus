// components/authorization/authorization.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    isLogin: false,
  },
  lifetimes: {
    attached() {
      // 登录状态
      const isLogin = !!getApp().token
      // 记录登录状态
      this.setData({ isLogin })
      // 未登录重定向到登录页
      if (!isLogin) {
        // 读取当前历史栈
        const pageStack = getCurrentPages()
        // 取出当前页面路径，登录成功能跳转到该页面
        const currentPage = pageStack[pageStack.length - 1]
        // 取出当前页面路径，登录成功能跳转到该页面
        const redirectURL = currentPage.route
        // 引导用户到登录页面
        wx.redirectTo({
          url: `/pages/login/index?redirectURL=/${redirectURL}`,
        })
      }
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {},
})
