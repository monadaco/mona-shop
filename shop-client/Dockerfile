#!/bin/bash
# Use the official Node.js image as the base image
FROM --platform=linux/amd64 node:18

# Set the working directory inside the container
WORKDIR /usr/src/shop-client

# Install app dependencies
COPY package*.json ./

# Install Node.js dependencies
RUN npm ci

COPY . .

ENV REACT_APP_API_URL https://orders-service-11934324676bb70d.onporter.run

RUN npm run build --prefix public

# Expose the port on which your Node.js application will run
EXPOSE 8080

ENV PORT 8080

# Command to run your Node.js application
CMD npm start
