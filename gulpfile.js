'use strict';

var gulp = require('gulp'),
    rename = require('gulp-rename'),
    prefix = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    uncss = require('gulp-uncss'),
    cleanCSS = require('gulp-clean-css'),
    gcmq = require('gulp-group-css-media-queries'),
    smartgrid = require('smart-grid');


var smartgridSettings = {
    outputStyle: 'scss', /* less || scss || sass || styl */
    columns: 12, /* number of grid columns */
    offset: '0px', /* gutter width px || % */
    container: {
        maxWidth: '1200px', /* max-width оn very large screen */
        fields: '0px' /* side fields */
    },
    breakPoints: {
        lg: {
            width: '1100px', /* -> @media (max-width: 1100px) */
            fields: '0px' /* side fields */
        },
        md: {
            width: '960px',
            fields: '0px'
        },
        sm: {
            width: '780px',
            fields: '0px'
        },
        xs: {
            width: '560px',
            fields: '0'
        }

    }
};

gulp.task('connect', function () {
    connect.server({
        root: 'build',
        livereload: true
    });
});

gulp.task('smartgrid', function () {
    smartgrid('src/scss', smartgridSettings)
});
gulp.task('css', function () {
    gulp.src('src/scss/style.scss')
        .pipe(sass())
        .pipe(gcmq())
        .pipe(prefix('last 2 versions', '> 1%', 'ie 9'))
        .pipe(gulp.dest('build/css'))
        .pipe(cleanCSS(''))
        .pipe(rename('bundle.min.css'))
        .pipe(gulp.dest('build/css'))
        .pipe(connect.reload());
});

gulp.task('uncss', function () {
    return gulp.src('build/css/bundle.min.css')
        .pipe(uncss({
            html: ['build/index.html']
        }))
        .pipe(gulp.dest('build/css'));
});

gulp.task('html', function () {
    gulp.src('build/index.html')
        .pipe(connect.reload());
});
gulp.task('watch', function () {
    gulp.watch('build/css/*.css',['css']);
    gulp.watch('build/index.html',['html']);
    gulp.watch('src/scss/*.scss',['css']);
});

gulp.task('default', ['connect','css','uncss','html','watch', 'smartgrid']);