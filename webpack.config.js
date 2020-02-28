const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/index.ts"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]-[contentHash].js",
    publicPath: "/"
  },
  resolve: {
    extensions: [".ts", ".js", ".css", ".svg"],
    alias: {
      "@": path.join(__dirname, "src")
    }
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        loaders: [{ loader: "svg-sprite-loader" }, "svgo-loader"]
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|woff2)$/,
        loader: "file-loader",
        options: {
          name: "[name]-[sha1:hash:hex:20].[ext]"
        }
      },
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-env", { loose: true }]],
              include: ["src", "node_modules/effector-dom"]
            }
          },
          { loader: "ts-loader", options: { transpileOnly: true } }
        ],
        include: [/node_modules\/effector-dom/, /src/],
        exclude: [/node_modules/]
      }
    ]
  },
  plugins: [
    new webpack.IgnorePlugin({
      // Workaround for broken libraries
      resourceRegExp: /^(fs|path)$/
    }),
    new HtmlWebpackPlugin({
      chunks: ["main"],
      filename: "index.html",
      template: "./src/index.ejs",
      inject: false
    })
  ],
  devServer: {
    port: 1234,
    historyApiFallback: true
  }
};
