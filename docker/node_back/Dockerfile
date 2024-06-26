# Use the official Node.js image as the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY ./package*.json ./

# Install dependencies
RUN npm install

RUN npm list cross-env
RUN npm list pm2

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3095

# Define the environment variable for the database password
ENV MYSQL_PASSWORD=${MYSQL_PASSWORD}

# Start the application
CMD ["npm", "start"]