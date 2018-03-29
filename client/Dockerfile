FROM nginx

# Copy assets over
# NOTE: These have to be built first with "npm run build"
COPY dist /usr/share/nginx/html

# Configure Nginx for basic auth
COPY nginx/htpasswd /etc/nginx/fluxfail.htpasswd
COPY nginx/nginx_vhost.conf /etc/nginx/conf.d/default.conf
