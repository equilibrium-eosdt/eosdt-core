const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const { version } = require("./package.json");

module.exports = (env, argv) => ({
  entry: {
    inject: "./src/inject.ts",
    iframe: "./src/iframe.ts",
  },
  devtool: argv && argv.mode === "production" ? false : "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: `[name]-${version}.js`,
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HTMLPlugin({
      filename: `iframe-${version}.html`,
      template: "src/iframe.html",
      templateParameters: { version },
      inject: false,
    }), // TODO separate CDN content and examples
  ],
});
