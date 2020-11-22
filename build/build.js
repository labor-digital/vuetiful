/*
 * Copyright 2020 LABOR.digital
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
 * Last modified: 2020.11.20 at 16:55
 */
const path = require('path');
const {Factory} = require('@labor-digital/asset-building/dist/Core/Factory');
const factory = new Factory();

process.chdir(path.join(__dirname, '../'));

factory.makeCoreContext({
    laborConfig: {},
    mode: 'build'
}).then(context => {
    context.eventEmitter.bind('assetBuilder__filterTypescriptOptions', (e) => {
        e.args.options.configFile = path.join(__dirname, '../tsconfig.json');
        e.args.options.compilerOptions.declaration = true;
        e.args.options.onlyCompileBundledFiles = false;
        e.args.options.compilerOptions.allowJs = true;
        e.args.options.transpileOnly = false;
    });
    context.eventEmitter.bind('assetBuilder__filterLoaderTest', (e) => {
        if (e.args.identifier === 'typescriptLoader') {
            e.args.test = /\.ts$|\.tsx$/;
        }
    });
    return factory.makeWorkerContext(context, {
        app: {
            entry: path.join(__dirname, '../src/index.ts'),
            output: path.join(__dirname, '../dist/index.js'),
            extensions: ['@labor-digital/asset-building-env-vuejs'],
            minChunkSize: 999999999,
            warningsIgnorePattern: 'export \'.*?\' was not found',
            webpackConfig: {
                externals: {
                    vue: 'vue'
                },
                output: {
                    libraryExport: 'default',
                    library: '[name]',
                    libraryTarget: 'umd'
                }
            },
            polyfills: false
        }
    });
}).then(context => {
    return context.do.runCompiler();
});
