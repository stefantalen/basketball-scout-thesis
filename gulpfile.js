var gulp        = require('gulp');
    concat      = require('gulp-concat');
    sass        = require('gulp-sass');
    prefix      = require('gulp-autoprefixer');
    minifyCSS   = require('gulp-minify-css');
    plumber     = require('gulp-plumber');
    sourcemaps  = require('gulp-sourcemaps');

var destinationFolder = './compiled',
    bowerFolder = './bower_components',
    sassFolder = './sass'
;

gulp.task('sass', function() {
    return gulp.src(sassFolder + '/style.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
            .pipe(sass())
        //.pipe(minifyCSS())
            .pipe(concat('style.min.css'))
            .pipe(prefix(["last 2 version"]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(destinationFolder));
});

//Watch
gulp.task('watch', function () {
  //gulp.watch(files.scripts, ['scripts']);
  gulp.watch(sassFolder + '/**/!(ie)*.scss', ['sass']);
});

gulp.task('default', ['sass']);
gulp.task('dev', ['sass', 'watch']);