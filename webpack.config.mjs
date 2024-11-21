import path, { dirname } from "path";
import { fileURLToPath } from "url";
import HtmlWebPackPlugin from "html-webpack-plugin";

import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

// polyfill for esm
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isDev = process.env.NODE_ENV !== "production";

export default () => ({
  entry: {
    admin: ["./src/index.tsx"],
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].js",
  },
  mode: "development",
  devtool: "source-map",
  target: "web",
  resolve: {
    extensions: [
      ".js",
      ".jsx",
      ".tsx",
      ".ts",
      ".web.js",
      ".web.jsx",
      ".web.ts",
      ".web.tsx",
    ],
    alias: {
      "react-native": "react-native-web",
      "react-native-svg": "react-native-svg-web",
      "react-native-safe-area-context":
        "expo-dev-menu/vendored/react-native-safe-area-context/src",
      "react-native-linear-gradient": "react-native-web-linear-gradient",
    },
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/i,
        // exclude: /node_modules/,
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "node_modules/react-native"),
          path.resolve(__dirname, "node_modules/react-native-css-interop"),
          path.resolve(__dirname, "node_modules/@react-native-aria"),
          path.resolve(__dirname, "node_modules/@gluestack-ui"),
          path.resolve(
            __dirname,
            "node_modules/expo-dev-menu/vendored/react-native-safe-area-context/src"
          ),
        ],
        use: {
          loader: "swc-loader",
          options: {
            sourceMap: false,
            jsc: {
              baseUrl: __dirname,
              target: "es2017",
              parser: {
                syntax: "typescript",
                tsx: true,
                decorators: false,
                dynamicImport: true,
              },
              paths: {
                "@/*": ["src/*"],
              },
              transform: {
                react: {
                  pragma: "React.createElement",
                  pragmaFrag: "React.Fragment",
                  throwIfNamespace: true,
                  development: isDev,
                  refresh: isDev,
                  useBuiltins: false,
                  runtime: "automatic",
                  importSource: "nativewind",
                },
              },
            },
            module: {
              type: "commonjs",
              strict: false,
              strictMode: true,
              lazy: false,
              noInterop: false,
            },
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: "initial",
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
        },
      },
    },
  },
  plugins: [
    // this doesn't seem to work with webpack-dev-server
    ...(isDev
      ? [
          new ReactRefreshWebpackPlugin({
            // disable red box for dev mode which shows error in case http requests being cancelled
            overlay: false,
          }),
        ]
      : []),
    new MiniCssExtractPlugin(),
    new HtmlWebPackPlugin({
      template: "./index.html",
      inject: "body",
    }),
  ],
});
