import 'reflect-metadata';
import multer from 'multer';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import bootstrap from './src/config/bootstrap.config';
import { NextFunction, Request, Response } from 'express';
import { TaskController } from './src/controllers/task.controller';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { createExpressServer, getMetadataArgsStorage } from 'routing-controllers';


const PORT = process.env.PORT || 3000;

const app = createExpressServer({
    controllers: [TaskController],
    middlewares: [],
});

const storage = getMetadataArgsStorage();
const spec = routingControllersToSpec(storage,  {}, {
    info: {
        title: 'Image resizer app',
        version: '1.0.0',
    },
});

app.use(multer().single('image'));

// Swagger docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec));

app.use(bodyParser.json());

//eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    res.status(500).send({ error: err.message });
});

async function startServer() {
    await bootstrap();

    app.listen(PORT, () => {
        console.log(`Server started on port http://localhost:${PORT}`);
    });
}

startServer();