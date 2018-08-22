const {mysql} = require('../qcloud')
module.exports = async (ctx, next) => {
    // 通过 Koa 中间件进行登录态校验之后
    // 登录信息会被存储到 ctx.state.$wxInfo
    // 具体查看：
    if (ctx.state.$wxInfo.loginState === 1) {
        const userinfo = ctx.state.$wxInfo.userinfo
        try {
            // eslint-disable-next-line
            const open_id = userinfo.openId

            // 初始化数据
            let score = 0         // 默认积分0
            let level = 1         // 默认等级1
            let version = 0       // 版本号
            const name = 'userinfo' // 版本控制名称

            // 查询是否已经存在记录
            let personquery = await mysql('cPersonInfo')
                        .select()
                        .where('open_id', open_id)
                        .first()
            if (!personquery) {
                // 新增用户基础信息
                await mysql('cPersonInfo')
                        .insert({open_id, score, level})
            } else {
                score = personquery.score
                level = personquery.level
            }

            // 查询是否已经存在记录
            const versionquery = await mysql('cSysConfig')
                                        .select()
                                        .where('name', name)
                                        .first()
            if (!versionquery) {
                   // 新增用户数据版本信息
                await mysql('cSysConfig')
                   .insert({name, version})
            } else {
                version = versionquery.version
            }
            const data = Object.assign({}, userinfo, {
                personinfo: {
                    open_id,
                    score,
                    level
                }
            })
            // loginState 为 1，登录态校验成功
            ctx.state.data = {
                data,
                version
            }
        } catch (err) {
            console.log(err)
            ctx.state.code = -1
        }
    } else {
        ctx.state.code = -1
    }
}
