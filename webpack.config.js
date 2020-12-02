const path = require( 'path' );
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {

  // bundling mode
  mode: 'production',

  // entry files
  entry: './static/src/script/main.ts',

  // output bundles (location)
  output: {
    path: path.resolve( __dirname + '/static/dist/'),
    filename: 'bundle.js',
  },

  // file resolutions
  resolve: {
    extensions: ['.ts', '.js'],
  },

  // loaders
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [

    new MiniCssExtractPlugin({
      filename: 'bundle.css',
    }),

  ],
};
