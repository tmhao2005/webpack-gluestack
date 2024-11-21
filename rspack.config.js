const ReactRefreshPlugin = require('@rspack/plugin-react-refresh');
const rspack = require("@rspack/core");
const path = require("path");

const isDev = process.env.NODE_ENV !== "production";

/** @type {import('@rspack/cli').Configuration} */
const config = {
  entry: {
    main: "./src/index.tsx",
  },
  experiments: {
    css: true,
  },
  mode: "development",
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
        use: [
          {
            loader: "builtin:swc-loader",
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
        ],
      },
      {
        test: /\.css$/,
        type: "javascript/auto",
        use: [
          rspack.CssExtractRspackPlugin.loader,
          "css-loader",
          {
            loader: "@rspack/postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  require("tailwindcss"),
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new rspack.CssExtractRspackPlugin(),
    new rspack.HtmlRspackPlugin({
      template: "./index.html",
    }),
    // this doesn't seem to work as well
    ...(isDev ? [new ReactRefreshPlugin({
      overlay: true,
    })] : []),
  ],
};

module.exports = config;
