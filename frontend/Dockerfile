FROM node:20.17.0

# Set working directory
WORKDIR /app

# Menyalin package.json dan package-lock.json terlebih dahulu
COPY package*.json ./

# Hapus node_modules dan package-lock.json jika ada
RUN rm -rf node_modules package-lock.json

# Install dependensi
RUN npm install --legacy-peer-deps

# Menyalin semua file source code ke dalam container
COPY . .

# Menyediakan port 3001 untuk akses
EXPOSE 3001

# Menjalankan aplikasi dengan perintah npm run dev
CMD ["npm", "run", "dev", "--", "--host"]
