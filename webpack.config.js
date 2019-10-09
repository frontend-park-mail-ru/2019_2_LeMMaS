const path = require("path");

module.exports = {
    entry: "./public/app.js", // указать с путем
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "public")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader", "eslint-loader"]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    node: {
        fs: "empty",
        net: "empty"
    }
};
