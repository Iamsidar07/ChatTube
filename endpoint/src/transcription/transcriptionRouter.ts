import express from "express";
import { getTranscription } from "./transcriptionController";
const transcriptionRouter = express.Router();

transcriptionRouter.post("/", getTranscription);

export default transcriptionRouter;
