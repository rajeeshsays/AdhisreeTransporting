# Stage 1: Build the React application
FROM node:20-alpine AS build
WORKDIR /app
# Copy package files first to leverage Docker's layer caching
COPY package*.json ./
RUN npm install
# Copy the rest of the application code
COPY . .
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine
# Copy the build artifacts from the build stage to Nginx's public folder
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
