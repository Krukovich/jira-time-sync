import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: "development",
  target: "web",
  entry: "./src/renderer/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist/renderer"),
    filename: "bundle.js",
    publicPath: "./",
    clean: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    extensionAlias: {
      ".js": [".ts", ".tsx", ".js"],
      ".mjs": [".mts", ".mjs"],
    },
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@main": path.resolve(__dirname, "src/main"),
      "@preload": path.resolve(__dirname, "src/preload"),
      "@renderer": path.resolve(__dirname, "src/renderer"),
      "@shared": path.resolve(__dirname, "src/shared"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: path.resolve(__dirname, "tsconfig.json"),
            transpileOnly: true,
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/renderer/index.html",
    }),
    new webpack.DefinePlugin({
      global: "window",
    }),
  ],

  devServer: {
    port: 3000,
    hot: true,
    liveReload: true,
    static: {
      directory: path.join(__dirname, "dist/renderer"),
    },
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    devMiddleware: {
      writeToDisk: false,
    },
  },

  devtool: "source-map",
};
