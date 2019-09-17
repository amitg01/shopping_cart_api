const path = require("path");
module.exports = {
  mode: "development",
  entry: "./client/index.js",
  output: {
    path: path.resolve(__dirname, "public/javascripts"),
    filename: "bundle.js"
  },
  module: {
    rules: [{ test: /\.js$/, use: "babel-loader" }]
  }
};
