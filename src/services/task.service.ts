import { Service } from 'typedi';
import TaskModel from '../models/task.model';

@Service()
export class TaskService {
    async createTask(imagePath: string): Promise<string> {
        const task = new TaskModel({ imagePath });
        await task.save();
        return task._id;
    }

    async getTaskStatus(taskId: string): Promise<string> {
        const task = await TaskModel.findById(taskId);
        return task?.status || 'not found';
    }

    async updateTaskStatus(taskId: string, status: 'pending' | 'processing' | 'completed' | 'failed'): Promise<void> {
        await TaskModel.findByIdAndUpdate(taskId, { status, updatedAt: new Date() });
    }
}
