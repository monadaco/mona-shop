# Use the official Node.js image as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/order-service

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm ci 

# Bundle app source
COPY . .

# Expose the port on which your Node.js application will run
EXPOSE 8080

ENV PORT 8080

# Command to run your Node.js application
CMD [ "npm", "start" ]