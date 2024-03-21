const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('mydatabase', 'myuser', 'mypassword', {
    host: 'localhost',
    dialect: 'postgres', // Menggunakan PostgreSQL
    logging: false, // Matikan logging SQL untuk mengurangi kebisingan
    define: {
        timestamps: false // Jika Anda tidak memerlukan kolom timestamp created_at dan updated_at
    },
});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Koneksi ke database berhasil!');
        await sequelize.sync({ force: true }); // Mengaktifkan Auto DDL dengan force: true
        console.log('Auto DDL telah dijalankan.');
    } catch (error) {
        console.error('Gagal terhubung ke database:', error);
    }
}

// Eksport instance Sequelize dan fungsi testConnection
module.exports = { sequelize, testConnection };
