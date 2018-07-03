var gulp = require('gulp');
gulp.task('mytask', function() {
    console.log('Привет, я таск!');
});
gulp.task('copy', function () {
    gulp.src('./build/static/css/powerreact.css') // Выборка исходных файлов для обработки плагином
        .pipe(gulp.dest('e:\\OSPanel\\domains\\vladklimat.local\\frontend\\web\\css\\'));
    gulp.src('./build/static/js/powerreact.js') // Выборка исходных файлов для обработки плагином
        .pipe(gulp.dest('e:\\OSPanel\\domains\\vladklimat.local\\frontend\\web\\js\\'));
});