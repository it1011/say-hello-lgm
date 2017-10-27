import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import sourceMaps from "rollup-plugin-sourcemaps";
import camelCase from "lodash.camelcase";
import url from "rollup-plugin-url";
import postcss from "rollup-plugin-postcss";
import sass from 'postcss-node-sass';
import copy from 'postcss-copy'

const pkg = require("./package.json");

const libraryName = "component-template";

export default {
    input: `src/index.js`,
    output: [
        { file: pkg.main, name: camelCase(libraryName), format: "umd" },
        { file: pkg.module, format: "es" }
    ],
    sourcemap: true,
    // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
    external: [],
    watch: {
        include: "compiled/**"
    },
    plugins: [
        url({
            limit: 5 * 1024,
            // include: ['**/*.svg']
            emitFiles: true
        }),
        postcss({
            plugins: [
              copy({
                dest: 'dist/'
              }),
              sass()
            ],
            extensions: [".css", ".scss",  ".sass"]
            // extract: 'dist/toto.css'
        }),
        // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
        commonjs(),
        // Allow node_modules resolution, so you can use 'external' to control
        // which external modules to include in the bundle
        // https://github.com/rollup/rollup-plugin-node-resolve#usage
        resolve(),

        // Resolve source maps to the original source
        sourceMaps()
    ]
};
