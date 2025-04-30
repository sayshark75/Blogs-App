import { QueryClient } from "@tanstack/react-query";

let queryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (!queryClient) {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
          refetchOnWindowFocus: false,
        },
      },
    });
  }
  return queryClient;
}

const fetchBlogs = async ({ pageParam = 0 }: { pageParam: number }): Promise<BlogsResponseType> => {
  const limit = 10;
  const response = await fetch(`/api/posts?limit=${limit}&skip=${pageParam}`);
  if (!response.ok) throw new Error("Failed to fetch blogs");
  return await response.json();
};

export const blogsOptions = {
  queryKey: ["blogs"],
  queryFn: fetchBlogs,
  getNextPageParam: (lastPage: BlogsResponseType) => {
    const nextSkip = lastPage.skip + lastPage.limit;
    return nextSkip < lastPage.total ? nextSkip : undefined;
  },
  initialPageParam: 0,
};
