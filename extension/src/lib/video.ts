export const getVideoId = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    const url = new URL(tab.url!);
    const searchParams = url.searchParams;
    const videoId = searchParams.get("v");
    return videoId;
  };