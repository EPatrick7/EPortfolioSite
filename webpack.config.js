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
        test: /\.(png|jpg|gif|skel|atlas|json|otf|ttf|mp3)$/i,
        type: 'asset/resource',
        generator: {
          filename: (pathData) => {
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
      devServer.app.get('/slotify/connector/connector.js', (req, res, next) => {
        res.setHeader('Content-Type', 'application/javascript');
        next();
      });
      return middlewares;
    },
  },
  performance: {
    hints: false,
    maxAssetSize: 600000, // 600 KB
    maxEntrypointSize: 600000, // 600 KB
  }
};
