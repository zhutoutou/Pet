const {mysql} = require('../qcloud')
async function get (ctx) {
    try {
        const {open_id} = ctx.body
        const userquery = await mysql('cSessionInfo')
                                .select('cPerson.*', 'cSessionInfo.user_info')
                                .join('cPerson', 'cPerson.open_id', 'cSessionInfo.open_id')
                                .where('open_id', open_id)
                                .first()

        const petquery = await mysql('cPet')
                                .select('cPet.*')
                                .join('cPerson', 'cPerson.id', 'cPet.masterid')
                                .where('open_id', open_id)
                                .first()

        const versionquery = await mysql('cSysConfig')
                                .select('version')
                                .where('name', 'userinfo')

        const data = Object.assign({}, JSON.parse(userquery.user_info), {
            personinfo: {
                name: userquery.name,
                area: userquery.area,
                hobby: userquery.hobby
            },
            petinfo: petquery
        })

        ctx.state.data = {
            data,
            version: versionquery.version
        }
    } catch (err) {
        ctx.state = {
            code: -1,
            data: {
                msg: err.sqlMessage || '获取初始化数据失败'
            }
        }
    } finally {

    }
}

async function post (ctx) {
    try {

    } catch (err) {

    } finally {

    }
}

module.exports = {
    get,
    post
}
