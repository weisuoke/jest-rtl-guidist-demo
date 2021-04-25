const path = require('path')
const {WebpackPluginServe} = require("webpack-plugin-serve");
const {
  MiniHtmlWebpackPlugin,
  generateAttributes,
  generateCSSReferences,
  generateJSReferences
} = require("mini-html-webpack-plugin");

const APP_SOURCE = path.join(__dirname, "src");

exports.devServer = () => ({
  watch: true,
  plugins: [
    new WebpackPluginServe({
      port: process.env.PORT || 8080,
      static: "./dist", // Expose if output.path changes
      liveReload: true,
      waitForBuild: true,
    }),
  ],
});

exports.page = ({title}) => ({
  plugins: [new MiniHtmlWebpackPlugin({context: {title}})],
});

exports.customTemplatePage = () => ({
  plugins: [
    new MiniHtmlWebpackPlugin({
      context: {
        title: "React demo",
        htmlAttributes: {
          lang: 'en',
        },
        head: '',
        body: '',
        cssAttributes: {
          rel: 'preload',
          as: 'style',
        },
        jsAttributes: {
          defer: true,
        },
      },
      template: ({
        css,
        js,
        publicPath,
        title,
        htmlAttributes,
        cssAttributes,
        jsAttributes
      }) => {
        const htmlAttrs = generateAttributes(htmlAttributes);
        const cssTags = generateCSSReferences({
          files: css,
          attributes: cssAttributes,
          publicPath,
        });

        const jsTags = generateJSReferences({
          files: js,
          attributes: jsAttributes,
          publicPath,
        });

        return `<!DOCTYPE html>
          <html${htmlAttrs}>
            <head>
              <meta charset="UTF-8">
              <title>${title}</title>
              ${cssTags}
            </head>
            <body>
              <div id="root"></div>
              ${jsTags}
            </body>
          </html>`;
      }
    })
  ]
})

exports.loadJavaScript = () => ({
  module: {
    rules: [
      // Consider extracting include as a parameter
      {test: /\.js$/, include: APP_SOURCE, use: "babel-loader"},
    ],
  },
});