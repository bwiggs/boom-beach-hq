var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var notify = require("gulp-notify");

var depStyles = [
  'app/bower_components/bootstrap/dist/css/bootstrap.css',
  'app/bower_components/bootstrap/dist/css/bootstrap-theme.css',
]

var deps = [
  'app/bower_components/react/react.js',
  'app/bower_components/react/JSXTransformer.js',
];

var app = [
  'app/src/**/*.js'
];

gulp.task('images', function() {
    gulp.src('app/assets/images/**.*')
    .pipe(gulp.dest('app/dist/images'));
});

gulp.task('dep-styles', function() {
  return gulp.src(depStyles)
    .pipe(concat('deps.css'))
    .pipe(gulp.dest('app/dist/css'));
});

gulp.task('dep-scripts', function() {
  return gulp.src(deps)
    .pipe(concat('deps.js'))
    .pipe(gulp.dest('app/dist/scripts'));
});

gulp.task('app-scripts', function() {
  return gulp.src(app)
    .pipe(concat('app.js'))
    .pipe(gulp.dest('app/dist/scripts'));
});

gulp.task('es6to5', function () {
  return gulp.src(app)
    .pipe(babel())
    .on('error', notify.onError('<%= error.message %>'))
    .on('error', function(e) {
      console.log(`${e.name} ${e.message}`);
      console.log(e.codeFrame);
      // console.log(e.stack);
      this.emit('end');
    })
    .pipe(concat('app.js'))
    .pipe(gulp.dest('app/dist/scripts'));
});

gulp.task('sass', function () {
  gulp.src('app/assets/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('app/dist/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('app/assets/sass/**/*.scss', ['sass']);
});

gulp.task('watch', function () {
  gulp.watch('app/src/**/*.js', ['build']);
});

gulp.task('dev', ['build', 'watch', 'sass:watch']);
gulp.task('build', ['images', 'sass', 'dep-styles', 'dep-scripts', 'es6to5']);

gulp.task('default', ['build']);
