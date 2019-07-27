const Koa = require ('koa');

const app = new Koa();

const isDev = process.env.NODE_ENV === 'development';

//koa中间件:处理错误信息
app.use(async (ctx,next) => {
    try{
        console.log(`request with path ${ctx.path}`)
    } catch(err) {
        console.log(err);
        ctx.status = 500;
        if(isDev){
            ctx.body = err.message;
        }else {
            ctx.body = 'please try again later'
        }
    }
})