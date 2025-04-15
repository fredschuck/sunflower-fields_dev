import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  TransactWriteCommand,
} from "@aws-sdk/lib-dynamodb";
import {
  createNewUserRecord,
  createNewProfileRecord,
} from "../database/schema.js";
import dotenv from "dotenv";

dotenv.config();

const client = new DynamoDBClient({
  credentials: {
    accessKeyId: process.env.DB_ACCESS_KEY_ID,
    secretAccessKey: process.env.DB_SECRET_ACCESS_KEY,
  },
  region: process.env.DB_DEFAULT_REGION,
});

const dynamoDB = DynamoDBDocumentClient.from(client);

export const signup = async (req, res) => {
  try {
    const { uid, email } = req.user; // Firebase user data from auth middleware

    console.log("AUTHCONTROLLER SIGNUP START");
    console.log("User data:", { uid, email });
    console.log("User check");

    // Existing user check
    const existingUser = await dynamoDB.send(
      new GetCommand({
        TableName: process.env.USER_TABLE_NAME,
        Key: {
          userId: uid,
        },
      })
    );
    if (existingUser.Item) {
      return res.status(409).json({
        message: "User record already exists",
        data: existingUser.Item,
      });
    }

    console.log("User and Profile checks passed");
    console.log("Creating user and profile");

    // Create both User and Profile in a single transaction
    const command = new TransactWriteCommand({
      TransactItems: [
        // Create User record
        {
          Put: {
            TableName: process.env.USER_TABLE_NAME,
            Item: createNewUserRecord(uid, email),
            ConditionExpression: "attribute_not_exists(PK)",
          },
        },
        // Create Profile record
        {
          Put: {
            TableName: process.env.PROFILE_TABLE_NAME,
            Item: createNewProfileRecord(uid),
            // ConditionExpression: "attribute_not_exists(SK)"
            ConditionExpression:
              "attribute_not_exists(PK) AND attribute_not_exists(SK)",
          },
        },
      ],
    });

    await dynamoDB.send(command);

    res.status(201).json({
      message: "User record created successfully",
      data: {
        userId: uid,
        email,
        currentStep: "account",
      },
    });
  } catch (error) {
    console.error("Error in createUserRecord:", error);
    res.status(500).json({
      error: "Failed to create user record",
    });
  }
};
