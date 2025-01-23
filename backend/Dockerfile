# Menggunakan node image
FROM node:20.17.0

# Set working directory di dalam container
WORKDIR /backend  

# Menyalin package.json dan package-lock.json terlebih dahulu
COPY package*.json ./

# Install dependensi
RUN npm install --legacy-peer-deps

# Menyalin seluruh kode sumber ke dalam container
COPY . .

# Menyediakan port 5000 untuk akses
EXPOSE 5000

# Menjalankan aplikasi dengan perintah npm run dev
CMD ["npm", "run", "dev"]
