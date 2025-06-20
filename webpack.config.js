import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  entry: "./src/main.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(process.cwd(), "public"),
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/i,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css)$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: "asset/resource",
        generator: { filename: "textures/[name][ext]" },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      inject: "body",
    }),
  ],
  devServer: {
    static: path.resolve(process.cwd(), "public"),
    compress: true,
    port: 3000,
  },
};
