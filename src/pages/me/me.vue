<template>
    <div>
      <SumamryInfo :info="userinfo"></SumamryInfo>
      <div class="detail"></div>
    </div>
</template>
<script>
import SumamryInfo from '@/components/SumamryInfo'
import {get, showModal} from '@/utils'
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
    let storage = wx.getStorageSync('userinfo') || {userinfo: this.userinfo, logged: this.logged}
    this.logged = storage.logged
    this.userinfo = storage.userinfo
    if (!this.logged) {
      wx.redirectTo({ url: '/pages/login/main' })
    }
    if (!this.userinfo.name) {
      this.getUserInfo()
    }
    wx.hideLoading()
  },
  onShow () {
    if (this.logged === false) {
      let storage = wx.getStorageSync('userinfo') || {userinfo: this.userinfo, logged: this.logged}
      this.logged = storage.logged
      this.userinfo = storage.userinfo
    }
  },
  methods: {
    async getUserInfo () {
      if (this.open_id) {
        try {
          const res = await get('/weapp/userInfo', {'open_id': this.open_id})
          console.log(res)
          if (res) this.userinfo = res.userinfo
        } catch (err) {
          showModal('获取个人信息', err)
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
