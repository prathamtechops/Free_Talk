import { getUserFeed } from "@/lib/actions/post.action";
import { getAuthenticatedUser } from "@/lib/getAuthUser";
import Feeds from "./Feeds";

const UserFeed = async () => {
  const { user } = await getAuthenticatedUser();

  if (!user) return null;

  const { posts, totalPages } = await getUserFeed({ userId: user._id });

  return <Feeds userId={user._id} posts={posts} totalPages={totalPages} />;
};

export default UserFeed;
