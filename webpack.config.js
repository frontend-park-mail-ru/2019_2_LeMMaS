const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const config = development => [
    {
        entry: ["./src/app.js"],
        output: {
            filename: "[name].[contenthash].js",
            path: path.resolve(__dirname, "public"),
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ["babel-loader", "eslint-loader"],
                },
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: ["ts-loader", "eslint-loader"],
                },
                {
                    test: /\.css$/,
                    use: [
                        "style-loader",
                        { loader: "css-loader", options: { importLoaders: 1 } },
                        "postcss-loader",
                    ],
                },
                {
                    test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: "[name].[ext]",
                                outputPath: "/assets/fonts/",
                            },
                        },
                    ],
                },
                {
                    test: /\.(png|jpe?g|gif)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: "[name].[ext]",
                                outputPath: "/assets/img/",
                            },
                        },
                    ],
                },
            ],
        },
        node: {
            fs: "empty",
            net: "empty",
        },
        resolve: {
            extensions: [".js", ".ts", ".tsx", ".jsx", ".json"],
            modules: ["./node_modules", "./src"],
        },
        optimization: { minimize: !development },
        devtool: development ? "source-map" : false,
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                title: "Lemmas",
                favicon: "./src/assets/img/favicon.png",
                meta: {
                    viewport:
                        "width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0",
                },
            }),
        ],
    },
    {
        entry: ["./src/sw.js"],
        output: {
            filename: "sw.js",
            path: path.resolve(__dirname, "public"),
        },
        optimization: { minimize: true },
    },
];

module.exports = (env, argv) => {
    return config(argv.mode === "development");
};
