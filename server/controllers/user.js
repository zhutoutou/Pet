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
            let score = 0
            let level = 0
            const res = await mysql('cPersonInfo')
                        .select()
                        .where('open_id', open_id)

            if (!res.length) {
                await mysql('cPersonInfo')
                .insert({open_id, score, level})
            } else {
                score = res.score
                level = res.level
            }
        // loginState 为 1，登录态校验成功
            ctx.state.data = Object.assign({}, userinfo, {
                personinfo: {
                    open_id,
                    score,
                    level
                }
            })
        } catch (err) {
            console.log(err)
            ctx.state.code = -1
        }
    } else {
        ctx.state.code = -1
    }
}
