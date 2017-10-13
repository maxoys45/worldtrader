var gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    fileinclude = require('gulp-file-include'),
    pngquant = require('imagemin-pngquant'),
    jsmin = require('gulp-jsmin'),
    rename = require('gulp-rename');


var settings = {
    srcFolder: '_resources/',
    assetsFolder: 'build/assets/',
    layoutFolder: '_layouts/',
    buildFolder: 'build/'
};

gulp.task('minify-js', function () {
    gulp.src(settings.srcFolder + 'js/*.js')
        .pipe(jsmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(settings.assetsFolder + 'js/'));
});

gulp.task('compile-sass', function () {
    gulp.src([settings.srcFolder + 'sass/*'])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(settings.assetsFolder + 'css/'))
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(settings.assetsFolder + 'css/'));
});

gulp.task('copy-js', function () {
    gulp.src(settings.srcFolder + 'js/*.js')
        .pipe(gulp.dest(settings.assetsFolder + 'js/'))

});

gulp.task('copy-fonts', function () {
    gulp.src(settings.srcFolder + 'fonts/**/*')
        .pipe(gulp.dest(settings.assetsFolder + 'fonts/'));
});

gulp.task('copy-img', function() {
    gulp.src(settings.srcFolder + 'img/*')
        .pipe(gulp.dest(settings.assetsFolder + 'img/'));
});

gulp.task('file-include', function () {
    gulp.src([
        settings.layoutFolder + '**/*.html'
    ])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./build'));
});

// UNCOMMENT MINIFY JS WHEN PRODUCTION READY

gulp.task('default', ['file-include', 'compile-sass', /*'minify-js', 'minify-img',*/ 'copy-js', 'copy-fonts', 'copy-img'], function () {

    gulp.watch(settings.layoutFolder + '/**/*.html', ['file-include']);
    // gulp.watch(settings.srcFolder + 'img/*', ['minify-img']);\
    // gulp.watch(settings.srcFolder + 'js/*', ['minify-js']);
    gulp.watch(settings.srcFolder + 'sass/**/*', ['compile-sass']);
    gulp.watch(settings.srcFolder + 'js/*', ['copy-js']);
    gulp.watch(settings.srcFolder + 'fonts/**/*', ['copy-fonts']);
    gulp.watch(settings.srcFolder + 'img/*', ['copy-img']);

});