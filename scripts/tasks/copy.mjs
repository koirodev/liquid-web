import fs from 'fs';

export default function (gulp, config) {
  gulp.task('copy', function () {
    const packageJson = JSON.parse(
      fs.readFileSync(`${config.root}/package.json`, 'utf8')
    );

    return gulp
      .src(`${config.root}/src/copy/**/*`, { encoding: false })
      .pipe(gulp.dest(`${config.root}/dist`))
      .on('end', () => {
        if (fs.existsSync(`${config.root}/dist/package.json`)) {
          let content = fs.readFileSync(
            `${config.root}/dist/package.json`,
            'utf8'
          );

          const keywords = JSON.stringify(
            packageJson.keywords,
            null,
            4
          ).replace(/\n\]$/, '\n  ]');

          content = content
            .replace(/@version/g, packageJson.version)
            .replace(/@description/g, packageJson.description)
            .replace(/@keywords/g, keywords)
            .replace(/@author/g, packageJson.author)
            .replace(/@homepage/g, packageJson.homepage);
          fs.writeFileSync(`${config.root}/dist/package.json`, content);
        }
      });
  });
}
