import { getPostById } from "@/lib/actions/post.action";
import { PostPage } from "@/types";
import { useQuery } from "@tanstack/react-query";

const useGetPostById = (post: PostPage) => {
  return useQuery({
    queryKey: ["post", post._id],
    queryFn: async () => {
      return await getPostById({ postId: post._id });
    },
    initialData: post,
  });
};

export default useGetPostById;
