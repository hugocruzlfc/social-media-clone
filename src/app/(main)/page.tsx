import TrendsSidebar from "@/components/navigation/trends-sidebar";
import ForYouFeed from "@/components/posts/for-you-feed";
import PostEditor from "@/components/posts/post-editor";

export default function Home() {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        <ForYouFeed />
      </div>
      <TrendsSidebar />
    </main>
  );
}
