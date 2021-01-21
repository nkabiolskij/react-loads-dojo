//@ts-check
const path = require("path");
const fs = require("fs");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const WebpackAssetsManifest = require("webpack-assets-manifest");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const webpack = require("webpack");

function getLibraryName(name) {
  return name
    .replace(/[^a-z0-9_]/g, " ")
    .trim()
    .replace(/\s+/g, "_");
}

const basePath = process.cwd();
const packageJsonPath = path.join(basePath, "package.json");
const packageJson = fs.existsSync(packageJsonPath)
  ? require(packageJsonPath)
  : {};
const packageName = packageJson.name || "main";
const libraryName = getLibraryName(packageName);

const nextPublicPath = "/widgets/maskwidget/v1/";

module.exports = (env) => {
  return {
    mode: "production",
    entry: path.resolve(__dirname, "./src/main"),
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.module\.s(a|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-modules-typescript-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: "[path]___[name]__[local]___[hash:base64:5]",
                },
                sourceMap: true,
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.s(a|c)ss$/,
          exclude: /\.module.(s(a|c)ss)$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "fonts/",
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        "ENV.PROD": JSON.stringify(env.prod === true),
        "ENV.DEV": JSON.stringify(env.dev === true),
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "[name].[fullhash].css",
        chunkFilename: "[id].[fullhash].css",
      }),
      new WebpackAssetsManifest({}),
      new HtmlWebpackPlugin({
        inject: true,
        template: "./public/index.html",
      }),
      new AddAssetHtmlPlugin([
        {
          filepath: require.resolve(
            "./custom-element/output/theme/custom/custom-1.0.0.js"
          ),
          publicPath: "",
        },
        {
          filepath: require.resolve(
            "./custom-element/output/theme/custom/custom-1.0.0.css"
          ),
          publicPath: "",
          typeOfAsset: "css",
        },
        {
          filepath: require.resolve("./custom-element/output/dist/wrapper-1.0.0.js"),
          publicPath: "",
        },
        {
          filepath: require.resolve("./custom-element/output/dist/wrapper-1.0.0.css"),
          publicPath: "",
          typeOfAsset: "css",
        },
        // {
        //   filepath: require.resolve(
        //     "./node_modules/@dojo/widgets/theme/dojo/dojo-7.0.5.css"
        //   ),
        //   publicPath: "",
        //   typeOfAsset: "css",
        // },
        // {
        //   filepath: require.resolve(
        //     "./node_modules/@dojo/widgets/theme/dojo/dojo-7.0.5.js"
        //   ),
        //   publicPath: "",
        // },
      ]),
    ],
    resolve: {
      fallback: {
        crypto: false,
        stream: false,
      },

      extensions: [
        ".wasm",
        ".ts",
        ".tsx",
        ".mjs",
        ".cjs",
        ".js",
        ".json",
        ".scss",
      ],
    },
    output: {
      publicPath: env.prod === true ? nextPublicPath : "/",
      filename: "[name].[fullhash].js",
      umdNamedDefine: true,
      path: path.resolve(__dirname, "./output/dist"),
      library: `lib_${libraryName}`,
      libraryTarget: "umd",
    },
    devServer: {
      publicPath: "/",
      contentBase: path.resolve(__dirname, "./output/dist"),
      hot: true,
      open: false,
      port: 9996,
    },
  };
};
