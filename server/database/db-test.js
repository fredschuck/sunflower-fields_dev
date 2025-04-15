import { ListTablesCommand } from "@aws-sdk/client-dynamodb";
import { dynamoDB } from "../config/aws-config.js";

async function testConnection() {
  try {
    // Test listing tables
    const command = new ListTablesCommand({});
    const response = await dynamoDB.send(command);
    console.log("Successfully connected to DynamoDB!");
    console.log("Available tables:", response.TableNames);
    return true;
  } catch (error) {
    console.error("Error connecting to DynamoDB:", error);
    return false;
  }
}

// Run the test
testConnection()
  .then((success) => {
    if (success) {
      console.log("Database connection test completed successfully!");
    } else {
      console.log("Database connection test failed!");
    }
    process.exit(0);
  })
  .catch((error) => {
    console.error("Unexpected error:", error);
    process.exit(1);
  });

// To run test: 'node db-test.js'