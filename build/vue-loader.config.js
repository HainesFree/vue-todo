module.exports = (isDev) => {
  return {
    preserveWhitepace: true, //去除空格
    extractCSS: !isDev,//设置为true,会将vue里面的css单独打包到一个css文件里面
    cssModules: {
      localIdentName: isDev? '[path]-[name]-[hash:base64:5]':'[hash:base64:5]',
      camelCase:true
    }
  }
};
//导出为一个 function 是因为是根据不同的环境导出不同的配置