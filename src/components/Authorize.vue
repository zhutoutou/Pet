<template>
    <div class="authorize-container"> 
        <div class="authorize-back">
            <div class="authorize-fore">
                <img :src="image" alt="" >
                <span>{{title}}</span>
            </div>            
        </div>
        <div class="authority-info">
            <p class="authority-alert">登录后该应用获得以下权限</p>
            <ul>
                <li v-for="(authority,index) in authorities"
                    :key="index" 
                    class="authority-item">
                    {{authority}}
                </li>
            </ul>
        </div>
        <button class="btn authorize-confirm text-primary" open-type="getUserInfo" @getuserinfo="doLogin">授权并登录</button>
    </div>
</template>
<script>
import utils, {showSuccess, showModal} from '@/utils'
import config from '@/config.js'
export default {
  props: {
    image: String,
    title: String,
    authorities: Array
  },
  methods: {
    async doLogin () {
      wx.showLoading('登陆中')
      utils.qcloud.setLoginUrl(config.loginUrl)
      const session = utils.qcloud.Session.get()
      try {
        if (session) {
          // 第二次登录
          // 或者本地已经有登录态
          // 可使用本函数更新登录态
          try {
            await utils.qcloud.loginWithCodeSync()
          } catch (err) {
            throw err
          }
        } else {
          // 首次登录
          try {
            await utils.qcloud.loginSync()
          } catch (err) {
            throw err
          }
        }
        console.log('登陆成功')
        let res = await utils.qcloud.requestSync(config.userUrl)
        console.log('获取用户信息成功')
        wx.hideLoading()
        showSuccess('登陆成功')

        wx.setStorageSync('userinfo', { userinfo: res.data.data, logged: true })
        this.logged = true
        this.userinfo = res.data.data
      } catch (err) {
        console.log(err)
        wx.hideLoading()
        showModal('失败', err)
        return
      }

      wx.switchTab({
        url: '/pages/me/main'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.authorize-container{
    .authorize-back{
        background: linear-gradient(180deg, #1F9948, #2CDA9C);
        height: 750rpx;
        margin: 15px 5px;
        position: relative;
        border-radius: 10px;
        .authorize-fore{
            position: absolute;
            top: 250rpx;
            width: 100%;
            align-items: center;
            background: transparent;
            display: flex;
            flex-direction: column;
            img{
                width: 100rpx;
                height: 100rpx;
                border-radius: 10rpx;
            }
            span{
                margin-top: 15rpx;
                font-family: Arial, Helvetica, sans-serif;
                font-size: 14px;
                color: white;
            }
        }
    }
    .authority-info{
        margin: 0 5px;
        padding-left: 10px;
        .authority-alert{
            font-weight: bold;
            margin-bottom: 10rpx;
            width: 300rpx;
        }
        .authority-item::before{
                width:5rpx;
                height:5rpx;
                border-radius: 50%;
                background-color: black;
        }
        .authority-item{
            font-size: 10px;
            color: #494949;
            margin-bottom: 5rpx;
        }
    }
    .authorize-confirm{
        margin-top: 50rpx;
        background: #1F9948;
        color: white;
        width:700rpx;
    }
    .authorize-confirm:active{
        background: white;
        color:#1F9948;
    }

}
</style>
