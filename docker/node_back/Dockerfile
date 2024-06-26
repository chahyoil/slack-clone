# Use the official Node.js image as the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Install dockerize
RUN apt-get update && apt-get install -y wget && \
    wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz && \
    tar -C /usr/local/bin -xzvf dockerize-linux-amd64-v0.6.1.tar.gz && \
    rm dockerize-linux-amd64-v0.6.1.tar.gz

# Copy package.json and package-lock.json
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3095

# Define the environment variable for the database password
ENV MYSQL_PASSWORD=${MYSQL_PASSWORD}

# Start the application
CMD ["dockerize", "-wait", "tcp://mysql_container:3306", "-timeout", "60s", "sh", "-c", "npx sequelize db:seed:all && npm start"]