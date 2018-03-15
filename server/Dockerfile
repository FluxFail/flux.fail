FROM node:carbon-alpine

# Reduce npm install verbosity, overflows Travis CI log view
ENV NPM_CONFIG_LOGLEVEL warn
ENV NODE_ENV production

# Prepare target directory
WORKDIR /opt/fluxfail

# Install runtime dependencies
COPY ../package.json ./
RUN npm install --only=production

# Copy server source code
COPY . ./server

# Ensure latest database migrations are in place
RUN npm run migrate

# Run the server
EXPOSE 8080
ENV PORT=8080
CMD npm run server
