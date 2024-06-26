import { UserInterface } from "@/database/user.model";
import { getCommentsByPostId } from "@/lib/actions/post.action";
import { PostPage } from "@/types";
import { Metrics } from "../shared/Metrics";
import UsersAvatar from "../shared/UsersAvatar";
import { Input } from "../ui/input";

interface PostInfoInterface {
  post: PostPage;
  user: UserInterface;
}

export default async function PostInfo({ post, user }: PostInfoInterface) {
  const result = await getCommentsByPostId({ postId: post._id });
  return (
    <div className="flex h-full flex-col space-y-4 p-4">
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Once upon a time, in a far-off land, there was a very lazy king who
          spent all day lounging on his throne. One day, his advisors came to
          him with a problem: the kingdom was running out of money.
        </p>
      </div>
      <Metrics
        showText={false}
        textStyles="text-base"
        iconStyles="size-5"
        post={post}
        user={user}
      />
      <div className="max-h-[300px] flex-1 space-y-4 overflow-y-auto">
        {result.comments.map((comment, index) => (
          <div key={index} className="flex items-start gap-4">
            <UsersAvatar avatar="/placeholder-user.jpg" />
            <div className="flex-1">Jk</div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4 border-t-2 py-2">
        <UsersAvatar avatar="/placeholder-user.jpg" />
        <Input placeholder="Add a comment" />
      </div>
    </div>
  );
}
