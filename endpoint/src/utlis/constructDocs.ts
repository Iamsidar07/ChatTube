import getYoutubeVideoInfo from "./getYoutubeVideoInfo";
import { Document } from "@langchain/core/documents";
import { splitTranscript } from "./splitTranscript";
export interface Transcript {
  text: string;
  duration: number;
  offset: number;
}
export const constructDocs = async (
  transcript: Transcript[],
  youtubeId: string,
) => {
  try {
    const videoMetadata = await getYoutubeVideoInfo(youtubeId);
    if (!videoMetadata) {
      throw new Error("Failed to get video metadata.");
    }
    const chunks = splitTranscript(transcript, 45);
    const docs: Document[] = chunks.map((chunk) => ({
      pageContent: chunk.content,
      metadata: { ...videoMetadata, startTime: chunk.startTime },
    }));
    return docs;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to construct docs.");
  }
};
