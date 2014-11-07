var gulp        = require('gulp');
    concat      = require('gulp-concat');
    sass        = require('gulp-ruby-sass');
    prefix      = require('gulp-autoprefixer');
    minifyCSS   = require('gulp-minify-css');
    plumber     = require('gulp-plumber');

var destinationFolder = './compiled',
    bowerFolder = './bower_components',
    sassFolder = './sass'
;

gulp.task('sass', function() {
    return gulp.src(sassFolder + '/style.scss')
        .pipe(plumber())
        .pipe(sass({sourcemap:false}))
        //.pipe(minifyCSS())
        .pipe(concat('style.min.css'))
        .pipe(prefix(["last 2 version"]))
        .pipe(gulp.dest(destinationFolder));
});

gulp.task('default', ['sass']);
