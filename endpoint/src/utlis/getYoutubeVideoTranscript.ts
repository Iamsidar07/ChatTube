import { YoutubeTranscript } from "youtube-transcript";
interface Transcript {
  text: string
  duration: number,
  offset: number
}

export const getYoutubeVideoTranscript = async (youtubeId: string) => {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(youtubeId);
    return transcript as Transcript[];
  } catch (error) {
    console.error("FAILED getYoutubeVideoTranscript", error);
  }
};

getYoutubeVideoTranscript("aC1vuLJ9J2Q")
