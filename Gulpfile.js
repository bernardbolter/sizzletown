"use strict";

var gulp = require('gulp'),
	gutil = require('gulp-util'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps'),
	copy = require('gulp-copy'),
	clean = require('gulp-clean'),
	watch = require('gulp-watch'),
	connect = require('gulp-connect')

var path = {
		JS: [
			'assets/js/vendor/*.js',
			'assets/js/*.js'
		],
		HTML: 'assets/index.html',
		SCSS: 'assets/scss/style.scss',
		FAVICON: 'assets/gfx/favicon.ico',
		IMG: [
			'assets/gfx/*.jpg',
			'assets/gfx/*.png'
		],
		FONTS: [
			'assets/fonts/*.eot',
			'assets/fonts/*.svg',
			'assets/fonts/*.ttf',
			'assets/fonts/*.woff'
		]
};

gulp.task('scss-in', function() {
	return gulp.src(path.SCSS)
		.pipe(sourcemaps.init())
		.pipe(sass({style: 'expanded', lineNumbers : true }).on('error', sass.logError))
		.pipe(autoprefixer('last 2 versions', 'safari 5', 'ie8', 'ie9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(concat('style.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('builds/inbound/css'))
		.pipe(connect.reload());
});

gulp.task('scss-out', function() {
	return gulp.src(path.SCSS)
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(autoprefixer('last 2 versions', 'safari 5', 'ie8', 'ie9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(concat('style.css'))
		.pipe(gulp.dest('builds/outbound/css'));
});

gulp.task('js-in', function() {
	return gulp.src(path.JS)
		.pipe(sourcemaps.write())
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest('builds/inbound/js'))
		.pipe(connect.reload());
});

gulp.task('js-out', function() {
	return gulp.src(path.JS)
		.pipe(uglify())
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest('builds/outbound/js'));
});

gulp.task('clean-in', function() {
	return gulp.src('builds/inbound', {read: false})
		.pipe(clean());
});

gulp.task('clean-out', function() {
	return gulp.src('builds/outbound', {read: false})
		.pipe(clean());
});

gulp.task('img-in', function() {
	gulp.src(path.IMG)
	 .pipe(gulp.dest('builds/inbound/img'));
});

gulp.task('html-in', function() {
	gulp.src(path.HTML)
	 .pipe(gulp.dest('builds/inbound'));
});

gulp.task('img-out', function() {
	gulp.src(path.IMG)
	 .pipe(gulp.dest('builds/outbound/img'));
});

gulp.task('html-out', function() {
	gulp.src(path.HTML)
	 .pipe(gulp.dest('builds/outbound'));
});

gulp.task('fav-in', function() {
	gulp.src(path.FAVICON)
		.pipe(gulp.dest('builds/inbound'));
});

gulp.task('fav-out', function() {
	gulp.src(path.FAVICON)
		.pipe(gulp.dest('builds/outbound'));
});

gulp.task('connect', function() {
	connect.server({
		root: 'builds/inbound',
		livereload: true,
		port: 8011
	});
});

gulp.task('watch', function() {
	gulp.watch(path.SCSS, ['sass-in']);
	gulp.watch(path.JS, ['js-in']);
	gulp.watch(path.JADE), ['jade-in'];
});

gulp.task('test-outbound', function() {
	connect.server({
		root: 'builds/outbound',
		livereload: true,
		port: 8012
	});
});

gulp.task('default', ['scss-in', 'js-in', 'html-in', 'img-in', 'fav-in', 'connect', 'watch']);

gulp.task('outbound', ['clean-out', 'scss-out', 'js-out', 'html-out', 'img-out', 'fav-out']); 