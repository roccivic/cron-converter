var gulp = require('gulp');
var coveralls = require('gulp-coveralls');
var istanbul = require('gulp-istanbul');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');

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

gulp.task('coveralls', ['test'], function() {
  return gulp.src('coverage/lcov.info')
    .pipe(coveralls());
});

gulp.task('lint', ['jshint', 'jscs']);

gulp.task('default', ['lint', 'test']);

gulp.task('travis', ['lint', 'coveralls']);
