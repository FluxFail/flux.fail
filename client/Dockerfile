FROM nginx
LABEL maintainer Brian Wiborg <brian@flux.fail>

ENV NPM_CONFIG_LOGLEVEL warn
ENV NODE_ENV production

COPY dist /usr/share/nginx/html
COPY nginx/vhost.conf /etc/nginx/conf.d/default.conf
