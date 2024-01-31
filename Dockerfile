# Dockerfile.frontend

FROM node:18.17.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

# Copy the built React app to Nginx's web server directory
COPY ./nginx/conf.d /etc/nginx/conf.d/
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]

