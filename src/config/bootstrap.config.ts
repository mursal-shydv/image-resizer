import Container from 'typedi';
import connectDatabase from './mongodb.config';
import { ImageService, LambdaService, TaskService } from '../services';

const bootstrap = async (): Promise<void> => {
    try {
        await connectDatabase();

        const imageService = new ImageService();
        Container.set(ImageService, imageService);

        const taskService = new TaskService();
        Container.set(TaskService, taskService);

        const lambdaServic = new LambdaService();
        Container.set(LambdaService, lambdaServic);

    } catch (error) {
        console.error('Error during bootstrapping:', error);
    }
};

export default bootstrap;
