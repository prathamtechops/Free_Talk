import { UserInterface } from "@/database/user.model";
import { getCommentsByPostId } from "@/lib/actions/post.action";
import { getTimestamp } from "@/lib/utils";
import { PostPage } from "@/types";
import { AvatarInputField } from "../home/AvatarInputField";
import { Metrics } from "../shared/Metrics";
import UsersAvatar from "../shared/UsersAvatar";

interface PostInfoInterface {
  post: PostPage;
  user: UserInterface;
}

export default async function PostInfo({ post, user }: PostInfoInterface) {
  const result = await getCommentsByPostId({ postId: post._id });
  return (
    <div className="flex h-full flex-col space-y-4 p-4">
      <div className="space-y-4">
        <p className="text-muted-foreground">{post.content}</p>
      </div>
      <Metrics
        showText={false}
        textStyles="text-base"
        iconStyles="size-5"
        post={post}
        user={user}
      />
      <div className="max-h-[300px]  flex-1 space-y-4 overflow-y-auto">
        {result.comments.map((comment: any, index: number) => (
          <div key={index} className="flex items-start justify-between gap-4">
            <UsersAvatar
              avatar={comment.author?.avatar}
              name={comment.author.username}
              subText={comment.content}
            />
            <div className=" text-xs">{getTimestamp(comment.createdAt)}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4 border-t-2 py-2">
        <AvatarInputField
          postId={JSON.stringify(post._id)}
          type="comment"
          placeholder="Write a comment"
          user={JSON.parse(JSON.stringify(user))}
        />
      </div>
    </div>
  );
}
