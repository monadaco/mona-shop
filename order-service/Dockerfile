#!/bin/bash
# Use the official Node.js image as the base image
FROM --platform=linux/amd64 node:18

# Set the working directory inside the container
WORKDIR /usr/src/order-service

# Install app dependencies
COPY package*.json ./

COPY prisma ./prisma/

COPY . .

# Install Node.js dependencies
RUN npm ci

# Bundle app source
RUN npx prisma generate

# Expose the port on which your Node.js application will run
EXPOSE 8081

ENV PORT 8081

# Command to run your Node.js application
CMD npm start