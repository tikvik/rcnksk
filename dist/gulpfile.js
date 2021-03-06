var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var pug = require('gulp-pug');
var data = require('gulp-data');
var fs = require('fs');
const debug = require('gulp-debug');

var argv = require('yargs').argv;
var git = require('gulp-git');
var runSequence = require('run-sequence');

// var vueComponent = require('gulp-vue-single-file-component');


function debuger() {
	return gulp
	.src('gulpfile.js')
	        .pipe(debug({title: 'unicorn:'}))
	        .pipe(gulp.dest('dist'))
}



function build() {
	return gulp
		.src('app/templates/*.pug')
		.pipe(
			data(function(file) {
				return JSON.parse(fs.readFileSync('app/data/data.json'));
			})
		)
		.pipe(pug({pretty: true}))
		.pipe(gulp.dest('dist/'));
}

function style() {
	return gulp
		.src('app/sass/**/*.sass') // Gets all files ending with .scss in app/scss
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
}
function slickStyle() {
	return gulp
		.src('app/sass/slick/*.scss') // Gets all files ending with .scss in app/scss
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('dist/slick'))
		.pipe(browserSync.stream());
}

function assets() {
	return gulp.src('app/**/*.{ttf,jpg,svg}').pipe(gulp.dest('./dist'));
}


function git_init() {
	return gulp
		console.log(argv.m);
}


function git_add() {
	return gulp
		pipe(git.add());
		console.log(argv.m);
}








function watch() {
	browserSync.init({
		server: {
			baseDir: 'dist'
		}
	});
	gulp.watch('app/sass/**/*.sass', style);
	gulp.watch('app/sass/slick/**/*.scss', slickStyle);
	gulp.watch('app/templates/**/*.pug', build);
	gulp.watch('app/**/*.pug', build);
	gulp.watch('app/**/*.{ttf,jpg,svg}', assets);
	gulp.watch('dist/*.html').on('change', browserSync.reload);
	gulp.watch('app/js/**/*.js').on('change', browserSync.reload);
	gulp.watch('app/data/**/*.json').on('change', build);
	gulp.watch('app/sass/**/*.sass', debuger);
}

// function vue() {
// 	return gulp.src('app/js/components/*.vue')
// 			.pipe(vueComponent({ /* options */ }))
// 			.pipe(gulp.dest('./dist/js/'));
// }

exports.build = build;
exports.style = style;
exports.slickStyle = slickStyle;
exports.assets = assets;
exports.watch = watch;
exports.debuger = debuger;








