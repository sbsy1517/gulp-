var gulp = require('gulp');
const $ = require('gulp-load-plugins')();
// var jade = require('gulp-jade');
// var sass = require('gulp-sass');
// var pug = require('gulp-pug');
// var plumber = require('gulp-plumber');
// var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

gulp.task('sass', function () {
  return gulp.src('./source/sass/**/*.sass')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass().on('error', $.sass.logError))
    //編譯完成css
    
    .pipe($.postcss([autoprefixer()])) // 直接引入 autoprefixer
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('babel', () =>
  gulp.src('./source/js/**/*.js')
    .pipe($.sourcemaps.init())
    .pipe($.babel({
        presets: ['@babel/env']
    }))
    .pipe($.concat('all.js'))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./public/js'))
);

gulp.task('jade', function() {
    gulp.src('./source/*.jade')
      .pipe($.plumber())
      .pipe($.jade({
        pretty: true
      }))
      .pipe(gulp.dest('./public/'))
});

gulp.task('pug', function () {           
  return gulp.src('./source/**/*.pug')  
      .pipe($.plumber())
      .pipe($.pug({
          pretty: true              
      }))
      .pipe(gulp.dest('./public/'))  
});

gulp.task('watch', function () {
  gulp.watch('./source/sass/**/*.sass', gulp.series('sass'));
  gulp.watch('./source/**/*.pug', gulp.series('pug'));
  gulp.watch('./source/**/*.jade', gulp.series('jade'));
  gulp.watch('./source/js/**/*.js', gulp.series('babel'));
});

gulp.task('default',gulp.parallel('pug','sass','jade','babel','watch'));