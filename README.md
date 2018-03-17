flux.fail [![Build Status](https://travis-ci.org/FluxFail/flux.fail.svg?branch=master)](https://travis-ci.org/FluxFail/flux.fail)
=========

## Installation

Install the dependencies with `npm install`

You will also need a running Postgres database.

## Running the server

The server needs the following environment variables set:

* `SMTP_URL`: Address for connecting to your SMTP server, including username and password as needed (example: `smtp://localhost`)
* `DATABASE_URL`: Connection details for the Postgres database (example: `postgres://postgres:@localhost/fluxfail`)
* `APP_URL`: URL where the client app is available (example: `https://flux.fail`)
* `JWT_SECRET`: Secret string used for creating and validating client authentication tokens
* `PORT`: The port you want the API server to listen on (example: `80`)

Prepare the database with `npm run migrate`.

Then the server can be started with `npm start`.

## Building the client

To build the client app, you need to first set an environment variable:

* `API_URL`: URL where the server will be running (example: `https://api.flux.fail`)

Then build the client app with `npm run build`

The client can be served with `npm run client`.
