/**
 * Name: index.ts
 * Description: Export all tasks
 * Author: Ovidiu Barabula <lectii2008@gmail.com>
 * @since 1.0.0
 */

import clean from './tasks/clean';
import config from './tasks/config';
import process from './tasks/process';
import template from './tasks/template';
import watch from './tasks/watch';

export default [
  config,
  template,
  process,
  watch,
  clean,
];
