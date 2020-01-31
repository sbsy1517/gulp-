var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
 
gulp.task('sass', function () {
  return gulp.src('./source/sass/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});
 
gulp.task('watch', function () {
    return gulp.watch('./srouce/sass/**/*.sass', gulp.series('sass'));
});

gulp.task('sass-watch', function () {
     gulp.watch('./source/sass/**/*.sass', ['sass']); 
});

gulp.task('jade', function() {
    gulp.src('./source/*.jade')
      .pipe(jade({
        pretty: true
      }))
      .pipe(gulp.dest('./public/'))
});

// gulp.task('default',['jade','sass','watch']);