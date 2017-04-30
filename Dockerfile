FROM mhart/alpine-node:7.9.0

LABEL Marcel Belmont "marcelbelmont@gmail.com"

# Set Environment variables
ENV appDir /var/www/app
ENV NODE_SASS_PLATFORM alpine

# Run updates and install deps
RUN apk add --no-cache make gcc g++ python

# Set the work directory
RUN mkdir -p ${appDir}
WORKDIR ${appDir}

# Install npm dependencies and install ava globally
RUN npm install
RUN npm install -g ava

# Add application files
ADD . ${appDir}

# Define mountable directories.
VOLUME ["/usr/local/var/lib/couchdb"]

# Add main node execution command
CMD ["npm", "run", "dev:server"]
