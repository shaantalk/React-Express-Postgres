# Build stage
FROM node:16 AS build-stage

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the project files into the docker image
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM nginx:stable-alpine AS production-stage

# Remove the default nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy the custom nginx configuration from the context directory
COPY nginx/nginx.conf /etc/nginx/conf.d

# Copy SSL certificates
COPY nginx/certs/nginx.crt /etc/nginx/certs/nginx.crt
COPY nginx/certs/nginx.key /etc/nginx/certs/nginx.key

# Copy the Diffie-Hellman parameter file for DHE ciphersuites
COPY nginx/certs/dhparam.pem /etc/nginx/certs/dhparam.pem

# Copy the build output to replace the default nginx contents.
COPY --from=build-stage /app/build /usr/share/nginx/html

# Expose port 443 for HTTPS
EXPOSE 443

# Start nginx with the global option to run it in the foreground
CMD ["nginx", "-g", "daemon off;"]