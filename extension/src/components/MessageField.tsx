import { useMutation } from "@tanstack/react-query";
import { SendHorizontal } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { Message } from "./Message";
import { useToast } from "./ui/use-toast";

interface MessageFieldProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

interface QueryVideo {
  videoId: string;
  chat: Message[];
  query: string;
}

const queryVideo = async (data: QueryVideo) => {
  const apiKey = localStorage.getItem("apiKey");
  const res = await axios.post(import.meta.env.VITE_ENDPOINT!, data, {
    headers: {
      Authorization: apiKey,
    },
  });
  return res.data;
};

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

const MessageField = ({ messages, setMessages }: MessageFieldProps) => {
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const { mutate } = useMutation({
    mutationKey: ["queryVideo"],
    mutationFn: queryVideo,
    onMutate: () => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: "", isLoading: true },
      ]);
    },
    onSettled: () => {
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => !msg.isLoading),
      );
    },
    onSuccess: async (data) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: data.content },
      ]);
    },
    onError: async (error) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: error.message,
        },
      ]);
    },
  });
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const videoId = await getVideoId();
    if (message.length === 0 || !videoId) return;
    const apiKey = localStorage.getItem("apiKey");
    if (!apiKey) {
      return toast({
        title: "Please add your api key",
        description: "Please include your api key by clicking on setting icon.",
        variant: "destructive",
      });
    }
    // do mutate
    setMessages((prevMessages) => {
      const newMessage: Message = {
        role: "user",
        content: message,
      };
      const updatedMessages = [...prevMessages, newMessage];
      mutate({
        videoId,
        query: message,
        chat: messages,
      });
      return updatedMessages;
    });
    setMessage("");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-1 border mx-2 rounded-xl fixed bottom-2 inset-x-0"
    >
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="px-4 py-2.5 outline-none w-full placeholder:text-muted-foreground border-none bg-transparent"
        placeholder="Enter a query here..."
      />
      <Button
        type={"submit"}
        variant={"outline"}
        className="mr-2 outline-none border-none hover:bg-transparent"
      >
        <SendHorizontal className="w-5 h-5" />
      </Button>
    </form>
  );
};

export default MessageField;
