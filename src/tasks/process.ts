/**
 * Name: process.ts
 * Description: Process JavaScript partials
 * Author: Ovidiu Barabula <lectii2008@gmail.com>
 * @since 1.0.0
 */

import chalk from 'chalk';
import * as plumber from 'gulp-plumber';
import * as path from 'path';
import * as webpack from 'webpack';
import * as webpackStream from 'webpack-stream';
import { existsAsync } from '../util/functions';


export interface WebpackConfiguration {
  entry?: object | string | any[];
  mode?: string;
  module?: object;
  optimization?: object;
  output?: object;
  plugins: any[];
  resolve?: object;
  resolveLoader?: object;
}


// Custom error messages
const ERRORS = {
  NO_ENTRYPOINT: 'Entrypoint file not found',
  NO_ENTRYPOINTS: 'No entrypoint source files were found',
  NO_ENTRYPOINTS_CONFIGURED: 'There are no entrypoint files configured. Try running the <config> tasks',
  NO_SOURCE_DIR: 'Make sure the JavaScript template files have been copied by running the <template> tasks',
};


/**
 * Check if main entry point file exists
 * @param filepath Entry point path
 * @param logger Logger instance
 */
async function checkEntrypoint(filepath: string, logger: any): Promise<boolean> {
  // Check if entry point file exists
  let hasEntryPoint: boolean = false;
  try {
    hasEntryPoint = await existsAsync(filepath);
  } catch (error) {
    logger.fatal(error.message);
    return false;
  }

  // Log out error message if entry point not found
  if (!hasEntryPoint) {
    logger.warn(`${ERRORS.NO_ENTRYPOINT} ${chalk.bold.cyan(filepath)}`);
    return false;
  }

  return hasEntryPoint;
}


/**
 * Main task function
 * @param done Async callback function
 * @param pluginProvider Plugin utilities provider
 */
async function taskFn(done: any, { logger, config, paths, env, gulp }: any = {}): Promise<any> {
  // Variable for checking if node environment is set to 'development'
  const isDevelopment = env && env === 'development';

  // TODO: Cache config related variables to run only one time
  const { buildDir, sourceDir, entrypoints } = await config.get();

  // JavaScript source directory
  const sourceDirPath: string = path.join(paths.sourceDir, sourceDir);
  // Compiled HTML path
  const dest: string = path.join(paths.buildDir, buildDir);


  // Check if any entrypoints are configured
  if (typeof entrypoints === 'undefined' || entrypoints === '') {
    return Promise.reject(new Error(`${ERRORS.NO_ENTRYPOINTS_CONFIGURED}`));
  }


  // Build array of entrypoint file paths
  const entrypointsArray: string[] = entrypoints.split(',').map((entrypoint: string) =>
    path.join(sourceDirPath, entrypoint));


  // Array to store if entrypoint file(s) exist(s)
  const entrypointsExist: boolean[] = [];
  for (const entrypointPath of entrypointsArray) {
    try {
      entrypointsExist.push(await checkEntrypoint(entrypointPath, logger));
    } catch (error) {
      return Promise.reject(new Error(`${ERRORS.NO_ENTRYPOINT} ${chalk.bold.cyan(entrypointPath)}`));
    }
  }

  // Check if at least some entrypoint files exist
  // If not, throw an error and alert the user
  if (entrypointsExist.every((exists: boolean) => !exists)) {
    return Promise.reject(new Error(`${ERRORS.NO_ENTRYPOINTS}`));
  }

  // Create new array of existing entrypoint filepaths
  // This will be fed to the gulp.src() method
  const validEntrypoints: string[] = entrypointsArray.filter((item: string, index: number) =>
    entrypointsExist[index]);

  // Make an object with the following schema
  // `{ <entrypointname>: '../entrypointpath/entrypointname.ext' }`
  const entry = entrypoints.split(',').reduce(
    (entries: { [key: string]: string }, item: string, index: number, array: any[]) => {
      const name = item.split('.')[0];

      if (entrypointsExist[index]) {
        return { ...entries, ...{ [name]: entrypointsArray[index] } };
      }

      return entries;
    }, {});

  const webpackConfig: WebpackConfiguration = {
    mode: env,

    entry,

    // Output file configuration
    output: {
      filename: '[name].js',
      globalObject: 'this',
      libraryExport: 'default',
      libraryTarget: 'umd',
    },

    // Configure loaders
    module: {
      rules: [
        // JavaScript files
        {
          exclude: /node_modules/,
          test: /\.js$/,
          use: [
            { loader: 'babel-loader' },
            { loader: 'eslint-loader' },
          ],
        },
      ],
    },

    // Modules resolve strategy
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.js',
      },
      extensions: [' ', '.js'],
      modules: [
        path.join(paths.cwd, 'node_modules'),
      ],
    },
    resolveLoader: {
      modules: [
        path.join(paths.cwd, 'node_modules'),
      ],
    },

    optimization: {
      // All dependencies will be placed in separate file vendor.js
      splitChunks: {
        cacheGroups: {
          commons: {
            chunks: 'initial',
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
          },
        },
      },

      // Enable file compression in 'production' mode
      minimize: !isDevelopment,
    },

    plugins: [],
  };

  // Enable source maps only in 'development' mode
  // if (isDevelopment) {
  if (!isDevelopment) {
    webpackConfig.plugins = [...webpackConfig.plugins,
      // Enable source maps
      new webpack.SourceMapDevToolPlugin({
        exclude: /vendor\.js/,
        filename: '[name].js.map',
      }),
    ];
  }

  return new Promise((resolve, reject) => {
    // Set the source path and filter unchanged files
    gulp.src(validEntrypoints, { since: gulp.lastRun(taskFn) })
      // Initialize gulp-plumber to prevent process termination in case of error
      .pipe(plumber({ errorHandler: error => logger.fatal(error.message) }))
      // Pipe files to webpack
      .pipe(webpackStream(webpackConfig, webpack))
      .pipe(plumber.stop())
      // Catch errors
      .on('error', (error: any) => {
        logger.fatal(error.message);
        reject();
      })
      // Output compiled JavaScript to file
      .pipe(gulp.dest(dest))
      // Resolve the promise when task finishes
      .on('end', resolve);
  });
}


/**
 * Task export object
 */
export default {
  description: 'Process JavaScript partials',
  hook: 'process',
  name: 'js:process',
  taskFn,
};
