const sharp = require('sharp');
const fs = require('fs');

const inputPath = './tmp/output-rounded.png';
const outputPath = './tmp/output-thumb.jpg';

sharp(inputPath)
    .resize(100, 100, {
        fit: 'cover', // cắt ảnh để khớp tỷ lệ, tránh méo
        position: 'center', // crop vùng trung tâm
    })
    .jpeg({ quality: 50 }) // nén ảnh thumbnail (tùy định dạng)
    .toFile(outputPath)
    .then(() => {
        console.log('✅ Thumbnail created at', outputPath);
    })
    .catch((err) => {
        console.error('❌ Error:', err);
    });
