/**
 * Name: template.ts
 * Description: Copy JavaScript partials template
 * Author: Ovidiu Barabula <lectii2008@gmail.com>
 * @since 1.0.0
 */

import chalk from 'chalk';
import * as plumber from 'gulp-plumber';
import * as path from 'path';
import { existsAsync } from '../util/functions';


// Custom messages
const STRINGS = {
  COPYING_TEMPLATE: 'Copying JavaScript template files to',
  TEMPLATE_EXISTS: 'Source directory already exists',
};

// Custom error messages
const ERRORS = {
  COPY_FAILED: 'Copying JavaScript template files failed',
};


/**
 * Main task function
 * @param done Async callback function
 * @param pluginProvider Plugin utilities provider
 */
async function taskFn(done: any, { logger, config, paths, gulp }: any = {}) {
  // TODO: Find an alternative to get to the plugin's files
  const templateDir: string = path.join(paths.cwd, '/node_modules/@frontvue/plugin-js/template');
  const source: string = path.join(templateDir, '/**/*');
  const dest: string = path.join(paths.sourceDir, await config.get('sourceDir'));

  // Perform a directory check to avoid overwriting existing files
  let isCopied: boolean = false;
  try {
    isCopied = await existsAsync(dest);
  } catch (error) {
    return Promise.reject(new Error(`${ERRORS.COPY_FAILED} ${error.message}`));
  }

  // If the template files are already copied, or folder already exists, exit
  if (isCopied) {
    logger.debug(STRINGS.TEMPLATE_EXISTS);
    return Promise.resolve();
  }

  // Copy template files to project source directory
  logger.debug(`${STRINGS.COPYING_TEMPLATE} ${chalk.cyan.bold(dest)}`);
  return new Promise((resolve, reject) => {
    gulp.src(source)
      // Initialize gulp-plumber to prevent process termination in case of error
      .pipe(plumber({ errorHandler: error => logger.fatal(error.message) }))
      .on('error', (error: any) => {
        logger.fatal(error.message);
        reject();
      })
      .pipe(gulp.dest(dest))
      .on('end', resolve);
  });
}


/**
 * Task export object
 */
export default {
  // Meta description
  description: 'Copy JavaScript template',
  hook: 'template',
  name: 'js:template',
  taskFn,
};
