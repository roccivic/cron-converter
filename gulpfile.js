var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var coveralls = require('gulp-coveralls');
var gulp = require('gulp');
var istanbul = require('gulp-istanbul');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var sloc = require('gulp-sloc');
var source = require('vinyl-source-stream');
var spec = require('tap-spec');
var tape = require('gulp-tape');
var uglify = require('gulp-uglify');

var allJsFiles = [
  'src/*.js',
  'test/*.js',
  'gulpfile.js'
];

gulp.task('pre-test', function() {
  return gulp.src('src/*.js')
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function() {
  return gulp.src('test/*.js')
    .pipe(tape({
      reporter: spec()
    }))
    .pipe(istanbul.writeReports());
});

gulp.task('watch', ['test'], function() {
  return nodemon({
    watch: ['src', 'test'],
    tasks: ['test'],
    verbose: false
  });
});

gulp.task('jscs', function() {
  return gulp.src(allJsFiles)
    .pipe(jscs())
    .pipe(jscs.reporter());
});

gulp.task('jshint', function() {
  return gulp.src(allJsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter());
});

gulp.task('sloc', function() {
  return gulp.src(allJsFiles)
    .pipe(sloc());
});

gulp.task('coveralls', ['test'], function() {
  return gulp.src('coverage/lcov.info')
    .pipe(coveralls());
});

gulp.task('dist', function() {
  return browserify({
      entries: 'src/cron.js',
      standalone: 'Cron',
      transform: [
        "browserify-shim"
      ]
    })
    .bundle()
    .pipe(source('cron.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('dist/'));
});

gulp.task('lint', ['jshint', 'jscs']);

gulp.task('default', ['build']);

gulp.task('travis', ['sloc', 'lint', 'coveralls']);

gulp.task('build', ['lint', 'test', 'dist']);
