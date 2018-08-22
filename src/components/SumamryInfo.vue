<template>
    <div class="container">
        <div>
            <img :src="info.avatarUrl" alt="" class="avatar" @click="changeAvatar">
        </div>
        <div class="info">
            <div class="name">{{info.nickName}}</div>
            <div class="bottom-container">    
                <div class="level text-cute">{{level}}</div>
                <div class="score-container">
                    <div class="score">积分 {{score}}分</div>
                    <a class="right" v-if="self" href="">查看详情</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import config from '@/config'
export default {
  props: {
    info: Object,
    self: Boolean
  },
  data () {
    return {
      syscode: []
    }
  },
  computed: {
    level () {
      if (!this.info.personinfo) return ''
      return (this.syscode.find(v => v.type === config.codeType.LEVEL) && this.syscode.find(v => v.type === config.codeType.LEVEL).list.find(v => v.codeid === this.info.personinfo.level).name) || ''
    },
    score () {
      if (!this.info.personinfo) return ''
      return this.info.personinfo.score
    }
  },
  mounted () {
    this.syscode = wx.getStorageSync('syscode').data
  },
  methods: {
    changeAvatar () {
      wx.chooseImage({
        count: '1', // 最多可以选择的图片张数,
        success: res => {
          console.log(res)
        }, // 返回图片的本地文件路径列表 tempFilePaths,
        fail: () => {},
        complete: () => {}
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.container{
    margin-top: 15rpx;
    display: flex;
    flex-direction: row;
    justify-content: left;
    .avatar{
        margin-left: 15rpx;
        width: 270rpx;
        height: 270rpx;
        border-radius: 20%;
        border: 1px solid black;
    }
    .info{
        margin-left: 80rpx;
        font-size: 18px;
        display: flex;
        flex-direction: column;
        width: 100%;
        .name{
            margin-top: 20rpx;
        }
        .bottom-container{
            margin-top: auto;
            margin-bottom:20rpx;
            widows: 100%;
            .level{
                font-size: 22px;
                font-weight: bold;
                margin-bottom: 20rpx;
            }
            .score-container{
                display: inline-block;
                width: 100%;
                div{
                    display: inline-block;
                }
                a{
                    display: inline-block;
                    margin-right: 10px;
                    color:blue;
                }
            }
        }
    }
}
</style>
