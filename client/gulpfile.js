'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');


gulp.task('scripts', function() {
    gulp.src(['js/local/**/*.js', '!js/local/front.js'])
        .pipe(concat('boilerplate.min.js'))
        .pipe(uglify({
            mangle: false
        }))
        .pipe(gulp.dest('dist'))
        .pipe(livereload())
});

// gulp.task('front', function() {
//     gulp.src([
//             'js/local/front.js',
//             'js/local/services/generalSvc.js',
//             'js/local/services/mainSvc.js',
//             'js/local/controllers/auth.js',
//             'js/local/controllers/frontCtrl.js'
//         ])
//         .pipe(concat('tabunganq-front.min.js'))
//         .pipe(uglify({
//             mangle: false
//         }))
//         .pipe(gulp.dest('dist'))
//         .pipe(livereload())
// });

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('js/local/**/*.js', ['scripts']);
});

gulp.task('default', ['scripts', 'watch']);
