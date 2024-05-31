import { Skeleton } from "@/components/ui/skeleton"

const MessageSkeleton = () => {
  return (
    <div className="flex items-center space-x-4 p-4 border-t border-border ">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-2 w-full">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-1/2" />
      </div>
    </div>
  )
}

export default MessageSkeleton
