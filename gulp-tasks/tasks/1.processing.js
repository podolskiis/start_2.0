var
  fs              = require('fs'),
  wiredep         = require('wiredep').stream,
  browserSync     = require('browser-sync'),
  reload          = browserSync.reload,
  gulp            = require('gulp'),
  sass            = require('gulp-sass'),
  rename          = require("gulp-rename"),
  autoprefixer    = require('gulp-autoprefixer'),
  gcmq            = require('gulp-group-css-media-queries'),
  pug             = require('gulp-pug'),
  plumber         = require('gulp-plumber'),
  config          = require('../config');

/* PROCESSING
 ********************************************************/

// Sass
gulp.task('sass', function () {
  return gulp.src(config.path.app.sass.src)
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['last 25 versions'] }))
    .pipe(gcmq())
    .pipe(rename(config.path.app.sass.rename))
    .pipe(gulp.dest(config.path.app.sass.dest))
    .pipe(reload({ stream: true }))
});

// Pug
gulp.task('pug', function () {
  var YOUR_LOCALS = config.path.app.pug.json;
  return gulp.src(config.path.app.pug.src)
    .pipe(plumber())
    .pipe(pug({
      locals: JSON.parse(fs.readFileSync(YOUR_LOCALS, 'utf-8')),
      pretty: true
    }))
    .pipe(gulp.dest(config.path.app.pug.dest))
    .pipe(reload({ stream: true }))
});

// BowerWiredep
gulp.task('bower', function () {
  return gulp.src(config.path.app.bower.src)
    .pipe(wiredep({ ignorePath: /^(\.\.\/)*\.\./ }))
    .pipe(gulp.dest(config.path.app.bower.dest))
});

// BrowserSync
gulp.task('serve', ['bower','pug','sass'], function() {
  browserSync.init({
    server: {baseDir: config.path.app.home},
    notify: false
  })
});

/* WATCH
 ********************************************************/
gulp.task('watch', function() {
  gulp.watch(config.path.app.sass.watch, ['sass']);
  gulp.watch(config.path.app.pug.watch, ['pug']);
  gulp.watch(config.path.app.bower.watch, ['bower']);
  gulp.watch(config.path.app.js.watch).on('change', reload);
});
// combination tasks
gulp.task('default', ['serve','watch']);
