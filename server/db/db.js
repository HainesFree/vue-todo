const sha1 = require('sha1');
const axios = require('axios');

const className = 'todo';// 数据库的命名空间

// request实例可以调用get,put,post,delete
const request = axios.create({
    baseURL: 'https://d.apicloud.com/mcm/api'
});

//封装处理错误信息
const createError = (code, resp) => {
    const err = new Error(resp, message)
    err.code = code;
    return err;
}
//封装处理响应信息
const handleRequest = ((status, data, ...rest) => {
    if (status === 200) {
        return data
    } else {
        throw createError(status, rest)
    }
})


//导出一个方法
module.exports = (appId, appKey) => {
    // 请求apiCloud必须要包含的header
    const getHeaders = () => {
        const now = Date.now()
        return {
            'X-APICloud-AppId': appId,
            'X-APICloud-AppKey': `${sha1(`${appId}UZ${appKey}UZ${now}`)}.${now}`
        }
    };
    // 返回封装的请求方法
    return {
        //获取所有的todo列表
        async getAllTodos() {
            return handleRequest(await request.get(`${className}`, {
                headers: getHeaders()
            }))

        },
        //添加todo应用
        async addTodo(todo) {
            return handleRequest(await request.post(
                `${className}`),
                todo,
                {headers: getHeaders()}
            )
        },
        //修改
        async updateTodo (id, todo) {
            return handleRequest(await request.put(
                `/${className}/${id}`,
                todo,
                { headers: getHeaders() }
            ))
        },
        //删除单个
        async deleteTodo (id) {
            return handleRequest(await request.delete(
                `/${className}/${id}`,
                { headers: getHeaders() }
            ))
        },
        //批量删除
        async deleteCompleted (ids) {
            const requests = ids.map(id => {
                return {
                    method: 'DELETE',
                    path: `/mcm/api/${className}/${id}`
                }
            })
            return handleRequest(await request.post(
                '/batch',
                { requests },
                { headers: getHeaders() }
            ))
        }
    }
}
