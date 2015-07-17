var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');


gulp.task('default', ['styles']);

gulp.task('styles:copy-css', function(){
	return gulp.src('./web/stylesheets/src/**/*.css')
		.pipe(gulp.dest('./web/stylesheets/build'));
});

gulp.task('styles:build-scss', ['styles:copy-css'], function() {
	return gulp.src('./web/stylesheets/src/**/*.scss')
		.pipe(plumber())
		.pipe(sass({
			outputStyle: 'expanded'
		}))
		.pipe(autoprefixer({
			browsers: ['> 1%', 'last 2 versions', 'ie >= 8'],
			cascade: false
		}))
		.pipe(gulp.dest('./web/stylesheets/build'));
});

gulp.task('styles', ['styles:build-scss']);