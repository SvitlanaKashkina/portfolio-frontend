# 1 .Building a Vue project
FROM node:20-alpine AS builder
WORKDIR /app

# Copie package.json and package-lock.json
COPY package*.json ./

# Installing dependencies
RUN npm ci

# Copying the entire project
COPY . .

ARG VITE_API_URL

RUN echo "VITE_API_URL=${VITE_API_URL}" > .env.production

# Building a project for production
RUN npm run build

# ---------- 2. Production image with Nginx ----------
FROM nginx:stable-alpine

# Copying the custom Nginx config
COPY --from=builder /app/dist /usr/share/nginx/html

# Copying the assembled frontend from the build stage
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exhibiting the port
EXPOSE 80

# Running Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]