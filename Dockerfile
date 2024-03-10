# Use an official Node runtime as a parent image
FROM node:21

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any needed packages
RUN npm install
RUN npm install -g nodemon

# Bundle app source
COPY . .

# Your app binds to port 3000 so you use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3000

# Define the command to run your app
CMD ["nodemon", "server.js"]