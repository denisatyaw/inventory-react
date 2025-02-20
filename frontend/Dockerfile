# Stage 1: Build dengan Node.js
FROM node:20.17.0 AS build
WORKDIR /app

# Salin package.json dan package-lock.json sebelum install dependencies
COPY package*.json ./

# Hapus package-lock.json jika ada untuk mencegah error dependency
RUN rm -f package-lock.json

# Install dependencies
RUN npm install --legacy-peer-deps

# Salin seluruh source code ke dalam container
COPY . .

# Build aplikasi React
RUN npm run build

# Hapus node_modules untuk menghemat ruang
RUN rm -rf node_modules

# Stage 2: Gunakan Nginx untuk serving aplikasi di production
FROM nginx:alpine

# Salin hasil build dari stage sebelumnya ke dalam direktori Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Salin konfigurasi Nginx ke dalam container
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Expose port 80 agar bisa diakses dari luar
EXPOSE 80

# Jalankan Nginx
CMD ["nginx", "-g", "daemon off;"]
