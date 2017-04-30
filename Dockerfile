FROM mhart/alpine-node:7.9.0

LABEL Marcel Belmont "marcelbelmont@gmail.com"

ENV appDir /var/www/app
ENV NODE_SASS_PLATFORM alpine

# Run updates and install deps
RUN apk add --no-cache make gcc g++ python

# Set the work directory
RUN mkdir -p /var/www/app
WORKDIR ${appDir}

RUN npm install
RUN npm install -g ava

# Add application files
ADD . /var/www/app

# Define mountable directories.
VOLUME ["/usr/local/var/lib/couchdb"]

CMD ["npm", "run", "dev:server"]
