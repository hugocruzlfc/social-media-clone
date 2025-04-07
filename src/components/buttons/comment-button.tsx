import { PostData } from "@/lib/types";
import { MessageSquare } from "lucide-react";

interface CommentButtonProps {
  post: PostData;
  onClick: () => void;
}

export default function CommentButton({ post, onClick }: CommentButtonProps) {
  return (
    <button onClick={onClick} className="flex items-center gap-2">
      <MessageSquare className="size-5" />
      <span className="text-sm font-medium tabular-nums">
        {post._count.comments}{" "}
        <span className="hidden sm:inline">comments</span>
      </span>
    </button>
  );
}
