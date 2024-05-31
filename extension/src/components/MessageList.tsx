import React, { useRef, useEffect } from "react";
import Message, { Message as IMessage } from "./Message";

interface MessageListProps {
  messages: IMessage[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex-1 relative">
      <div className="-z-10 absolute -top-0 left-0 rounded-full w-64 h-64 bg-teal-950 filter blur-[15rem]" />
      {messages?.map((message, i) => (
        <Message
          key={i}
          role={message.role}
          content={message.content}
          isLoading={message.isLoading}
        />
      ))}
      <div ref={lastMessageRef} />
    </div>
  );
};

export default MessageList;
