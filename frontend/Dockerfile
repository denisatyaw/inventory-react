# Stage 1: Build dengan Node.js
FROM node:20.17.0 AS build
WORKDIR /app

# Salin package.json dan package-lock.json sebelum install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Salin seluruh source code ke dalam container
COPY . .

# Build aplikasi React
RUN npm run build

# Stage 2: Gunakan Nginx untuk serving aplikasi di production
FROM nginx:alpine

# Salin hasil build dari stage sebelumnya ke dalam direktori Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Salin konfigurasi Nginx ke dalam container
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 agar bisa diakses dari luar
EXPOSE 80

# Jalankan Nginx
CMD ["nginx", "-g", "daemon off;"]
