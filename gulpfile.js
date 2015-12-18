var gulp = require('gulp');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');

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
    .pipe(mocha())
    .pipe(istanbul.writeReports());
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

gulp.task('lint', ['jshint', 'jscs']);

gulp.task('default', ['lint', 'test']);
