import { CommentIcon, SaveIcon, ShareIcon } from "@/components/icons";
import { UserInterface } from "@/database/user.model";
import { cn } from "@/lib/utils";
import { PostPage } from "@/types";
import LikeButton from "../actionButtons/LikeButton";

interface MetricInterface {
  textStyles?: string;
  showText?: boolean;
  iconStyles?: string;
  post: PostPage;
  user?: UserInterface;
}

export const Metrics =  ({
  post,
  textStyles = "",
  iconStyles = "",
  showText = true,
  user,
}: MetricInterface) => {

  return (
    <div className="flex w-full justify-between">
      <div className={cn("flex items-center gap-2 text-xs", textStyles)}>
        <CommentIcon
          className={cn("size-4 text-muted-foreground", iconStyles)}
        />
        <p className="space-x-1 ">
          <span>{post?.comments?.length}</span>
          {showText && <span>Comments</span>}
        </p>
      </div>
      <div className={cn("flex items-center gap-2 text-xs", textStyles)}>
        <LikeButton
          user={JSON.parse(JSON.stringify(user))}
          iconStyle={iconStyles}
          post={post}
          showText={showText}
        
        />
      </div>
      <div className={cn("flex items-center gap-2 text-xs", textStyles)}>
        <ShareIcon className={cn("size-4 text-muted-foreground", iconStyles)} />
        <p className="space-x-1 ">
          <span>{post?.shares?.length}</span>
          {showText && <span>Shares</span>}
        </p>
      </div>
      <div className={cn("flex items-center gap-2 text-xs", textStyles)}>
        <SaveIcon className={cn("size-4 text-muted-foreground", iconStyles)} />
        <p className="space-x-1 ">
          <span>{post?.saved?.length}</span>
          {showText && <span>Saves</span>}
        </p>
      </div>
    </div>
  );
};
