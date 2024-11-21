const rspack = require("@rspack/core");
const path = require("path");

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
                target: "es2017",
                parser: {
                  syntax: "typescript",
                  tsx: true,
                  decorators: false,
                  dynamicImport: true,
                },
                transform: {
                  react: {
                    pragma: "React.createElement",
                    pragmaFrag: "React.Fragment",
                    throwIfNamespace: true,
                    development: false,
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
          // "@rspack/postcss-loader",
          {
            loader: "@rspack/postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  require("tailwindcss"), // Example plugin
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
  ],
};

module.exports = config;
