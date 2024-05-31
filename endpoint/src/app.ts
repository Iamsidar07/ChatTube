import express from "express";
import cors from "cors";
import globalErrorHandler from "./middleware/globalErrorHander";
import transcriptionRouter from "./transcription/transcriptionRouter";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["POST"],
  }),
);

// routes
app.use("/api/queryVideo", transcriptionRouter);

app.use(globalErrorHandler);

export default app;
