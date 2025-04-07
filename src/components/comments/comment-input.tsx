import { useSubmitComment } from "@/hooks/use-submit-comment";
import { Loader2, SendHorizonal } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface CommentInputProps {
  postId: string;
}

export default function CommentInput({ postId }: CommentInputProps) {
  const [input, setInput] = useState("");

  const mutation = useSubmitComment(postId);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!input) return;

    mutation.mutate(
      {
        postId,
        content: input,
      },
      {
        onSuccess: () => setInput(""),
      },
    );
  }

  return (
    <form className="flex w-full items-center gap-2" onSubmit={onSubmit}>
      <Input
        placeholder="Write a comment..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoFocus
      />
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        disabled={!input.trim() || mutation.isPending}
      >
        {!mutation.isPending ? (
          <SendHorizonal />
        ) : (
          <Loader2 className="animate-spin" />
        )}
      </Button>
    </form>
  );
}
