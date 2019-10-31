const path = require("path");

module.exports = {
    mode: "production",
    entry: "./public/app.js",
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
        ],
    },
    node: {
        fs: "empty",
        net: "empty",
    },
};
