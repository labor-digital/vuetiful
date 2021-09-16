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
 * Last modified: 2021.09.14 at 10:30
 */

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');
const path = require('path');

const sassSourceFile = path.join(__dirname, 'src/Style/index.sass');
const outputFolder = path.join(__dirname, 'dist');
const watchedResources = path.join(__dirname, 'src/Style/**/*');

gulp.task('sass', function (done) {
    gulp.src(sassSourceFile)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', function (err) {
            console.error(err.message);
        }))
        .pipe(postcss([
            autoprefixer, cssnano({
                preset: [require('cssnano-preset-default'), {discardComments: {removeAll: true}}]
            })
        ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(outputFolder))
        .on('end', done);
});

gulp.task('watch', gulp.series('sass', function (done) {
    gulp.watch(watchedResources, gulp.parallel('sass'));
    done();
}));

gulp.task('default', gulp.series('watch', function () {}));
