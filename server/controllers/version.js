const {mysql} = require('../qcloud')
async function get (ctx) {
    try {
        const {name, version} = ctx.body
        const res = await mysql('csysconfig')
                            .select()
                            .where('name', name)
        ctx.state.data = {
            out: !(res && res.version === version)
        }
    } catch (err) {
        ctx.state = {
            code: -1,
            data: {
                msg: err.sqlMessage || '获取初始化数据失败'
            }
        }
    }
}

async function post (ctx) {

}

module.exports = {
    get,
    post
}
