const gulp = require('gulp'),
	  sass = require('gulp-sass');

var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var reload = browserSync.reload;

gulp.task('sass', function (){
	gulp.src('./sass/*style.scss')
        .pipe(plumber())
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(gulp.dest('./css'))
		.pipe(browserSync.stream());
})

// Watch scss AND html files, doing different things with each.
gulp.task('serve', function () {

	//Variables para que sepa que archivos refrescar
	 var files = [
    	'./css/style.css',
    	'./*.html',
        './js/*.js',
    	];
		  // Serve files from the root of this project
		browserSync.init(files, {
			server: {
				baseDir: "./"
			}
		});

});

gulp.task('default', ['sass', 'serve'], function(){
    gulp.watch("sass/**/*.scss",  ['sass']);

});
