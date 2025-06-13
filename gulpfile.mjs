import gulp from 'gulp';
import config from './scripts/config.mjs';

import appPath from './scripts/paths/app.mjs';
import tasksPath from './scripts/paths/tasks.mjs';

const header = `
/*
 * Liquid Web ${config.version}
 * Contemporary style and functionality - an accordion that does more.
 * https://github.com/koirodev/liquid-web
 *
 * Copyright ${new Date().getFullYear()} Vitaly Koiro
 *
 * Released under the MIT License
 *
 * Released on: ${config.date}
*/
`;

const paths = {
  tasks: tasksPath,
  app: appPath,
};

for (const taskPath of paths.tasks) {
  const task = await import(taskPath);
  task.default(gulp, config, header);
}

const defaultTasks = [
  'js:process',
  'js:process:min',
  'js:process:modules',
  'copy',
  'copy:types',
];

gulp.task('default', gulp.series('clean', gulp.parallel(...defaultTasks)));

gulp.task('dev', gulp.series('clean', gulp.parallel(...defaultTasks), 'watch'));
