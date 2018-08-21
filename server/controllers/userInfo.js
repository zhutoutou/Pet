const {mysql} = require('../qcloud')
async function get (ctx) {
    try {
        const {open_id} = ctx.body
        const userinfo = await mysql('cSessionInfo')
                                .select('cPerson.*', 'cSessionInfo.user_info')
                                .join('cPerson', 'cPerson.open_id', 'cSessionInfo.open_id')
                                .where('open_id', open_id)

        const petinfo = await mysql('cPet')
                                .select('cPet.*')
                                .join('cPerson', 'cPerson.id', 'cPet.masterid')
                                .where('open_id', open_id)
        const info = JSON.parse(userinfo.user_info)

        ctx.state.data = {
            userinfo: Object.assign({}, info, {
                personinfo: {
                    name: userinfo.name,
                    area: userinfo.area,
                    hobby: userinfo.hobby
                },
                petinfo: petinfo
            })
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
