.EXPORT_ALL_VARIABLES:

SHELL = /bin/bash

API_URL := http://localhost:8080

.PHONY: clean
clean:
	rm -rf ./node_modules
	rm -rf ./client/dist

.PHONY: site
site:
	docker build -t fluxfail/site site/

.PHONY: server
server:
	cp package.json server/package.json
	docker build -t fluxfail/server server/

.PHONY: client
client:
	cd client && npm run build

.PHONY: client/image
client/image:
	docker build -t fluxfail/client client/

.PHONY: fakesmtp
fakesmtp:
	cp package.json spec/fakesmtp/package.json
	docker build -t fluxfail/fakesmtp spec/fakesmtp/

.PHONY: compose
compose:
	docker-compose up -d 
	docker-compose ps

.PHONY: migrate
migrate:
	docker-compose exec server npm run migrate --no-interaction

.PHONY: dev
dev:
	npm run dev