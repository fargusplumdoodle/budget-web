import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import svg from "rollup-plugin-svg";

import { terser } from "rollup-plugin-terser";
// import { getFiles } from "./scripts/buildUtils";

const extensions = [".js", ".ts", ".jsx", ".tsx"];

export default {
  input: [
    "./src/index.tsx",
    // ...getFiles("./src/common", extensions),
    // ...getFiles("./src/components", extensions),
    // ...getFiles("./src/hooks", extensions),
    // ...getFiles("./src/utils", extensions),
  ],
  output: {
    dir: "dist",
    format: "esm",
    preserveModules: true,
    preserveModulesRoot: "src",
    sourcemap: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    svg(),
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: true,
      declarationDir: "dist",
    }),
    terser(),
  ],
  external: ["react", "react-dom"],
};
