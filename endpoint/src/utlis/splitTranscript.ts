import { Transcript } from "./constructDocs";

interface TranscriptChunk {
  content: string;
  startTime: number;
}

export const splitTranscript = (
  transcript: Transcript[],
  chunkSize: number = 30,
) => {
  if (!transcript) return [];
  const tempArr = [];
  for (let i = 0; i < transcript?.length; i++) {
    tempArr.push(transcript.slice(i, i + chunkSize));
    i += chunkSize;
  }
  const result: TranscriptChunk[] = [];
  tempArr.forEach((element) => {
    let startTime = 0;
    let content = "";
    element.forEach((item) => {
      content += item.text;
      startTime = item.duration;
    });
    result.push({ content, startTime });
  });
  return result;
};
