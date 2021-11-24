FROM node:12.14.1-slim

MAINTAINER whitequbits

# Create work directory
WORKDIR /usr/src/app

# Copy app source to work directory
COPY . /usr/src/app

# Install app dependencies
RUN npm install

# Build and run the app
CMD npm start serve
