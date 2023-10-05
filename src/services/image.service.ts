import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import Container, { Service } from 'typedi';
import { TaskService } from './task.service';
import { LambdaService } from './lambda.service';


@Service()
export class ImageService {
    private readonly taskService: TaskService;
    private readonly lambdaService: LambdaService;

    constructor() {
        this.taskService = Container.get(TaskService);
        this.lambdaService = Container.get(LambdaService);
    }

    async saveProcessedImages(originalName: string, images: Record<string, Buffer>): Promise<void> {
        for (const [size, imageBuffer] of Object.entries(images)) {
            const outputDir = path.join(__dirname, '..', '..', 'output', originalName, size);
            const md5Hash = crypto.createHash('md5').update(imageBuffer).digest('hex');
            const extension = path.extname(originalName);
            const outputPath = path.join(outputDir, `${md5Hash}${extension}`);
    
            fs.promises.mkdir(outputDir, { recursive: true });
    
            await fs.promises.writeFile(outputPath, imageBuffer);
        }
    }
}
