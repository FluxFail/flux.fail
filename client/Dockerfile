FROM node:lts-alpine
LABEL maintainer Brian Wiborg <brian@flux.fail>

RUN npm install -g http-server

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE 8080
CMD [ "http-server", "dist" ]

