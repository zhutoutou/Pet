// 配置项
const host = 'http://172.20.10.9:5757'

const codeType = {
  LEVEL: 1
}
const config = {
  host,
  loginUrl: `${host}/weapp/login`,
  userUrl: `${host}/weapp/user`,
  uploadUrl: `${host}/weapp/upload`,
  authorizeInfo: {
    title: '微狗小程序',
    image: 'http://zhuxinghan.oss-cn-beijing.aliyuncs.com/weixin/images/avatar/2.png',
    authorities: [
      '获取经纬度地址',
      '可能获取你的朋友信息',
      '获取你的手机信息'
    ]
  },
  resCollection: {
    defaultAvatar: '/static/img/unlogin.png'
  },
  codeType
}

export default config
