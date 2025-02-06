import express from "express";
import cors from "cors"; // Import cors
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/database";
import uploadRoutes from "./routes/upload";
import reportRoutes from "./routes/report";  // Ensure you have this route for /api/reports

dotenv.config();
connectDB();

const app = express();

// Enable CORS for all origins
app.use(cors());

// Optional: Use body-parser middleware if needed
app.use(bodyParser.json());

// Mount your routes
app.use("/api", uploadRoutes);
app.use("/api/reports", reportRoutes);  // This should expose endpoints like GET /api/reports

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
