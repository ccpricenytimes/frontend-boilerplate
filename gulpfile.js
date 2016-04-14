var gulp = require('gulp');
var concat = require('gulp-concat');
var postcss = require('gulp-postcss');
var debug = require('gulp-debug');
var PostCssImport = require("postcss-import");
var CssNext = require("postcss-cssnext");
var postCssNested = require('postcss-nested');
var react = require('gulp-react');
var babel = require('gulp-babel');
var htmlReplace = require('gulp-html-replace');
var connect = require('gulp-connect');


var path = {
  ENTRY_POINT: 'index.js'
  HTML: 'client/index.html',
  ALL: ['**.js', 'client/index.html'],
  JS: ['./client/**/*.js'],
  CSS: ['./client/**/*.css'],
  MINIFIED_OUT: 'build.min.js',
  DEST_SRC: 'dist/src',
  DEST_BUILD: 'dist/build',
  DEST: './dist'
};


gulp.task('default', function() {
  // place code for your default task here
  console.log('hi');
});

gulp.task('build-css', function() {
    var processors = [
        PostCssImport,
        CssNext(),
        postCssNested
    ];
   gulp.src(path.CSS)
        .pipe(debug({title: "unicorn:"}))
        .pipe(postcss(processors))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest(path.DEST));
});

gulp.task('build-js', function() {
    gulp.src(path.JS)
        .pipe(debug({title: "js-debug:"}))
        .pipe(babel())
        .pipe(react())
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(path.DEST))
});

gulp.task('transform', function(){
  gulp.src(path.JS)
    .pipe(babel())
    .pipe(react())
    .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('watch', function() {
  gulp.watch(path.HTML, ['copy']);

  var watcher  = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function () {
    watcher.bundle()
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_SRC))
      console.log('Updated');
  })
    .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_SRC));
});



gulp.task('start', function() {
    connect.server({
        root: './dist'
    });
});

gulp.task('move-html', function() {
    gulp.src(path.HTML)
        .pipe(gulp.dest(path.DEST));
});

gulp.task('build', ['build-css', 'build-js'])