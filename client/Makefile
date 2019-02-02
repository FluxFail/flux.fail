SHELL = /bin/bash

export API_URL := http://localhost:8080

.PHONY: clean
clean:
	rm -rf ./node_modules/
	rm -rf ./dist/

.PHONY: install
install:
	npm install

.PHONY: dev
dev:
	npm start

.PHONY: build
build:
	docker build -t fluxfail/client .
