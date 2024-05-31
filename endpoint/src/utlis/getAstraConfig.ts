import { AstraLibArgs } from "@langchain/community/vectorstores/astradb";
import { config } from "../config/config";

export const getAstraConfig = () => {
  const astraConfig: AstraLibArgs = {
    token: config.astraDbToken,
    endpoint: config.astraDbApiEndpoint,
    collection: config.collection,
    collectionOptions: {
      vector: {
        dimension: config.vectorDimension,
        metric: "cosine",
      },
    },
    namespace: "default_keyspace",
  };
  return astraConfig;
};
