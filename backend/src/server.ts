import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/database";
import uploadRoutes from "./routes/upload";

dotenv.config();
connectDB();

const app = express();
app.use(bodyParser.json());
app.use("/api", uploadRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
