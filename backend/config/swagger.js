const fs = require("fs");
const path = require("path");
const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "My API",
        description: "Dokumentasi API otomatis menggunakan swagger-autogen",
    },
    host: process.env.SWAGGER_HOST || "168.138.173.100:5000",
    schemes: ["http"],
    basePath: "/",
    securityDefinitions: {
        BearerAuth: {
            type: "apiKey",
            name: "Authorization",
            in: "header",
            description: "Masukkan token dalam format: Bearer <your_token>",
        },
    },
    security: [{ BearerAuth: [] }],
};

// **Pemetaan kategori berdasarkan nama file route**
const routeCategories = {
    "authRoutes.js": "Auth",
    "userRoutes.js": "User",
    "adminRoutes.js": "Admin",
    "publicRoutes.js": "Public",
};

// Fungsi untuk mengecek apakah file ada
const checkFileExists = (filePath) => {
    if (fs.existsSync(filePath)) {
        return filePath;
    } else {
        console.warn(`⚠️ File not found: ${filePath}`);
        return null;
    }
};

// Path untuk file output dan endpoint
const outputFile = path.join(__dirname, "../swagger_output.json");
const endpointsFiles = [
    path.posix.join(__dirname, "../app.js")
]
    .map(checkFileExists)
    .filter(Boolean);

// **Jalankan swagger-autogen**
swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
    console.log("✅ Swagger documentation generated successfully!");

    try {
        // **Baca file swagger_output.json yang sudah dibuat**
        let swaggerJSON = JSON.parse(fs.readFileSync(outputFile, "utf8"));

        // **Loop semua paths dan tambahkan tags berdasarkan route asal**
        Object.entries(swaggerJSON.paths).forEach(([route, methods]) => {
            Object.entries(methods).forEach(([method, details]) => {
                // **Gunakan path endpoint untuk menentukan kategori**
                const routeFile = endpointsFiles.find((file) =>
                    route.includes(file.split("/").pop().replace(".js", ""))
                );

                if (routeFile) {
                    const fileName = routeFile.split("/").pop();
                    const category = routeCategories[fileName] || "Other";
                    details.tags = [category];
                }
            });
        });

        // **Tulis ulang file dengan tags yang diperbarui**
        fs.writeFileSync(outputFile, JSON.stringify(swaggerJSON, null, 2));
        console.log("✅ Swagger tags updated successfully!");
    } catch (err) {
        console.error("❌ Error updating Swagger tags:", err);
    }
});
