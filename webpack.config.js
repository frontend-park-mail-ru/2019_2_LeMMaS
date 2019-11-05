const path = require("path");

module.exports = {
    mode: "production",
    entry: ["./src/app.js"],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "public"),
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader", "eslint-loader"],
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "/static/fonts/",
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
};
