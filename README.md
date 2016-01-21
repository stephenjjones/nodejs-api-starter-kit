# !!!!! WORK IN PROGRESS

# A Starter Kit for a Nodejs Web Server with a REST Api

## REPLACE THIS README WITH YOUR PROJECT SPECIFIC INFO

The purpose of this project is to provide a starter kit for new product prototypes based on Nodejs that require
a REST Api and websockets.

## Features

* User Accounts
* Roles
* ACLs
* Token based authentication using JWT
* Postgres drivers (to be refactored out into a pluggable alternative with thorough documentation on using different backends, no magic ORMs though)
* Database access patterns
* Websockets
* Production ready process manager

## Technologies used

| **Tech** | **Description** |
|----------|-----------------|
| [Express](http://expressjs.com/) |  |
| [Knex](http://knexjs.org/) | SQL query builder  |
| [PassportJs](http://passportjs.org/) | SQL query builder  |
| [Babel](http://babeljs.io) | Transpiles javascript for both client and server |
| [Webpack](http://webpack.github.io) | Used to build client side code  |
| [ESLint](http://eslint.org/) |  |
| [pm2](http://pm2.keymetrics.io/) | Process manager |
| [npm Scripts](https://docs.npmjs.com/misc/scripts) |  |


## Setup

1. git clone reponame
2. npm install
3. Install and create database (postgres)

#### Install npm packages

All node packages can be installed witn `$ npm install`. The individual installations are listed
separately for reference:

```
$ npm install express --save
$ npm install passport --save
$ npm install morgan --save           # Log requests to console
$ npm install body-parser --save      # Extract params from POST requests
$ npm install jsonwebtoken --save     # Create and verify JSON web tokens
$ npm install pm2@latest -g
$ npm install pg --save               # postgres client [pg github](https://github.com/brianc/node-postgres)
$ npm install knex --save
$ npm install bcryptjs --save
```

#### Setup Postgres Database

##### Mac OS X
[Installation guide](http://www.russbrooks.com/2010/11/25/install-postgresql-9-on-os-x)
[Postgres install guide](https://www.codefellows.org/blog/three-battle-tested-ways-to-install-postgresql)
```
$ brew update
$ brew install postgresql
$ which psql                            # confirm proper installation at /usr/local/bin/psql
$ postgres -D /usr/local/var/postgres   # start postgres (some guides suggest starting with launchctl at startup, I prefer explicitly starting)
$ createdb `whoami`                     # create a default db based on your username
$ psql                                  # logs into postgres shell
=# CREATE DATABASE your_db_name OWNER your_db_user ENCODING 'UTF8'
```

##### AWS


## NPM Script Utilities

| **Script** | ** Description ** |
|------------|-------------------|
| build      |                   |
| start      |                   |
| test       |                   |
| clean      |                   |
| startdb    | Start postgres for local development |


### PM2 Process Manager

[PM2 website](http://pm2.keymetrics.io/)


### API Testing

I recommend using [Postman](http://www.getpostman.com/) to query you api during testing.


### Token based Auth

[general jwt overview](https://scotch.io/tutorials/the-ins-and-outs-of-token-based-authentication)
[Anatomy of a jwt](https://scotch.io/tutorials/the-anatomy-of-a-json-web-token)
[Authenticate a nodejs api with jwt](https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens)
[jwt explained by stormpath](https://stormpath.com/blog/nodejs-jwt-create-verify/)


### pm2 commands

[pm2 quickstart](http://pm2.keymetrics.io/docs/usage/quick-start/)

```
$ pm2 start app.js              # Fork mode
$ pm2 start app.js -i 0         # Will start maximum processes with LB depending on available CPUs
$ pm2 list                      # Display all processes status
$ pm2 start app.js --watch
```
