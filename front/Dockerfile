# 1) Build React (CRA)
FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps

COPY . .
RUN npm run build

# 2) Serve with Nginx
FROM nginx:alpine

# On enlève la conf par défaut (optionnel mais propre)
RUN rm -f /etc/nginx/conf.d/default.conf

# Les fichiers statiques compilés
COPY --from=build /app/build /usr/share/nginx/html
