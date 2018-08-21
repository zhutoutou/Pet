<template>
    <div>
      <SumamryInfo :info="userinfo" :personinfo="personinfo"></SumamryInfo>
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
      },
      personinfo: {}
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
    if (!this.logged) {
      wx.redirectTo({ url: '/pages/login/main' })
    }
    this.userinfo = storage.userinfo
    this.open_id = storage.userinfo.openId
    this.getUserInfo()
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
          if (res) {
            const codelist = wx.getStorageSync('codelist') || []
            res.userinfo.personinfo.level = codelist.filter(v =>
              v.type === 1 // 等级说明编码1
            ).find(v => v.codeid === res.userinfo.personinfo.level) || ''
            console.log(res.userinfo)
            this.userinfo = res.userinfo
            this.personinfo = res.userinfo.personinfo || {}
            wx.setStorageSync('userinfo', res.userinfo)
          }
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
