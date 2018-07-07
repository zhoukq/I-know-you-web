const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const pkg = require('../package.json')

const srcDir = path.join(__dirname, '/../src')
const outputDir = path.join(__dirname, '/../output')

const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production'

module.exports = {
  mode: mode,
  // root directory used to resolve paths
  context: srcDir,
  // Store/Load compiler state from/to a json file. This will result in persistent ids of modules and chunks.
  recordsPath: path.join(outputDir, '/manifests/records.json'),
  entry: {
    app: './index.js',
    // everything that's in dependencies (not a devDependencies) in our package.json file will be bundled into vendor.js
    vendor: Object.keys(pkg.dependencies)
  },
  // we'll output everything to /output
  output: {
    path: outputDir,
    filename: '[name].min.js'
  },
  optimization: {
	minimize: mode === 'production',
	splitChunks: {
		cacheGroups: {
			vendor: {
				test: /[\\/]node_modules[\\/]/,
				name: 'vendor',
				enforce: true,
				chunks: 'all'
			}
		}
	}
  },
  plugins: [
    // don't emit assets with errors
    new webpack.NoEmitOnErrorsPlugin(),
    // writes out our index.html
    new HtmlWebpackPlugin({
      title: 'I know you',
      template: path.join(__dirname, '/index.html.ejs'),
      inject: true,
      appMountId: 'root',
	  mobile: true,
	  hash: true,
	}),
	new MiniCssExtractPlugin({
		filename: '[name].css',
		chunkFilename: '[name].css',
	})
  ],
  module: {
    rules: [
      {
        test: [ /\.js$/ ],
        exclude: /node_modules/,
        include: [
          srcDir,
          path.join(srcDir, '/../../common/')
        ],
		use: {
			loader: 'babel-loader',
			options: mode === 'production' ? {
				presets: ['babel-preset-env', 'babel-preset-stage-0']
			} : {}
		},
	  },
	  {
		test: /\.css$/,
		use: [
			MiniCssExtractPlugin.loader,
			{
				loader: 'css-loader',
				options: {
					url: false,
					minimize: mode === 'production',
					sourceMap: mode === 'development',
				}
			},
		],
	  },
      {
		test: /\.scss$/,
		exclude: /node_modules/,
		use: [
			MiniCssExtractPlugin.loader,
			{
				loader: 'css-loader',
				options: {
					url: false,
					minimize: mode === 'production',
					sourceMap: mode === 'development',
				}
			},
			{
				loader: 'sass-loader',
				options: {
					url: false,
					sourceMap: mode === 'development',
				}
			},
		],
	  }
    ]
  },
  resolve: {
    extensions: [ '.json', '.js', '.jsx','.css']
  }
}
