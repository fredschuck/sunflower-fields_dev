import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import "./config/firebase-admin.js";
import router from "./routes/_index.js";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize the Express app
const app = express();

// Middleware to parse JSON request bodies
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// For debugging purposes
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// For debugging purposes
// app.use((req, res, next) => {
//   console.log('---------------- DEBUG ----------------');
//   console.log('Incoming request:');
//   console.log('URL:', req.url);
//   console.log('Method:', req.method);
//   console.log('Headers:', req.headers);
//   console.log('Body:', req.body);
//   console.log('----------------------------------------');
//   next();
// });

// API Routes
app.use("/api", router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Serve static files from the Vite build - AFTER API routes
app.use(express.static(path.join(__dirname, "../client/dist")));

// Serve the frontend for all other routes (This MUST be last!)
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
// });

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
