import { Document } from "@langchain/core/documents"
import { AstraDBVectorStore } from "@langchain/community/vectorstores/astradb";
import { getYoutubeVideoTranscript } from "./getYoutubeVideoTranscript";
import { getAstraConfig } from "./getAstraConfig";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import getYoutubeVideoInfo from "./getYoutubeVideoInfo";
import { OpenAIEmbeddings } from '@langchain/openai'
interface InsertVectorAstra {
  videoId: string,
  openaiApiKey: string
}
const insertVectorAstra = async ({ videoId, openaiApiKey }: InsertVectorAstra) => {
  const transcript = await getYoutubeVideoTranscript(videoId);
  if (!transcript) return
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 2000,
    chunkOverlap: 1
  })
  const videoInfo = await getYoutubeVideoInfo(videoId)
  const docs = await splitter.splitDocuments([
    new Document({ pageContent: transcript.map(t => t.text).join(" "), metadata: videoInfo })
  ])
  if (!docs) {
    throw new Error("No Transcript");
  }

  const embedding = new OpenAIEmbeddings({
    apiKey: openaiApiKey,
    model: "text-embedding-ada-002",
  })

  const vectorStore = await AstraDBVectorStore.fromDocuments(
    docs,
    embedding,
    getAstraConfig(),
  );
  return vectorStore;
};

export default insertVectorAstra;
