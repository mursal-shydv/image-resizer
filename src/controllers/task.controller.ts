/* eslint-disable @typescript-eslint/no-explicit-any */
import Container, { Service } from 'typedi';
import { TaskService, LambdaService, ImageService } from '../services';
import { JsonController, Post, Get, Param, UploadedFile, Res } from 'routing-controllers';
import { Response } from 'express';
import { OpenAPI } from 'routing-controllers-openapi';

@JsonController()
@Service()
export class TaskController {
    private readonly taskService: TaskService;
    private readonly imageService: ImageService;
    private readonly lambdaService: LambdaService;

    constructor() {
        this.taskService = Container.get(TaskService);
        this.lambdaService = Container.get(LambdaService);
        this.imageService = Container.get(ImageService);
    }

  @Post('/task')
  @OpenAPI({
      summary: 'Create a new image processing request',
      requestBody: {
          content: {
              'multipart/form-data': {
                  schema: {
                      type: 'object',
                      properties: {
                          image: {
                              type: 'string',
                              format: 'binary',
                              description: 'The image file to be uploaded',
                          },
                      },
                  },
              },
          },
          required: true,
      },
  })
    async processImage(@UploadedFile('image') file: any, @Res() response: Response) {
        const task = await this.taskService.createTask(file.originalname);

        const imageBinary = file.buffer;
        const lambdaResult = await this.lambdaService.invokeLambda(imageBinary);

        const processedImages: Record<string, Buffer> = {};
        for (const [size, base64Image] of Object.entries(lambdaResult)) {
            processedImages[size] = Buffer.from(base64Image, 'base64');
        }

        await this.imageService.saveProcessedImages(file.originalname, processedImages);

        return response.json({ message: 'Image processing initiated', taskId: task });
    }

  @Get('/task/:taskId')
  async getTaskStatus(@Param('taskId') taskId: string): Promise<{ status: string }> {
      const status = await this.taskService.getTaskStatus(taskId);
      return { status };
  }
}
