SHELL = /bin/bash

.PHONY: install
install:
	cd server && npm install
	cd client && npm install

.PHONY: all
all: smtp server client

.PHONY: server/clean
server/clean:
	rm -rf server/node_modules

.PHONY: server/install
server/install:
	cd server && npm install

.PHONY: server/test
server/test:
	cd server && npm run test

.PHONY: server/build
server/build:
	cd server && npm run image

.PHONY: server
server: server/install server/test server/build

.PHONY: client/install
client/install:
	cd client && npm install

.PHONY: client/test
client/test:
	cd client && npm run test

.PHONY: client/build
client:
	echo "Building with API_URL: ${API_URL}"
	rm -rf client/dist
	cd client && npm run build
	cd client && npm run image

.PHONY: client
client: client/install client/test client/build

.PHONY: smtp
smtp:
	docker build -t fluxfail/fakesmtp ./spec/fakesmtp/

.PHONY: migrate
migrate:
	docker-compose exec server npm run migrate

.PHONY: server/up
server/up:
	docker-compose up -d server

.PHONY: client/up
client/up:
	docker-compose up -d client

.PHONY: client/dev
client/dev:
	echo "Building DEVSERVER with API_URL: ${API_URL}"
	cd client && npm start

.PHONY: clean
clean:
	rm -rf ./server/node_modules
	rm -rf ./client/node_modules
	rm -rf ./client/dist