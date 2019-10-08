# ninegag

[![Build Status](https://travis-ci.org/mblonyox/ninegag.svg?branch=master)](https://travis-ci.org/mblonyox/ninegag)
![ninegag version](https://img.shields.io/github/package-json/v/mblonyox/ninegag)
![Vue dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/mblonyox/ninegag/vue?color=green)
![Typescript dependency version](https://img.shields.io/github/package-json/dependency-version/mblonyox/ninegag/dev/typescript)

Because the nature of our office internet provider which block access to 9gag, we decide to make a clone using a PHP backend as a mirror access to the API. Access to the CDN content is not blocked, so we don't need to mirror them.

Currently using Vue 2.x with TypeScript. The `/src` have been ejected from vue-cli 2.x to 3.x and then changed to Typescript.

## Requirements
- node 8.9 or above
- yarn package manager

## Project setup

### Clone the repository
```cmd
git clone https://github.com/mblonyox/ninegag.git
cd ninegag
```

### Install the dependencies
```cmd
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
Currently there aren't any unit test written at the momment.
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

---
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
