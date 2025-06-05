const sharp = require('sharp');

const SIZE = {
    width: 150,
    height: 150,
};

(async () => {
    const semiTransparentRedPng = await sharp({
        create: {
            width: 48,
            height: 48,
            channels: 4,
            background: { r: 255, g: 0, b: 255, alpha: 0.35 },
        },
    })
        .resize(SIZE.width, SIZE.height, { withoutEnlargement: false }) // CÓ upsize nếu ảnh nhỏ hơn
        .png()
        .toFile('./tmp/output.png');

    console.log('🚀 ~ semiTransparentRedPng:', semiTransparentRedPng);
})();
