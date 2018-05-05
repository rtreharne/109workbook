var gulp = require('gulp');
var markdown = require('gulp-markdown');
var browserSync = require('browser-sync').create();
var toc = require('gulp-markdown-toc');



// Compile Markdown
gulp.task('markdown', function () {
    return gulp.src('index.md')
        .pipe(toc())
        .pipe(markdown())
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());
});


// Watch and Serve
gulp.task('serve', function () {
    browserSync.init(null, {
        server: {
            baseDir: "./",
        },
        port: 7410
    });
    gulp.watch('./*.md', ['markdown']);
    gulp.watch('./*.html').on('change', browserSync.reload);
});

// Default Task
gulp.task('default', ['serve']);
