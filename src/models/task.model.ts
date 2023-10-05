import mongoose from 'mongoose';
import { ITask } from '../interfaces';

const taskSchema = new mongoose.Schema({
    imagePath: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'processing', 'completed', 'failed'], default: 'pending' },
});

const TaskSchema = mongoose.model<ITask & mongoose.Document>('Task', taskSchema);

export default TaskSchema;