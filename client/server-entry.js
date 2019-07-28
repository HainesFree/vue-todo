import createAPP from './create-app';


export default context => {
    return new Promise((resolve,reject) => {
        const {app,router} = createAPP()
        router.push(context.url);

        //获取服务端数据用的
        console.log('server-entry runed..')
        router.onReady(()=>{
            const matchedComponents = router.getMatchedComponents()
            if (!matchedComponents.length) {
                return reject(new Error('no component matched'))
            }
            context.meta = app.$meta()
            resolve(app)
        })
    })
}