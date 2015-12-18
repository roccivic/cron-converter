var gulp = require('gulp');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');

gulp.task('pre-test', function() {
  return gulp.src('src/*.js')
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function() {
  return gulp.src('test/*.js')
    .pipe(mocha())
    .pipe(istanbul.writeReports());
});

gulp.task('jscs', function() {
  return gulp.src([
      'src/*.js',
      'test/*.js',
      'gulpfile.js'
    ])
    .pipe(jscs())
    .pipe(jscs.reporter());
});

gulp.task('jshint', function() {
  return gulp.src([
      'src/*.js',
      'test/*.js',
      'gulpfile.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter());
});

gulp.task('lint', ['jshint', 'jscs']);

gulp.task('default', ['lint', 'test']);
