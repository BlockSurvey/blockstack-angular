
## Introduction

We are going to try Blockstack Authentication and Gaia Storage examples with Angular Framework. 
You can use this as base tempalte to build your own product.

## Angular setup

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.4.

Reference - Setup angular CLI and base project. (https://angular.io/cli)

## Blockstack setup 

Install blockstack npm module by executing below command,
npm install blockstack

After install, update browser.js for blockstack to work with angular,

Go to,
node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/browser.js

Find by,
node: false,

Replace with, 
node: { crypto: true, stream: true },

References for other framework - 
react framework example - https://docs.blockstack.org/browser/hello-blockstack.html
vue framework example - https://docs.blockstack.org/browser/todo-list.html


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
