import { Service } from 'typedi';
import { Lambda } from 'aws-sdk';

@Service()
export class LambdaService {
    private lambda: Lambda;
    private functionName: string;

    constructor() {
        this.lambda = new Lambda({ region: '' });
        this.functionName = 'my-lambda-image-resizer';
    }

    async invokeLambda(imageBinary: Buffer): Promise<Record<string, string>> {
        const params = {
            FunctionName: this.functionName,
            Payload: JSON.stringify({
                image: imageBinary.toString('base64')
            }),
            InvocationType: 'RequestResponse'
        };

        const lambdaResponse = await this.lambda.invoke(params).promise();
        const payload = JSON.parse(lambdaResponse.Payload as string);

        return payload;
    }
}
