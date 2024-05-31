import { config as envConfig } from "dotenv";
envConfig();
const { ASTRADB_TOKEN, ASTRADB_API_ENDPOINT, DIMENSION } =
  process.env;

if (!ASTRADB_API_ENDPOINT) {
  throw new Error("ASTRADB_API_ENDPOINT is required.");
}
if (!ASTRADB_TOKEN) {
  throw new Error("ASTRADB_TOKEN is required.");
}
if (!DIMENSION) {
  throw new Error("Vector dimension is required.");
}

const _config = {
  astraDbToken: ASTRADB_TOKEN,
  astraDbApiEndpoint: ASTRADB_API_ENDPOINT,
  collection: process.env.ASTRADB_COLLECTION ?? "video",
  port: process.env.PORT,
  vectorDimension: Number(DIMENSION),
  nodeEnv: process.env.NODE_ENV,
  namespace: process.env.NAMESPACE,
  octoaiToken: process.env.OCTOAI_TOKEN,
};
export const config = Object.freeze(_config);
