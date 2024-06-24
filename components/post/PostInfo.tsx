import { CommentInterface } from "@/database/comment.model";
import { Metrics } from "../shared/Metrics";
import UsersAvatar from "../shared/UsersAvatar";
import { Input } from "../ui/input";

interface PostInfoInterface {
  comments: CommentInterface[];
  likes: number;
}

export default function PostInfo({ comments, likes }: PostInfoInterface) {
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
        comments={comments.length}
        likes={likes}
        shares={0}
        saved={0}
      />
      <div className="max-h-[300px] flex-1 space-y-4 overflow-y-auto">
        {comments.map((_, index) => (
          <div key={index} className="flex items-start gap-4">
            <UsersAvatar avatar="/placeholder-user.jpg" />
            <div className="flex-1">
              Wow, this post is absolutely hilarious! The king&apos;s joke tax
              idea is genius.
            </div>
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
