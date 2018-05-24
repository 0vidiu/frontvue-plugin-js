# Frontvue-Plugin-JS

[![Build Status](https://travis-ci.org/0vidiu/frontvue-plugin-js.svg?branch=master)](https://travis-ci.org/0vidiu/frontvue-plugin-js) [![codecov](https://codecov.io/gh/0vidiu/frontvue-plugin-js/branch/master/graph/badge.svg)](https://codecov.io/gh/0vidiu/frontvue-plugin-js) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## A Frontvue plugin for JavaScript boilerplate and processing
This plugin will be one of the available options to choose from when you configure a new project using Frontvue. It handles JavaScript ES6 files and comes with a boilerplate template (w.i.p). It comes with the following tasks:
* *js:config* — registers a configuration questionnaire;
* *js:template* — copies the JavaScript ES6 template;
* *js:clean* — removes the build folder;
* *js:process* — handles compiling of JS partials;
* *js:watch* — starts listeners for changes in JS partials;

## Default configuration
```js
{
  // Source files directory name
  sourceDir: 'js',

  // Directory name where the JS file(s) will be outputted
  buildDir: 'js',

  // Entry point(s)
  entrypoints: 'index.js',
}
```
