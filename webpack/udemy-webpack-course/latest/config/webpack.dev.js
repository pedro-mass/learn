const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    main: ["./src/main.js"]
  },
  mode: "development",
  output: {
    filename: "[name]-bundle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/"
  },
  devServer: {
    contentBase: "dist",
    port: "3000",
    overlay: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader"
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            // injects css into html
            loader: "style-loader"
          },
          {
            // runs linting?
            loader: "css-loader"
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            // tells webpack the name of the file to create
            loader: "file-loader",
            options: {
              name: "[name].[ext]"
            }
          },
          {
            // tells webpack to be a separate file
            loader: "extract-loader",
            options: {
              publicPath: "../"
            }
          },
          {
            // does the linting
            loader: "html-loader",
            options: {
              attrs: ["img:src"]
            }
          }
        ]
      },
      {
        test: /\.(jpg|gif|png)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
