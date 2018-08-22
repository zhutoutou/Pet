<script>
import {get} from '@/utils'
export default {
  created () {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    console.log('app created and cache logs by setStorageSync')
    // 初始化数据
    this.init()
  },
  methods: {
    /**
     * 初始APP
     */
    async init () {
      let storage = wx.getStorageSync('syscode')
      if (!storage || !this.checkVersion('syscode', storage.version)) {
        this.updateBasicData()
      }
      const logged = wx.getStorageSync('logged')
      storage = wx.getStorageSync('userinfo')
      if (logged && this.checkVersion('userinfo', storage.version)) {
        this.updateUserData(storage.data.openId)
      }
    },
    async updateBasicData () {
      try {
        const res = await get('/weapp/sysCode')
        console.log('updateBasicData', res)
        if (res.data) {
          wx.setStorageSync('syscode', res)
          console.log('获取了最新的编码数据')
        } else {
          throw new Error('初始化数据异常,无数据')
        }
      } catch (err) {
        console.log('app iniData Failed + ' + err)
      }
    },
    async updateUserData (openId) {
      try {
        const res = await get('/weapp/userInfo', {'open_id': openId})
        console.log('updateUserData', res)
        if (res) {
          console.log('res', res)
          wx.setStorageSync('userinfo', res)
          console.log('获取了最新的用户信息')
        } else {
          throw new Error('初始化数据异常,无数据')
        }
      } catch (err) {
        console.log('app iniData Failed + ' + err)
      }
    }
  },
  /**
   * 检测版本方法
   * @param {检测的名称} name
   * @param {当前版本编码} version
   */
  async checkVersion (name, version) {
    // 检测数据版本
    try {
      console.log('checkversion')
      const res = await get('/weapp/version', {
        name: name,
        version: version
      })
      return res.out
    } catch (err) {
      console.log('app request version Failed + ' + err)
      return true
    }
  }
}
</script>

<style>
@font-face {
  font-family: Tensentype-DouDouJ;
  src: url('http://zhuxinghan.oss-cn-beijing.aliyuncs.com/weixin/others/font/Tensentype-DouDouJ.ttf');
}
/* .container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
} */
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}

.text-primary{
  font-size: 14px;
  color:black;
}
.text-cute{
    font-family: Tensentype-DouDouJ, Times, serif;
}
.btn{
  color:white;
  background-color: #EA5A49;
  margin-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 2px;
  font-size: 16px;
  line-height: 40px;
  height: 40px;
  width:100%;
}
.btn:active{
  color:#EA5A49;
  background-color: white;
}
.text-footer{
  text-align: center;
  font-size:12px;
  margin-bottom: 5px;
}
.right{
  float: right;
}
.page-title{
  padding-left: 20px;
  background-color: #eee;
  font-size: 14px;
  line-height: 40px;
}
</style>
