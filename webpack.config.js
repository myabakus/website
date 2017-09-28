const path = require('path')
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
  resolveLoader: {
    modules: [path.resolve(__dirname, 'build'), 'node_modules']
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
              attrs: ['img:src', 'link:href', 'script:src', 'form:action'],
              minimize: true,
              removeComments: true,
              preserveLineBreaks: true,
              removeScriptTypeAttributes: true
            }
          },
          {
            loader: 'html-merge-assets-loader',
            options: {
              js: {
                inline: [
                  'js/km.js',
                  'js/drift.js'
                ]
              }
            }
          },
          {
            loader: 'html-ext-remove-loader',
            options: {
              ignore: [
                '/help/',
                '/privacy.html',
                '/terms.html'
              ]
            }
          },
          'pinegrow-remove-properties-loader'
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
      },
      {
        test: /\.php$/,
        loader: 'file-loader',
        options: {
          name: '/[path][name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
      { from: 'js/km.js', to: 'js/km.js' }, // help use to km
      { from: 'images/favicon.png', to: 'images/favicon.png' } // other page use this file
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
