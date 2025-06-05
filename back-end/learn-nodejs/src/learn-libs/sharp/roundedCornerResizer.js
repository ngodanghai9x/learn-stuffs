const fs = require('fs');
const sharp = require('sharp');


const SIZE = {
    width: 350,
    height: 350,
}
// Tạo SVG mask bo góc (rx, ry là bán kính bo góc)
const roundedCorners = Buffer.from(
    `<svg>
     <rect x="0" y="0" width="${SIZE.width}" height="${SIZE.height}" rx="50" ry="50"/>
   </svg>`,
);

// Tạo transform stream để resize và bo góc ảnh
const roundedCornerResizer = sharp()
    .resize(SIZE.width, SIZE.height, { withoutEnlargement: true }) // Không upsize nếu ảnh nhỏ hơn
    .composite([
        {
            input: roundedCorners,
            blend: 'dest-in', // Áp mask
        },
    ])
    .png();

// Tạo readable stream từ file ảnh gốc
const readableStream = fs.createReadStream('/home/gem/Downloads/images/standard_incredible.jpg');

// Tạo writable stream để ghi file kết quả
const writableStream = fs.createWriteStream('./tmp/output-rounded.png');

readableStream
    .pipe(roundedCornerResizer)
    .pipe(writableStream)
    .on('finish', () => {
        console.log('✅ Done: output-rounded.png created.');
    })
    .on('error', (err) => {
        console.error('❌ Error:', err);
    });
