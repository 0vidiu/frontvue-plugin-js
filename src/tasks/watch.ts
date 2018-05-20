/**
 * Name: watch.ts
 * Description: Watch for changes in JavaScript partials
 * Author: Ovidiu Barabula <lectii2008@gmail.com>
 * @since 1.0.0
 */

import chalk from 'chalk';
import * as path from 'path';
import { existsAsync } from '../util/functions';


// Custom error messages
const ERRORS = {
  NO_SOURCE: 'JavaScript source directory not found',
};


/**
 * Main task function
 * @param done Async callback function
 * @param pluginProvider Plugin utilities provider
 */
async function taskFn(done: any, { logger, config, paths, gulp }: any = {}) {
  const { sourceDir } = await config.get();
  // JavaScript source directory path
  const sourcePath = path.join(paths.sourceDir, sourceDir);

  if (!await existsAsync(sourcePath)) {
    return Promise.reject(new Error(`${ERRORS.NO_SOURCE} ${chalk.cyan(sourcePath)}`));
  }

  // Watch JavaScript partials and run js:process
  logger.debug('JavaScript watcher started\u2026');
  return new Promise(() =>
    gulp.watch(`${sourcePath}/**/**.js`, gulp.series('js:process')));
}

/**
 * Task export object
 */
export default {
  // Meta description
  description: 'Watch for changes in JavaScript partials',
  hook: 'watch',
  name: 'js:watch',
  taskFn,
};
