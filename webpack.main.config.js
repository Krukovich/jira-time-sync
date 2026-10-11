import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: "development",
  target: "electron-main",
  entry: "./src/main/main.ts",
  output: {
    path: path.resolve(__dirname, "dist/main"),
    filename: "main.cjs",
    clean: false,
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@main": path.resolve(__dirname, "src/main"),
      "@shared": path.resolve(__dirname, "src/shared"),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: { transpileOnly: true },
        },
      },
    ],
  },
};
