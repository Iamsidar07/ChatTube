import createHttpError from "http-errors";
import isVideoExist from "../utlis/isVideoExist";
import queryAstra from "../utlis/queryAstra";
import insertVectorAstra from "../utlis/insertVectorAstra";
import { NextFunction, Request, Response } from "express";

export const getTranscription = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { query, videoId, chat } = req.body;
  const OPENAI_API_KEY = req.headers.authorization
  if (!OPENAI_API_KEY) {
    return next(createHttpError(400, "Missing api key"))
  }
  if (!query || !videoId) {
    return next(createHttpError(400, "All fields are required."));
  }

  try {
    // check if the video is exist
    const isExist = await isVideoExist(videoId);
    if (isExist) {
      const result = await queryAstra({
        query,
        videoId,
        chat,
        openaiApiKey: OPENAI_API_KEY
      });
      console.log({ result });
      res.status(200).json(result);
    } else {
      // emmbed transcript
      await insertVectorAstra({ videoId, openaiApiKey: OPENAI_API_KEY });
      const result = await queryAstra({
        query,
        videoId,
        chat,
        openaiApiKey: OPENAI_API_KEY
      });
      res.status(200).json(result);
    }
  } catch (error) {
    console.error(error);
    return next(createHttpError(500, "Failed to get transcript"));
  }
};
