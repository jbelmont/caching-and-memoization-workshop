FROM mhart/alpine-node:7.9.0

LABEL Marcel Belmont "marcelbelmont@gmail.com"

# Set Environment variables
ENV appDir /var/www/app
ENV NODE_SASS_PLATFORM alpine

# Set the work directory
RUN mkdir -p ${appDir}
WORKDIR ${appDir}

# Add application files
ADD . ${appDir}

# Install npm dependencies and install ava globally
RUN npm install
RUN npm install -g ava

# Define mountable directories.
VOLUME ["/usr/local/var/lib/couchdb"]

# Add main node execution command
CMD ["npm", "run", "dev:server"]
