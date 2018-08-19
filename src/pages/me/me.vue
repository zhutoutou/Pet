<template>
    <div>Me</div>
</template>
<script>
export default {
  data () {
    return {
      logged: false,
      userinfo: {

      }
    }
  },
  onLoad () {
    console.log('小程序启动')
    let storage = wx.getStorageSync('userinfo') || {userinfo: this.userinfo, logged: this.logged}
    this.logged = storage.logged
    this.userinfo = storage.userinfo
    if (!this.logged) {
      wx.navigateTo({ url: '/pages/login/main' })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
