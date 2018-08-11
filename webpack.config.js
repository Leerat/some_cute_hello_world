const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const isProduction = process.env.NODE_ENV === 'production'
const isAnalyzing = process.env.ANALYZE

const root = process.cwd()
const skip = () => false

const config = {
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? false : 'cheap-module-eval-source-map',
  context: path.resolve(root, 'src'),
  entry: {
    app: './index.js',
    core: [
      'react',
      'react-dom',
      'react-router',
      'redux',
      'react-redux'
    ]
  },
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(root, 'dist/client_dist'),
    publicPath: '/',
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        commons: {
          test: 'core',
          name: 'core',
          chunks: 'initial'
        },
        async: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'async',
          priority: -10
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: 'initial',
          priority: -20
        },
        css: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'async',
          enforce: true
        }
      }
    }
  },
  devServer: {
    port: '3003',
    hotOnly: true,
    contentBase: path.resolve(root, 'build'),
    publicPath: '/',
    historyApiFallback: true,
    disableHostCheck: true,
  },
  resolve: {
    extensions: [ '.js', '.jsx' ],
    modules: [
      path.resolve(root, 'src'),
      'node_modules',
    ],
  },
  plugins: [
    isAnalyzing ? new BundleAnalyzerPlugin() : skip,
    new HtmlWebpackPlugin({
      template: path.resolve(root, 'src/index.html'),
      hash: true
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js(x)?$|.ts(x)?$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: [/node_modules/, 'dist'],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file-loader',
        query: {
          name: 'assets/[name].[ext]',
        }
      }
    ]
  },
}

module.exports = config

