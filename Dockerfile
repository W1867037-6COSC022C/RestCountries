# syntax=docker/dockerfile:1

# 1) Build stage
FROM node:18-alpine AS build

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 2) Production stage
FROM nginx:alpine

# Copy built assets
COPY --from=build /usr/src/app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
