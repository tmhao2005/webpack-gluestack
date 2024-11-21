import path, {dirname} from "path";
import {fileURLToPath} from "url";
import HtmlWebPackPlugin from "html-webpack-plugin";

import MiniCssExtractPlugin from "mini-css-extract-plugin";

// polyfill for esm
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default () => ({
    entry: {
        admin: ["./src/index.tsx"]
    },
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "/",
        filename: "[name].js"
    },
    mode: "development",
    devtool: "source-map",
    target: "web",
    resolve: {
        extensions: [".js", ".jsx", ".tsx", ".ts", ".web.js", ".web.jsx", ".web.ts", ".web.tsx"],
        alias: {
            "react-native": "react-native-web",
            "react-native-svg": "react-native-svg-web",
            "react-native-safe-area-context":
                "expo-dev-menu/vendored/react-native-safe-area-context/src",
            "react-native-linear-gradient": "react-native-web-linear-gradient"
        }
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
                    )
                ],
                use: {
                    loader: "swc-loader",
                    options: {
                        parseMap: true
                    }
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: "initial",
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors"
                }
            }
        }
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebPackPlugin({
            template: "./index.html",
            inject: "body"
        })
    ]
});
