import { PostLoadingSkeleton } from "@/components/posts/posts-loading-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function PostDetailsLoading() {
  return (
    <div className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostLoadingSkeleton />
      </div>
      <div className="sticky top-[5.25rem] hidden h-fit w-80 flex-none lg:block">
        <div className="bg-card w-full animate-pulse space-y-3 rounded-2xl p-5 shadow-sm">
          <div className="flex flex-col gap-3">
            <Skeleton className="size-5 w-1/2" />
            <div className="flex items-center gap-3">
              <Skeleton className="size-12 rounded-full" />
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-20 rounded" />
                <Skeleton className="h-4 w-20 rounded" />
              </div>
            </div>
          </div>
          <Skeleton className="h-12 rounded" />
        </div>
      </div>
    </div>
  );
}
