# Chat App

This is a chat app built using Socket.io and to run in NodeJS.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

**Git:**
To clone this project to a local repository, it is required using [Git](https://git-scm.com/). Follow instructions provided [here](https://git-scm.com/downloads) to install and configure Git.

**NPM & NodeJS:**    
To develop this project, it is required installing and running [NPM](https://www.npmjs.com/), and consequently [NodeJS](https://nodejs.org/en/). Follow instructions provided [here](https://nodejs.org/en/download/) to install and configure properly NodeJS and NPM in your machine.

## Deployment

After project cloned and all prerequisites installed, it is necessary running the command below in the root directory to deploy properly all development dependencies of this project:

```
npm install
```

Grunt is implemented as a task runner for this project. Grunt tasks include: concatenation and js uglify; it runs sass; and autoprefixer, pixrem and cssnano through postcss. Grunt watches for changes in js and all scss files. In order to watch changes made in the files, run grunt inside the project folder by the command below:

```
grunt
```

## Execution

This project is built to run in NodeJS, therefore it is necessary to execute this command in the root directory of your local repository of the project:

```
node app
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
