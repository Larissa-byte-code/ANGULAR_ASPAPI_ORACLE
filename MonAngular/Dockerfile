# Étape 1 : Build Angular
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Étape 2 : Serveur NGINX
FROM nginx:latest
COPY --from=build /app/dist/MonAngular /usr/share/nginx/html
EXPOSE 80
