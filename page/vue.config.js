const path = require('path');
const sourceMap = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';
module.exports = {
  // 基本路径
  publicPath: './',
  // 输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  chainWebpack: () => { },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production';
    } else {
      // 为开发环境修改配置...
      config.mode = 'development';
    }

    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        extensions: ['.js', '.vue', '.json', '.ts', '.tsx'],
        alias: {
          vue$: 'vue/dist/vue.js',
          '@': path.resolve(__dirname, './src'),
          '@c': path.resolve(__dirname, './src/components'),
          utils: path.resolve(__dirname, './src/utils'),
          less: path.resolve(__dirname, './src/less'),
          views: path.resolve(__dirname, './src/views'),
          assets: path.resolve(__dirname, './src/assets'),
          com: path.resolve(__dirname, './src/components'),
          store: path.resolve(__dirname, './src/store'),
          mixins: path.resolve(__dirname, './src/mixins'),
        },
      },
    });
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: sourceMap,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: isProduction,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // modules: false,
    // 启用 CSS modules for all css / pre-processor files.
    // requireModuleExtension: false,
  },
  // 开发服务器配置
  devServer: {
    disableHostCheck: true, // 禁用webpack热重载检查 解决热更新失效问题
    host: '0.0.0.0',
    port: 3001,
    https: false,
    hotOnly: true,
    // eslint报错页面会被遮住
    overlay: {
      warnings: true,
      errors: true,
    },
    // proxy: {
    //   [process.env.VUE_APP_BASE_URL]: {
    //     target: process.env.VUE_APP_BASE_TARGET,
    //     changeOrigin: true,
    //     ws: true,
    //     pathRewrite: {
    //       // 通过pathRewrite重写地址，将前缀/api转为
    //       ['^' + process.env.VUE_APP_BASE_URL]: '',
    //     },
    //   },
    // },
  },
};
