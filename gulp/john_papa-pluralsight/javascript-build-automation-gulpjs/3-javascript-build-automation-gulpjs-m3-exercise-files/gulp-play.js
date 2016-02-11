/*jshint node:true*/
//var args = require('yargs').argv;
//var config = require('./gulp.config')();




        var gulp = require('gulp');




//var $ = require('gulp-load-plugins')({lazy: true});


        var jshint = require('gulp-jshint');
        var jscs = require('gulp-jscs');
        var concat = require('gulp-concat');
        var uglify = require('gulp-uglify');


        gulp.task('jshint', function() {
            return gulp
                .src('./src/**/*.js')
                .pipe(jshint());
        });

gulp.task('jscs', function() {
    return gulp
        .src('./src/**/*.js')
        .pipe(jscs());
});

        gulp.task('js', function() {
            return gulp
                .src('./src/**/*.js')
                .pipe(concat('all.js'))
                .pipe(uglify())
                .pipe(gulp.dest('./build/'));
        });

    gulp.task('js', ['jscs', 'jshint'], function() {
        return gulp
            .src('./src/**/*.js')
            .pipe(concat('all.js'))
            .pipe(uglify())
            .pipe(gulp.dest('./build/'));
    });

gulp.task('js', function() {
    return gulp
        .src('**/*.js', '!**/*.js',
             {base: './src/'})
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/'));
});

gulp.task('lint-watcher', function() {
    gulp.watch('./src/**/*.js', [
        'jshint',
        'jscs'
    ]);
});

    gulp.task('lint-watcher', function() {
        gulp.watch('./src/**/*.less', function(event) {
            console.log('watched event ' + event.type +
                        ' for ' + event.path);
        });
    });


// Writes ./src/app/customer/customer.js
// to ./build/app/customer/customer.js



    gulp.task('min1', function() {
        return gulp
            .src('./src/**/*.js', {base: './src/'})
            .pipe(uglify())
            .pipe(gulp.dest('./build/'));
    });



    gulp.task('min2', function() {
        return gulp
            .src('./src/**/*.js') 
            .pipe(uglify())
            .pipe(gulp.dest('./build/'));
    });

// base defaults to ./src/
// Writes ./src/app/customer/customer.js
// to ./build/app/customer/customer.js





        gulp.task('hello-world', function() {
            console.log('Our first gulp task!');
        });








