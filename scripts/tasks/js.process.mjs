import sourcemaps from 'gulp-sourcemaps';
import header from 'gulp-header';
import rename from 'gulp-rename';
import esbuild from 'gulp-esbuild';

export default function (gulp, config, banner) {
  function processJs(isMinified = false) {
    const srcGlobs = [
      `${config.root}/src/**/*.mjs`,
      `!${config.root}/src/core/**/*`,
      `!${config.root}/src/modules/**/*`,
      `!${config.root}/src/utils/**/*`,
      `!${config.root}/src/vue/**/*`,
      `!${config.root}/src/react/**/*`,
    ];

    return gulp
      .src(srcGlobs)
      .pipe(sourcemaps.init())
      .pipe(
        esbuild({
          entryPoints: srcGlobs,
          bundle: true,
          format: 'iife',
          globalName: 'LiquidWeb',
          minify: isMinified,
          loader: { '.mjs': 'js' },
          banner: {
            js: '(() => {',
          },
          footer: {
            js: 'window.LiquidWeb = LiquidWeb.default || LiquidWeb; })();',
          },
        })
      )
      .pipe(
        rename({
          suffix: isMinified ? '.min' : '',
          extname: '.js',
        })
      )
      .pipe(header(banner))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(`${config.root}/dist`));
  }

  function processModules() {
    return gulp
      .src(`${config.root}/src/**/*.mjs`)
      .pipe(header(banner))
      .pipe(gulp.dest(`${config.root}/dist`));
  }

  gulp.task('js:process', () => processJs(false));
  gulp.task('js:process:min', () => processJs(true));
  gulp.task('js:process:modules', () => processModules());
}
