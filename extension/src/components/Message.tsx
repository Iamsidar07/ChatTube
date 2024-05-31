import { cn } from '@/lib/utils'
import { Sparkles, User } from 'lucide-react'
import React from 'react'
import Markdown from 'react-markdown'
import MessageSkeleton from './MessageSkeleton'
export interface Message {
  role: "user" | "assistant" | "system",
  content: string,
  isLoading?: boolean
}
const Message: React.FC<Message> = ({ role, content, isLoading }) => {
  return (
    <>
      {
        isLoading ? <MessageSkeleton /> :
          <div className={cn("flex gap-4 items-start p-4 border-b")}>
            <div className={cn("p-2 grid place-content-center text-white rounded-full bg-gradient-to-b from-pink-600 to-pink-900", {
              "bg-gradient-to-b from-black to-teal-950": role === "user"
            })}>      {
                role === "user" ? <User className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />
              }
            </div>
            <Markdown>{content}</Markdown>
          </div>
      }
    </>

  )
}

export default Message
