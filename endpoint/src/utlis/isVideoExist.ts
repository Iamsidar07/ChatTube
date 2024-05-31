import { db } from "../config/db";

const isVideoExist = async (videoId: string) => {
  const collection = await db.collection("video");
  const video = await collection.findOne({ videoId });
  if (video) {
    return true;
  } else {
    return false;
  }
};

export default isVideoExist;
