/**
 * Name: functions.ts
 * Description: Collection of utility functions
 * Author: Ovidiu Barabula <lectii2008@gmail.com>
 * @since 1.0.0
 */

import { exists } from 'fs';


/**
 * Check if file or directory exists
 * @param testpath File or directory path to be tested
 */
export function existsAsync(testpath: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    try {
      exists(testpath, resolve);
    } catch (error) {
      reject(error);
    }
  });
}
