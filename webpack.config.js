const path = require('path');

module.exports = {
  entry: {
    main: './src/index.ts',
  },
  mode: 'development', // 'development' or 'production' 
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|PNG|jpg|gif|skel|atlas|json|otf|ttf|mp3|css|html)$/i,
        type: 'asset/resource',
        generator: {
          
          filename: (pathData) => {
            if (pathData.filename.endsWith('index.html')) {
              return 'index.html'; // Place index.html in dist/
            }
            const assetPath = pathData.filename.split('src/assets/')[1];
            return `assets/${assetPath}`;
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }
      return middlewares;
    },
  },
  performance: {
    hints: false,
    maxAssetSize: 600000, // 600 KB
    maxEntrypointSize: 600000, // 600 KB
  }
};
