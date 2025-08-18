const rules = require('./webpack.rules');

rules.push(
  {
    test: /\.css$/,
    use: [
      { loader: 'style-loader' },
      {
        loader: 'css-loader',
        options: { importLoaders: 1 },
      },
      { loader: 'postcss-loader' },
    ],
  },
  {
    test: /\.(png|jpe?g|gif|svg|mp3)$/i,
    type: 'asset/resource',
  },
  {
    test: /\.(woff2?|ttf|otf|eot)$/i,
    type: 'asset/resource',
  },
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-react'],
      },
    },
  }
);

module.exports = {
  // Put your normal webpack config below here
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules,
  },
};


