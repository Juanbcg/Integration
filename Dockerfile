# Etapa 1: build del frontend
FROM node:18 AS build

WORKDIR /app

COPY app/package*.json ./
RUN npm install

COPY app ./
RUN npm run build

# Etapa 2: servir con NGINX
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80