# Use the official Node.js image as the base image
FROM node:18 as prep_image

# Set the working directory inside the container
WORKDIR /usr/src/shop-client

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Node.js dependencies
COPY . .
RUN npm ci

RUN npm run build --prefix public

FROM nginx

COPY --from=prep_image /usr/src/shop-client/dist /usr/share/nginx/html