var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var watch = require('gulp-watch');
var batch = require('gulp-batch');

var depStyles = [
  'bower_components/bootstrap/dist/css/bootstrap.css',
  'bower_components/bootstrap/dist/css/bootstrap-theme.css',
]

var deps = [
  'bower_components/react/react.js',
  'bower_components/react/JSXTransformer.js',
];

var app = [
  'src/**/*.js'
];

gulp.task('images', function() {
    gulp.src('assets/images/**.*')
    .pipe(gulp.dest('./dist/images'));
});

gulp.task('dep-styles', function() {
  return gulp.src(depStyles)
    .pipe(concat('deps.css'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('dep-scripts', function() {
  return gulp.src(deps)
    .pipe(concat('deps.js'))
    .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('app-scripts', function() {
  return gulp.src(app)
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('es6to5', function () {
  return gulp.src(app)
    .pipe(babel())
    // .on('error', console.error.bind(console))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('sass', function () {
  gulp.src('assets/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('assets/sass/**/*.scss', ['sass']);
});

gulp.task('watch', function () {
  gulp.watch('src/**/*.js', ['build']);
});

gulp.task('build', ['images', 'sass', 'dep-styles', 'dep-scripts', 'es6to5']);
gulp.task('default', ['build']);

gulp.task('dev', ['build', 'watch', 'sass:watch']);
