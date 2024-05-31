import ytdl from "ytdl-core";
import fs from "fs/promises";
const getYoutubeVideoInfo = async (videoId: string) => {
  try {
    const info = await ytdl.getInfo(
      `https://www.youtube.com/watch?v=${videoId}`,
    );
    const videoDetail = info.videoDetails;
    const author = videoDetail.author;
    const videoObj = {
      title: videoDetail.title,
      description: videoDetail.description,
      author: videoDetail.author.name,
      // @ts-ignore
      author_thumbnail: author.thumbnails[author.thumbnails?.length - 1].url,
      thumbnail: videoDetail.thumbnails[videoDetail.thumbnails.length - 1].url,
      channel_url: author.channel_url,
      videoId,
    };
    return videoObj;
  } catch (error) {
    console.error(
      "FAILED getYoutubeVideoInfo: ",
      error instanceof Error ? error.message : error,
    );
  }
};

export default getYoutubeVideoInfo;
