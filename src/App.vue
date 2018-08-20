<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    console.log('app created and cache logs by setStorageSync')
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
