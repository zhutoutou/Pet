const {mysql} = require('../qcloud')
module.exports = async ctx => {
    try {
        let codelist = []
        const types = await mysql('cSysCodetype')
                                .select()
        if (types.length > 0) {
            codelist = await Promise.all(types.map(async v => {
                const typeid = v.codeid
                const codes = await mysql('cSysCode')
                                        .select()
                                        .where('typeid', typeid)
                return {
                    type: v.codeid,
                    list: codes
                }
            }))
        }
        console.log(codelist)
        ctx.state.data = {
            list: codelist
        }
    } catch (err) {
        console.log(err)
        ctx.state = {
            code: -1,
            data: {
                msg: err.sqlMessage || '获取初始化数据失败'
            }
        }
    }
}
