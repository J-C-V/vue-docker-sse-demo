# Base image
FROM node:19-alpine3.17

# Make the app folder the current working directory
WORKDIR /srv/app

# Copy both package.json and package-lock.json and install dependencies first to allow caching
COPY package*.json .
RUN npm install

# Copy other project files 
COPY . .

# Run development server
CMD ["npm", "run", "dev"]
