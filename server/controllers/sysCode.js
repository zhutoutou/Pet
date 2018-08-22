const {mysql} = require('../qcloud')
module.exports = async ctx => {
    try {
        let syscode = []
        const syscodetypequery = await mysql('cSysCodetype')
                                .select()
        if (syscodetypequery.length > 0) {
            syscode = await Promise.all(syscodetypequery.map(async v => {
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
        const versionquert = await mysql('cSysConfig')
                                    .select('version')
                                    .where('name', 'codelist')
                                    .first()
        ctx.state.data = {
            data: syscode,
            version: versionquert.version
        }
        console.log(ctx.state)
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
