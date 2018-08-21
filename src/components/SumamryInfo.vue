<template>
    <div class="container">
        <div>
            <img :src="info.avatarUrl" alt="" class="avatar">
        </div>
        <div class="info">
            <div class="name">{{info.nickName}}</div>
            <div class="level text-cute">{{personinfo.level}}</div>
            <div class="score-container">
                <div class="score">积分 {{personinfo.score}}分</div>
                <a href="">查看详情</a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  props: ['info', 'personinfo']
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
        font-size: 16px;
        display: flex;
        flex-direction: column;
        .name{
            margin-top: 20rpx;
        }
        .level{
            font-weight: bold;
            margin-left: 5rpx;
            margin-bottom: 10rpx;
        }
        .score-container{
            font-size: 14px;
            margin-top:auto;
            margin-bottom:10rpx;
            display: inline-block;
            a{
                margin-left: 5rpx;
                color:blue;
            }
        }
    }
}
</style>
