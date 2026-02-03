# 1 .Building a Vue project
FROM node:20 AS build
WORKDIR /app

# Copie package.json and package-lock.json
COPY package*.json ./

# Installing dependencies
RUN npm install

# Copying the entire project
COPY . .

ARG VITE_API_URL

# Passing ARG to ENV
ENV VITE_API_URL=$VITE_API_URL

# Building a project for production
RUN npm run build

# ---------- 2. Production image with Nginx ----------
FROM nginx:alpine

# Copying the custom Nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copying the assembled frontend from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Exhibiting the port
EXPOSE 80

# Running Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]