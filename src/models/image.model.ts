import mongoose from 'mongoose';
import { IImage } from '../interfaces';

const imageSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    md5: String,
    resolution: String,
    imagePath: String
});

const ImageSchema = mongoose.model<IImage & mongoose.Document>('Image', imageSchema);

export default ImageSchema;