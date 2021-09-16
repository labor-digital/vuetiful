/*
 * Copyright 2021 LABOR.digital
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Last modified: 2021.03.09 at 13:49
 */

import {nodeResolve} from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import {terser} from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import vue from 'rollup-plugin-vue';
import pkg from './package.json';

/**
 * Comment with library information to be appended in the generated bundles.
 */
const banner = `/*!
 * ${pkg.name}
 * (c) ${pkg.author.name} (${pkg.author.email} | ${pkg.author.url})
 * Released under the ${pkg.license} License.
 */
`;

/**
 * Creates an output options object for Rollup.js.
 * @param {import('rollup').OutputOptions} options
 * @returns {import('rollup').OutputOptions}
 */
function createOutputOptions(options)
{
    return {
        banner,
        name: 'vuetiful',
        exports: 'named',
        sourcemap: true,
        ...options
    };
}

/**
 * @type {import('rollup').RollupOptions}
 */
const options = {
    input: 'src/index.ts',
    external: [...Object.keys(pkg.dependencies), 'vue'],
    onwarn: function (warning) {
        // Suppress this error message...
        // https://github.com/rollup/rollup/issues/794#issuecomment-270803587
        if (warning.code === 'THIS_IS_UNDEFINED') {
            return;
        }
        console.error(warning.message);
    },
    plugins: [
        typescript({
            exclude: ['node_modules']
        }),
        vue(),
        nodeResolve(),
        commonjs()
    ],
    output: [
        createOutputOptions({
            file: './dist/index.js',
            format: 'commonjs'
        }),
        createOutputOptions({
            file: './dist/index.esm.js',
            format: 'esm'
        }),
        createOutputOptions({
            file: './dist/index.umd.js',
            format: 'umd'
        }),
        createOutputOptions({
            file: './dist/index.umd.min.js',
            format: 'umd',
            plugins: [
                terser()
            ]
        })
    ]
};

export default options;
