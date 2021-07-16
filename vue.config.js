const path = require('path');
const StylelintPlugin = require('stylelint-webpack-plugin');

// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const PRD = process.env.NODE_ENV === 'production';
console.log('---------------------');
console.log(process.argv);
const config = {
  pages: {
    index: {
      // page 的入口
      entry: 'src/app.js',
      // 模板来源
      // template: PRD ? 'public/index.html' : 'public/index_dev.html',
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/admin.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `admin.html`。
    //  admin: 'src/admin.js'
  },
  // 是否要在生成环境禁用 SourceMap，map文件不发cdn
  productionSourceMap: process.env.NODE_ENV !== 'production',
};
if (PRD) {
  config.outputDir = path.resolve(__dirname, 'build');
  // tag push 使用 cdn go
  if (process.env.CDN_URL) {
    config.publicPath = process.env.CDN_URL;
  } else {
    config.publicPath = process.argv[3]
      ? `https://wx.gtimg.com/static/cdn/${process.argv[3].replace('--', '')}/`
      : './';
  }
}

// 是否 inline 在 html 里，目前只支持单html
// config.configureWebpack = {
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: 'public/index.html',  //template file to embed the source
//       inlineSource: '.(js|css)$' // embed all javascript and css inline
//     }),
//     new HtmlWebpackInlineSourcePlugin()
//   ]
// }

// 禁止webpack对ssi的引用方式删除
config.configureWebpack = (ctx) => {
  ctx.plugins.push(new StylelintPlugin({
    files: ['**/*.{html,vue,css,sass,scss}'],
    fix: true,
    cache: false,
    failOnError: false,
  }));

  for (const plugin of ctx.plugins) {
    const opts = plugin.options;
    if (opts && opts.filename === 'index.html' && opts.minify != null) {
      opts.minify.removeComments = false;
    }
  }
};
module.exports = config;
