# Base image
FROM node:19-alpine3.17

# Install simple http server for serving static content
RUN npm install -g http-server

# Make the app folder the current working directory
WORKDIR /srv/app

# Copy both package.json and package-lock.json and install dependencies first to allow caching
COPY package*.json .
RUN npm install

# Copy other project files 
COPY . .

# Run development server
# CMD ["npm", "run", "dev"]

# To test PWA features
# Build app for production with minification
RUN npm run build

# Run HTTP server
CMD [ "http-server", "dist" ]