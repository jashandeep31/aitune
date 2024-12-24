import dotenv from "dotenv";
dotenv.config();
// keeping dotenv at the top of the file to load the environment variables
import express, { Request, Response } from "express";
import cors from "cors";
import aiRoutes from "./routes/ai.routes";
import { AppError } from "./utils/appError";

const port = process.env.PORT || 8000;

const app = express();
// TODO: Need to change in the production
app.use(cors());
app.use(express.json());

// routes of the application
app.use("/api/v1/ai", aiRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});
app.use((err: AppError, req: Request, res: Response, next: any) => {
  res.status(err.statusCode).send(err.message);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
