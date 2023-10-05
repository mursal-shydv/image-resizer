# Image Resizing API with Serverless Lambda Function

This project provides a RESTful API built with Node.js and TypeScript. It receives image resize requests and delegates the actual resizing to an AWS Lambda function. The processed images are stored in a output folder on the server.

## Architecture

1. **API Server (Express.js with TypeScript)**
   - Handles image processing requests.
   - Uses controllers for structured request handling.
   - Connects to MongoDB for data persistence.
   - Invokes the AWS Lambda function for image resizing.


## Setup and Installation

### Prerequisites

- Node.js
- npm
- Docker & Docker Compose

1. Clone the repository:

```bash
git clone [repository-url]
cd [repository-directory]

npm install
```

After installing all the dependencies, make sure there is no running MongoDB in the local machine and start the docker-compose

```
docker-compose up -d
```

Then run the application in the development mode

```npm run dev
```

## Available Endpoints

- **POST** `/task`: Create new task to be proceed.
- **GET** `/task/:taskId`: Get task status.

## API Documentation with Swagger

After starting the application, navigate to localhost:3000/docs to access the Swagger API documentation. This provides details on the available endpoints.

![Swagger UI](https://mursal.s3.eu-west-1.amazonaws.com/image-resizer-swagger.png)

## Notes & Potential Improvements:

Currently project is not running completely because we need our lambda to be deployed to the AWS. We may use Sam to replicate
it in the localhost

Potentially improvements could be done with more time:

- **Logging**: Adopt advanced logging with libraries like `Winston`.
- **Error Handling**: Establish better custom error handling using specific error functions and middleware.
- **Testing**: Unit and integration tests.
