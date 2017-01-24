var gulp = require('gulp');
var sass = require('gulp-sass');
var bs = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');
var minify = require('gulp-minify');
var rename = require('gulp-rename');
// Static server
gulp.task('browser-sync', function() {
    bs.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('default',["sass","watch"]); 

gulp.task('sass', function () {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(rename({
			suffix: '.min'
		}))
        .pipe(gulp.dest('./dist/css'))
    .pipe(bs.stream());
});
 
gulp.task('css', function () {
	return gulp.src('./src/css/**/*.css')
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('./dist/css'))
		.pipe(bs.stream());
});

gulp.task('js', function() {
  gulp.src('src/js/**/*.js')
    .pipe(minify({
        ext:{
            min:'.min.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '.min.js']
    }))
    .pipe(gulp.dest('dist/js/'))
});

gulp.task('sass:watch', function () {
    gulp.watch('./src/scss/**/*.scss', ['sass']);
});

gulp.task('watch',['browser-sync'], function() {
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/css/**/*.css', ['css']);
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch("*.html").on('change', bs.reload);
    gulp.watch(".js/*.js").on('change', bs.reload);
    gulp.watch("css/*.css").on('change', bs.reload);
});