const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const sveltePreprocess = require('svelte-preprocess');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
	entry: {
		'build/bundle': ['./src/main-svelte.js']
	},
	resolve: {
		alias: {
			svelte: path.dirname(require.resolve('svelte/package.json'))
		},
		extensions: ['.mjs', '.js', '.svelte'],
		mainFields: ['svelte', 'browser', 'module', 'main']
	},
	output: {
		path: path.join(__dirname, '/public'),
		filename: '[name].js',
		// chunkFilename: '[name].[id].js'
	},
    // optimization: {
    //     splitChunks: {
    //       chunks: 'all',
    //     },
    //   },
	module: {
		rules: [
			{
				test: /\.svelte$/,
				use: {
					loader: 'svelte-loader',
					options: {
						compilerOptions: {
							dev: !prod
						},
						emitCss: prod,
						hotReload: !prod,
                        preprocess: sveltePreprocess({
                            // https://github.com/kaisermann/svelte-preprocess/#user-content-options
                            sourceMap: !prod,
                            postcss: {
                                plugins: [
                                    require("tailwindcss"), 
                                    // require("autoprefixer"),
                                    // require("postcss-nesting")
                                ],
                            },
                        }),
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			},
			{
				// required to prevent errors from Svelte on Webpack 5+
				test: /node_modules\/svelte\/.*\.mjs$/,
				resolve: {
					fullySpecified: false
				}
			},
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'build/[hash][ext][query]'
                  }
            },
		]
	},
	mode,
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css'
		})
	],
	devtool: prod ? false : 'source-map',
	devServer: {
		hot: true
	}
};