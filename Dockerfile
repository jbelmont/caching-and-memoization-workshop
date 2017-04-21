FROM mhart/alpine-node:7.9.0

LABEL Marcel Belmont "marcelbelmont@gmail.com"

ENV appDir /var/www/app

# Run updates and install deps
RUN apk add --no-cache make gcc g++ python

# Set the work directory
RUN mkdir -p /var/www/app
WORKDIR ${appDir}

# Add our package.json and install *before* adding our application files
ADD package.json ./
RUN npm install

RUN npm install -g ava

# Add application files
ADD . /var/www/app

# Define mountable directories.
VOLUME ["/usr/local/var/lib/couchdb"]

CMD ["node", "bin/www"]
