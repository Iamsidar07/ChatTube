import { useState, useRef, useEffect } from "react";
import Navbar from "./components/Navbar";
import MessageField from "./components/MessageField";
import MessageList from "./components/MessageList";
import { Message } from "./components/Message";

const MESSAGES: Message[] = [
  {
    role: "assistant",
    content:
      "Welcome to ChatTube! Chat directly with YouTube videos! 💬 Let's talk and explore together! 🚀 Tap the three dots at the top to add your OpenAI API key in settings and start chatting with videos! 🔑",
  },
];

function App() {
  const [messages, setMessages] = useState(MESSAGES);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView();
    }
  }, [messages]);
  return (
    <main className="flex flex-col h-screen pb-2">
      <Navbar />
      <MessageList messages={messages} />
      <MessageField messages={messages} setMessages={setMessages} />
    </main>
  );
}

export default App;
