import TrendsSidebar from "@/components/navigation/trends-sidebar";
import Post from "@/components/posts/post";
import PostEditor from "@/components/posts/post-editor";
import { getPosts } from "@/data-layer/posts";

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
      <TrendsSidebar />
    </main>
  );
}
