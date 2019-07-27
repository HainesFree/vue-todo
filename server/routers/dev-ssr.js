const Router = require('koa-router');
const Axios = require('axios');
const MemoryFs = require('memory-fs');
const fs       = require('fs');
const path       = require('path');
const Webpack = require('webpack');
const VueServerRender = require('vue-server-renderer');

const serverConfig = require('../../build/webpack.config.server');

//1.node环境编译webpack打出的包
const serverCompiler = webpack(serverConfig);

const mfs = new MemoryFs();
serverCompiler.outputFileSystem = mfs;

let bundle; //记录每次webpack打包生成的文件
serverCompiler.watch({},(err,stats) =>{
    //监听变化，重新打包
    if(err) throw err;
    stats = stats.toJson();
    stats.errors.forEach(err => {
        console.log(err);
    });
    stats.hasWarnings.forEach((warn) => console.log(warn));

    const bundlePath = path.join(serverConfig.output.path,
        'vue-ssr-server-bundle.json');
    bundle = JSON.parse(mfs.readFileSync(bundlePath,'utf-8'))
});

const handleSSR = async (ctx) => {
    if(bundle){
       ctx.body = '你等一会，别着急';
       return;
    }
    const clientManifestResp = await axios.get(
        'http://127.0.0.1:8000/vue-ssr-client-manifest.json'
    );
    const clientManifest = clientManifestResp.data;

    const template = fs.readFileSync(
        path.join(__dirname,'../server.template.ejs')
    );

    const renderer = VueServerRender
        .createBundleRenderer(bundle,{
            inject:false,
            clientManifest
        })

}
