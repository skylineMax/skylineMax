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
    offset: '30px', /* gutter width px || % */
    container: {
        maxWidth: '1200px', /* max-width оn very large screen */
        fields: '30px' /* side fields */
    },
    breakPoints: {
        lg: {
            width: '1100px', /* -> @media (max-width: 1100px) */
            fields: '30px' /* side fields */
        },
        md: {
            width: '960px',
            fields: '30px'
        },
        sm: {
            width: '780px',
            fields: '30px'
        },
        xs: {
            width: '560px',
            fields: '30px'
        },
        xxs: {
            width: '320px',
            fields: '30px'
        }

    }
};

gulp.task('connect', function () {
    connect.server({
        root: '',
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

gulp.task('default', ['connect','css','uncss','html','watch', 'smartgrid']);