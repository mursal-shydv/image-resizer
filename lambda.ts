/* eslint-disable @typescript-eslint/no-explicit-any */
import sharp = require('sharp');

exports.handler = async (event: any) => {
    const sizes = [1024, 800];
    const result: any = {};

    const inputBuffer = Buffer.from(event.image, 'base64');

    for (const size of sizes) {
        const resizedBuffer = await sharp(inputBuffer)
            .resize(size, undefined, {
                fit: 'inside',
                withoutEnlargement: true,
            })
            .toBuffer();

        result[size.toString()] = resizedBuffer.toString('base64');
    }

    return result;
};