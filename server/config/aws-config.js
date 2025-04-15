import dotenv from "dotenv";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// Load environment variables
dotenv.config();

// Initialize the DynamoDB client
const client = new DynamoDBClient({
  region: process.env.DB_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.DB_ACCESS_KEY_ID,
    secretAccessKey: process.env.DB_SECRET_ACCESS_KEY,
  },
});

const dynamoDB = DynamoDBDocumentClient.from(client);

export { dynamoDB };

// The db.config.js file exports the docClient object, which is used to interact with DynamoDB in the usersController.js file. This separation of concerns helps keep the code organized and modular. The server/server.js file imports the docClient object and initializes the DynamoDB client, ensuring that the necessary dependencies are available for handling database operations.
