# Stage 1: Build the Angular app
FROM node:18.16.1 AS build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the entire Angular project to the container
COPY . .

# Build the Angular app for production
RUN npm run build --prod

# Stage 2: Create the production-ready Nginx image
FROM nginx:1.21.3

# Copy the built Angular app from the previous build stage to the Nginx server root
COPY --from=build /usr/src/app/dist/calculator /usr/share/nginx/html

# Expose the port to which Nginx listens
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
