import gulp from 'gulp';
import sass from 'gulp-sass';
import concat from 'gulp-concat';
import babel from 'gulp-babel';
import watch from 'gulp-watch';
import notify from 'gulp-notify';

const dirs = {
  bower: 'app/bower',
  src: 'app/src',
  dist: 'app/dist'
};

var depStyles = [
  `${dirs.bower}/bootstrap/dist/css/bootstrap.css`,
  `${dirs.bower}/bootstrap/dist/css/bootstrap-theme.css`,
]

var deps = [
  `${dirs.bower}/react/react.js`,
  `${dirs.bower}/react/JSXTransformer.js`
];

var app = [
  `${dirs.src}/**/*.js`
];

gulp.task('images', () => {
    gulp.src('app/assets/images/**.*')
    .pipe(gulp.dest(`${dirs.dist}/images`));
});

gulp.task('dep-styles', () => {
  return gulp.src(depStyles)
    .pipe(concat('deps.css'))
    .pipe(gulp.dest(`${dirs.dist}/css`));
});

gulp.task('dep-scripts', () => {
  return gulp.src(deps)
    .pipe(concat('deps.js'))
    .pipe(gulp.dest(`${dirs.dist}/scripts`));
});

gulp.task('app-scripts', () => {
  return gulp.src(app)
    .pipe(concat('app.js'))
    .pipe(gulp.dest(`${dirs.dist}/scripts`));
});

gulp.task('babel', () => {
  return gulp.src(app)
    .pipe(babel())
    .on('error', notify.onError('<%= error.message %>'))
    .on('error', (e) => {
      console.log(`${e.name} ${e.message}`);
      console.log(e.codeFrame);
      // console.log(e.stack);
      this.emit('end');
    })
    .pipe(concat('app.js'))
    .pipe(gulp.dest(`${dirs.dist}/scripts`));
});

gulp.task('sass', () => {
  gulp.src('app/assets/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest(`${dirs.dist}/css`));
});

gulp.task('sass:watch', () => {
  gulp.watch('app/assets/sass/**/*.scss', ['sass']);
});

gulp.task('watch', () => {
  gulp.watch(`${dirs.src}/**/*.js`, ['build']);
});

gulp.task('dev', ['build', 'watch', 'sass:watch']);
gulp.task('build', ['images', 'sass', 'dep-styles', 'dep-scripts', 'babel']);

gulp.task('default', ['build']);
