import { deleteAsync } from 'del';

export default function (gulp, config) {
  gulp.task('clean', async function () {
    return deleteAsync([`${config.root}/dist/**/*`], { force: true });
  });
}
