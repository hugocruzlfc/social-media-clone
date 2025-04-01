import { submitPostAction } from "@/actions/submit-post-action";
import { useSession } from "@/components/session-provider";
import { PostsPage } from "@/lib/types";
import {
  InfiniteData,
  Query,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export function useSubmitPost() {
  const queryClient = useQueryClient();
  const { user } = useSession();

  const mutation = useMutation({
    mutationFn: submitPostAction,
    onSuccess: async (newPost) => {
      const queryFilter: QueryFilters<InfiniteData<PostsPage, string | null>> =
        {
          queryKey: ["post-feed"],
          predicate(query) {
            return (
              query.queryKey.includes("for-you") ||
              (query.queryKey.includes("user-posts") &&
                query.queryKey.includes(user.id)) ||
              false
            );
          },
        };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        (oldData) => {
          const firstPage = oldData?.pages[0];

          if (firstPage) {
            return {
              pageParams: oldData.pageParams,
              pages: [
                {
                  posts: [newPost, ...firstPage.posts],
                  nextCursor: firstPage.nextCursor,
                },
                ...oldData.pages.slice(1),
              ],
            };
          }
        },
      );

      queryClient.invalidateQueries({
        queryKey: queryFilter.queryKey,
        predicate(query) {
          return (
            (queryFilter.predicate?.(
              query as Query<
                InfiniteData<PostsPage, string | null>,
                Error,
                InfiniteData<PostsPage, string | null>,
                readonly unknown[]
              >,
            ) &&
              !query.state.data) ??
            false
          );
        },
      });

      toast.success("Post created");
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to post. Please try again.");
    },
  });

  return mutation;
}
