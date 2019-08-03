const Router = require('koa-router');
const userRouter = new Router({prefix:'/user'});
userRouter.post('/login',async(ctx) => {
    const user = ctx.request.body;
    if (user.username==='jocky' && user.password ==='jocky111'){
        ctx.session.user = {
            username:'jocky'
        }
        ctx.body= {
            success : true,
            data:{
                username : 'jocky'
            }
        }
    }else {
        ctx.status = 400;
        ctx.body = {
            success :false,
            message:'username or password is error'
        }
    }
})

module.exports = userRouter;