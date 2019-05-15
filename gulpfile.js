const { dest, series, parallel, src, task, watch } = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const header = require('gulp-header');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify');
const pkg = require('./package.json');

// Set the banner content
var banner = ['/*!\n',
  ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license %> (https://github.com/BlackrockDigital/<%= pkg.name %>/blob/master/LICENSE)\n',
  ' */\n',
  ''
].join('');

// Copy third party libraries from /node_modules into /vendor
function vendor(done) {
  // Bootstrap
  src([
      './node_modules/bootstrap/dist/**/*',
      '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
      '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
    ])
    .pipe(dest('./vendor/bootstrap'));

  // Font Awesome
  src([
      './node_modules/font-awesome/**/*',
      '!./node_modules/font-awesome/{less,less/*}',
      '!./node_modules/font-awesome/{scss,scss/*}',
      '!./node_modules/font-awesome/.*',
      '!./node_modules/font-awesome/*.{txt,json,md}'
    ])
    .pipe(dest('./vendor/font-awesome'));

  // jQuery
  src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(dest('./vendor/jquery'));

  // jQuery Easing
  src([
      './node_modules/jquery.easing/*.js'
    ])
    .pipe(dest('./vendor/jquery-easing'));

  // Simple Line Icons
  src([
      './node_modules/simple-line-icons/fonts/**',
    ])
    .pipe(dest('./vendor/simple-line-icons/fonts'));

  src([
      './node_modules/simple-line-icons/css/**',
    ])
    .pipe(dest('./vendor/simple-line-icons/css'));

	done();
}
task('vendor', vendor);

// Compile SCSS
function compileCss() {
  return src('./scss/**/*.scss')
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(dest('./css'))
}
task('css:compile', compileCss);

// Minify CSS
function minifyCss() {
  return src([
      './css/*.css',
      '!./css/*.min.css'
    ])
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(dest('./css'))
    .pipe(browserSync.stream());
}
task('css:minify', minifyCss);

// CSS
task('css', series(compileCss, minifyCss));

// Minify JavaScript
function minifyJs() {
  return src([
      './js/*.js',
      '!./js/*.min.js'
    ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(dest('./js'))
    .pipe(browserSync.stream());
}
task('js:minify', minifyJs);

// JS
task('js', minifyJs);

// Default task
task('default', parallel(minifyCss, minifyJs, vendor));

// Configure the browserSync task
function startBrowserSync() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
}
task('browserSync', startBrowserSync);

// Dev task
function devWatch() {
  watch('./scss/*.scss', ['css']);
  watch('./js/*.js', ['js']);
  watch('./*.html', browserSync.reload);
}
task('dev', series(parallel(minifyJs, minifyCss), startBrowserSync, devWatch));
