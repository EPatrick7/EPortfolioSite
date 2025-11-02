const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    main: "./src/index.ts",
  },
  mode: "development",

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        exclude: path.resolve(__dirname, "src/assets/articlestyle.css"),
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      { test: path.resolve(__dirname, "src/index.html"), use: "html-loader" },

      {
        test: /\.(png|jpg|gif|skel|html|atlas|json|otf|ttf|mp3|css|mtl|obj)$/i,
        type: "asset/resource",
        exclude: path.resolve(__dirname, "src/index.html"),
        generator: {
          filename: (pathData) => {
            const match = pathData.filename.match(/src[\/\\]assets[\/\\](.*)/);
            const assetPath = match
              ? match[1]
              : path.basename(pathData.filename);
            return `assets/${assetPath}`;
          },
        },
      },
    ],
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      three: path.resolve(__dirname, "node_modules/three"),
    },
  },

  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9000,
  },
};
