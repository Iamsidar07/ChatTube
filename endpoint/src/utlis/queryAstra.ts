import { AstraDBVectorStore } from "@langchain/community/vectorstores/astradb";
import { getAstraConfig } from "./getAstraConfig";
import createHttpError from "http-errors";
import { OpenAIEmbeddings } from "@langchain/openai"
import OpenAI from 'openai';

export interface Chat {
  role: string;
  content: string;
}

export interface QueryAstra {
  query: string;
  videoId: string;
  chat: Chat[];
  openaiApiKey: string
}

const queryAstra = async ({ query, videoId, chat = [], openaiApiKey }: QueryAstra) => {
  const openai = new OpenAI({
    apiKey: openaiApiKey
  })
  const embeddings = new OpenAIEmbeddings({
    apiKey: openaiApiKey,
    model: "text-embedding-ada-002",
  })

  const astraConfig = getAstraConfig();
  try {
    const vectorStore = await AstraDBVectorStore.fromExistingIndex(
      embeddings,
      astraConfig,
    );
    const similaritySearchResult = await vectorStore.similaritySearch(
      query,
      2,
      {
        videoId,
      },
    );
    const result = similaritySearchResult
      .map((res) => {
        return res.pageContent;
      })
      .join(" ");
    // @ts-expect-error: create Method causing error
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a youtube helper bot. 
            Your job is to help answer questions about a video based on the vector 
            database results that are given to you. Please keep your answers brief. `,
        },

        ...(chat.length > 0 ? chat : []),
        {
          role: "user",
          content: `User Query: ${query}
vector search result: ${result}`,
        },
      ],
      max_tokens: 2000,
    });
    return {
      content: chatCompletion.choices[0].message.content,
      avatar: similaritySearchResult[0].metadata.author_thumbnail,
    };
  } catch (error) {
    console.log(error);
    return createHttpError("Something went wrong");
  }
};
export default queryAstra;
