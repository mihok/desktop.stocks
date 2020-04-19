const path = require('path');

// Plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV === 'dev' ? 'development' : 'production',

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx'],
    alias: {
      '/assets': path.resolve(__dirname, './assets')
    }
  },

  // The guts of the webpack configuration.
  module: {
    rules: [

      // Images, Fonts
      {
        test: /\.jpe?g|gif|png|svg|woff2/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },

      // CSS / Styles
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // We push the css into a /assets/css/ folder which breaks the 
              // assets when they are loaded. This fixes that.
              publicPath: '../..',
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'global',
                context: path.resolve(__dirname, 'src'),
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              // includePaths: ['./node_modules'],
              implementation: require('sass'),
            }
          },
        ],
      },

      // TypeScript
      {
        test: /\.ts(x?)$/,
        // exclude: /node_modules/,
        use: [
          { loader: 'ts-loader' }
        ]
      },
      
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      }
    ]
  },

  plugins: [
    // Exgract our styles into separate stylesheets
    new MiniCssExtractPlugin({ 
      path: path.resolve(__dirname, 'dist/assets/css/'),
      filename: 'assets/css/components.css',
    }),

    // Copy index.html and package.json so we can build the distribution just
    // from the 'dist/' folder.
    new CopyPlugin([
      { from: 'index.html' },
      { from: 'package.json' },
    ]),
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
      },
    },
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'three': 'THREE',
    // Needed for react-three-fiber
    '@juggle/resize-observer': 'ResizeObserver',
  },

  // Entrypoint
  entry: {
    'source': path.resolve(__dirname, 'src/index.tsx'),
  },

  // Output
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'assets/js/[name].js',
  },

};
