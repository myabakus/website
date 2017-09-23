const webpack = require('webpack')
const entry = require('webpack-glob-entry')
const WebpackCleanPlugin = require('webpack-clean')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  entry: entries(),
  output: {
    path: __dirname + '/dist',
    filename: 'bundle/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          },
          'extract-loader',
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src', 'link:href', 'script:src'],
              interpolate: true,
              minimize: false,
              removeComments: false
            }
          }
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '/images/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '/fonts/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '/css/[name].[hash:7].[ext]'
            }
          },
          'extract-loader',
          'css-loader'
        ]
      },
      {
        test: /\.js$/,
        loader: 'file-loader',
        options: {
          name: '/js/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
      { from: 'js/contact-en.php', to: 'js/contact-en.php' },
      { from: 'js/contact-es.php', to: 'js/contact-es.php' }
    ]),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: "vendor.js"
    }),
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        ['js', 'css'].join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    }),
    new WebpackCleanPlugin(['dist/bundle'])
  ]
}


function entries () {
  return Object.entries(
    entry(entry.basePath(), '*.html', 'colombia/*.html', 'philippines/*.html')
  ).reduce((obj, [key, file]) => {
    if (key.indexOf('master-') === -1) obj[key] = './' + file;
    return obj;
  }, {});
}
