var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function(){
  return gulp.src('sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

var browserSync = require('browser-sync');
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './'
    },
  })
});

gulp.task('default', ['browserSync', 'sass'], function(){
  gulp.watch('sass/*.scss', ['sass']);
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('js/**/*.js', browserSync.reload);
});

var autoprefixer = require('gulp-autoprefixer');
gulp.task('pref', function () {
  return gulp.src('css/*.css')
    .pipe(autoprefixer({
      browsers: ['last 3 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('css'));
});

var useref = require('gulp-useref');
gulp.task('con', function () {
    return gulp.src('index.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

var uglify = require('gulp-uglify');
gulp.task('minjs', function() {
  return gulp.src('dist/js/script.min.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'));
});

var cleanCSS = require('gulp-clean-css');
gulp.task('mincss', function() {
  return gulp.src('dist/css/styles.min.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css/'));
});

var del = require('del');
gulp.task('clean', function() {
  del('dist');
});

var runSequence = require('run-sequence');
gulp.task('dist', function (callback) {
  runSequence('clean',
    'sass',
    'pref',
    'con',
    ['mincss', 'minjs'],
    callback
  )
});


