import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.bundle.js",
        clean: true
    },
    module: {
        rules: [
            {
                test: "/css$/i",
                use: ["style-loader", "css-loader"]
            },
            {
                test: "/(png|svg|gif|jpeg|jpg)$/i",
                use: "asset/resource"
            },
            {
                test: "/(woff2|woff|otf|ttf|eot)$/i",
                use: "asset/resource"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html",
            title: "webpack-template" // change this, this chanes the title docs
        })
    ]
};
