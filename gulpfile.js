'use strict';

var gulp = require('gulp'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    prefix = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    uncss = require('gulp-uncss'),
    cleanCSS = require('gulp-clean-css'),
    gcmq = require('gulp-group-css-media-queries');

gulp.task('connect', function () {
    connect.server({
        root: '',
        livereload: true
    });
});

gulp.task('css', function () {
    gulp.src('src/scss/style.scss')
        .pipe(sass())
        .pipe(gcmq())
        .pipe(prefix('last 2 versions', '> 1%', 'ie 9'))
        .pipe(gulp.dest('css'))
        .pipe(cleanCSS(''))
        .pipe(rename('bundle.min.css'))
        .pipe(gulp.dest('css'))
        .pipe(connect.reload());
});

gulp.task('uncss', function () {
    return gulp.src('css/bundle.min.css')
        .pipe(uncss({
            html: ['index.html']
        }))
        .pipe(gulp.dest('css'));
});

gulp.task('html', function () {
    gulp.src('index.html')
        .pipe(connect.reload());
});
gulp.task('watch', function () {
    gulp.watch('css/*.css',['css']);
    gulp.watch('index.html',['html']);
    gulp.watch('src/scss/*.scss',['css']);
});

gulp.task('default', ['connect','css','uncss','html','watch']);