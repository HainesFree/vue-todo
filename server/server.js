const Koa = require ('koa');
const send = require('koa-send')
const path = require('path')
const staticRouter = require('./routers/static')
const apiRouter = require('./routers/api')

const koaBody = require('./koa-body')
const createDb = require('./db/db');
const config = require('../config');
const db = createDb(config.appId,config.appKey)

const app = new Koa();

const isDev = process.env.NODE_ENV === 'development';

// 让apiRouter拿到db对象
app.use(async (ctx,next) =>{
    ctx.db = db;
    await next()
})

//koa中间件:处理错误信息
app.use(async (ctx,next) => {
    try{
        console.log(`request with path ${ctx.path}`)
        await next()
    } catch(err) {
        console.log(err);
        ctx.status = 500;
        if(isDev){
            ctx.body = err.message;
        }else {
            ctx.body = 'please try again later'
        }
    }
});

app.use(koaBody());
app.use(staticRouter.routes()).use(staticRouter.allowedMethods());
app.use(apiRouter.routes()).use(apiRouter.allowedMethods());//'/api'开头的路由都会在这里处理

app.use(async (ctx,next) => {
    if(ctx.path === '/favicon.ico') {
      await  send(ctx,'/favicon.ico',{root:path.join(__dirname,'../')})
    }else{
        await next();
    }
});

// 开发环境和生产环境区分
let pageRouter;
if(isDev){
    pageRouter = require('./routers/dev-ssr')
}else{
    pageRouter = require('./routers/ssr')

}
app.use(pageRouter.routes()).use(pageRouter.allowedMethods());

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3333;

app.listen(PORT,HOST,()=>{
    console.log(`server is listening on ${HOST}${PORT}`)
});