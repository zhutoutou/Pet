<template>
    <div>
      <SumamryInfo :info="userinfo" :self="true"></SumamryInfo>
      <div class="detail"></div>
    </div>
</template>
<script>
import SumamryInfo from '@/components/SumamryInfo'
// import { showModal } from '@/utils'
export default {
  components: {
    SumamryInfo
  },
  data () {
    return {
      logged: false,
      open_id: '',
      userinfo: {
      }
    }
  },
  onLoad () {
    wx.showLoading({
      title: 'Loading...', // 提示的内容,
      mask: true, // 显示透明蒙层，防止触摸穿透,
      success: res => {}
    })
    this.logged = wx.getStorageSync('logged') || false
    if (!this.logged) {
      wx.redirectTo({ url: '/pages/login/main' })
    } else {
      this.userinfo = wx.getStorageSync('userinfo').data
      this.open_id = this.userinfo.openId
    }
    wx.hideLoading()
  },
  onShow () {
    if (this.logged === false) {
      if (wx.getStorageSync('logged')) {
        this.logged = true
        this.userinfo = wx.getStorageSync('userinfo').data
        this.open_id = this.userinfo.openId
      } else {
        console.log('未登陆进入Me页面')
      }
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>

</style>
