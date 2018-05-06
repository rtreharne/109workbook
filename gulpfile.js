'use strict';
var gulp = require('gulp');
var markdown = require('gulp-markdown');
var browserSync = require('browser-sync').create();
var toc = require('gulp-markdown-toc');
var html2jade = require('gulp-html2jade');
var options = {nspaces:2};
var jade = require('gulp-jade');
var sass = require('gulp-sass');



// Compile Markdown
gulp.task('markdown', function () {
    return gulp.src('./src/markdown/workbook.md')
        .pipe(toc())
        .pipe(markdown())
        .pipe(gulp.dest('./src/html/'))
        .pipe(browserSync.stream());
});

// Compile html to jade
gulp.task('html2jade', function () {
    gulp.src('./src/html/workbook.html')
        .pipe(html2jade(options))
        .pipe(gulp.dest('./src/jade/'))
        .pipe(browserSync.stream());
});

// Compile jade to html
gulp.task('jade', function () {
    gulp.src('./src/jade/*.jade')
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest('./src/'))
        .pipe(browserSync.stream());
});

// Compile Sass to CSS
gulp.task('sass', function () {
    return gulp.src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
        .pipe(browserSync.stream());
});


// Watch and Serve
gulp.task('serve', function () {
    browserSync.init(null, {
        server: {
            baseDir: "./src/",
        },
        port: 7410
    });
    gulp.watch('./src/markdown/*.md', ['markdown']);
    gulp.watch('./src/html/*.html', ['html2jade']);
    gulp.watch('./src/jade/*.jade', ['jade']);
    gulp.watch('./src/sass/*.scss', ['sass']);
    gulp.watch('./src/html/*.html').on('change', browserSync.reload);
});

// Default Task
gulp.task('default', ['serve', 'sass', 'jade', 'html2jade', 'markdown']);
