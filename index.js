import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./DB/connectDB.js";
const app = express();
import userRoute from "./routes/userRoutes.js";

const PORT = process.env.PORT || 9000;
connectDB(process.env.MONGODB_URI);

// Middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Middleware
app.use("/api/v1", userRoute);

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
