const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: { presets: ["@babel/preset-env"] },
        },
        resolve: {
          extensions: ["*", ".js"],
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpeg|ttf|...)$/,
        use: [
          { loader: "url-loader" },
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: __dirname + "/src/images", to: "images" }],
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
  watchOptions: {
    ignored: "/node_modules/",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  target: "web",
  devtool: "source-map",
  devServer: {
    contentBase: "./dist",
    compress: false,
    historyApiFallback: true,
    hot: true,
    port: 3000,
  },
};
