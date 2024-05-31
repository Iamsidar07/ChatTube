import { AstraDB } from "@datastax/astra-db-ts";
import { config } from "./config";

export const db = new AstraDB(
  config.astraDbToken,
  config.astraDbApiEndpoint,
  config.namespace,
);

const connectToDB = async () => {
  try {
    await db.connect();
    console.log("Connected to AstraDB:");
  } catch (error) {
    console.error("failed to connect to db.");
    process.exit(1);
  }
};

export default connectToDB;
