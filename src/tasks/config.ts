/**
 * Name: config.ts
 * Description: Config JavaScript plugin
 * Author: Ovidiu Barabula <lectii2008@gmail.com>
 * @since 1.0.0
 */

import chalk from 'chalk';
import * as plumber from 'gulp-plumber';
import * as path from 'path';
import configDefaults from '../config/config-defaults';
import configQuestionnaire from '../config/config-questionnaire';
import dependencies from '../config/dependencies';
import { existsAsync } from '../util/functions';


// Custom messages
const STRINGS = {
  CONFIG_EXISTS: 'Config file already exists',
  COPYING_CONFIG: 'Copying config files',
};


// Custom error messages
const ERRORS = {
  COPY_FAILED: 'Copying config file failed',
};


/**
 * Main task function
 * @param done Async callback function
 * @param pluginProvider Plugin utilities provider
 */
async function taskFn(done: any, { logger, paths, gulp }: any = {}): Promise<any> {
  const configFilenames: string[] = [
    '.eslintrc',
    '.babelrc',
  ];

  const templateDir: string = path.join(paths.cwd, '/node_modules/@frontvue/plugin-js/template');
  const dest: string = path.join(paths.cwd);

  // Perform a directory check to avoid overwriting existing files
  let areCopied: boolean[] = [];
  try {
    for (const file of configFilenames) {
      areCopied = [...areCopied, await existsAsync(path.join(dest, file))];
    }
  } catch (error) {
    return Promise.reject(new Error(`${ERRORS.COPY_FAILED} ${error.message}`));
  }

  // If the config file are already copied, or folder already exists, exit
  if (areCopied.every(item => item)) {
    logger.debug(STRINGS.CONFIG_EXISTS);
    return Promise.resolve();
  }

  const configSourcePaths = configFilenames.map(filename => path.join(templateDir, filename));

  logger.debug(
    `${STRINGS.COPYING_CONFIG} ${chalk.cyan.bold(configFilenames.join(', '))} to ${chalk.cyan.bold(dest)}`,
  );
  return new Promise((resolve, reject) => {
    gulp.src(configSourcePaths, { dot: true })
      // Initialize gulp-plumber to prevent process termination in case of error
      .pipe(plumber({ errorHandler: error => logger.fatal(error.message) }))
      .on('error', (error: any) => {
        logger.fatal(error.message);
        reject();
      })
      .pipe(plumber.stop())
      .pipe(gulp.dest(dest))
      .on('end', resolve);
  });
}


/**
 * Task export object
 */
export default {
  // Meta description
  description: 'Configure JS plugin',
  hook: 'config',
  name: 'js:config',
  taskFn,

  // Configuration
  configDefaults,
  configQuestionnaire,

  // Dependencies manifest
  dependencies,
};
