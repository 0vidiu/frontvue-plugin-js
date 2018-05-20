# Frontvue-Plugin-Pug

[![Build Status](https://travis-ci.org/0vidiu/frontvue-plugin-pug.svg?branch=master)](https://travis-ci.org/0vidiu/frontvue-plugin-pug) [![codecov](https://codecov.io/gh/0vidiu/frontvue-plugin-pug/branch/master/graph/badge.svg)](https://codecov.io/gh/0vidiu/frontvue-plugin-pug) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## A Frontvue plugin for Pug boilerplate and processing
This plugin will be one of the available options to choose from when you configure a new project using Frontvue. It handles Pug files and comes with a boilerplate template of Pug partials. It comes with the following tasks:
* *pug:config* — registers a configuration questionnaire;
* *pug:template* — copies the Pug template;
* *pug:clean* — removes the build folder;
* *pug:process* — handles compiling of Pug partials;
* *pug:watch* — starts listeners for changes in Pug partials;

## Default configuration
```js
{
  // Source files directory name
  sourceDir: 'pug',

  // Directory name where the HTML file(s) will be outputted
  buildDir: 'html'
}
```
