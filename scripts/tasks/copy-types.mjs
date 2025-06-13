/**
 * Task for copying TypeScript declaration files to dist
 */
export default function (gulp, config) {
  gulp.task('copy:types', function () {
    return gulp
      .src(`${config.root}/src/types/**/*.d.ts`)
      .pipe(gulp.dest(`${config.root}/dist/types`));
  });
}
