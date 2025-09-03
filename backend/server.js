import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import noteRouter from "./routes/noteRoutes.js";

const app = express();

await connectDB();

// Middlewares
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/auth", authRouter);
app.use("/api/notes", noteRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
