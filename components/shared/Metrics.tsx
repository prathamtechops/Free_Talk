import {
  CommentIcon,
  HeartIcon,
  SaveIcon,
  ShareIcon,
} from "@/components/icons";

export const Metrics = () => {
  return (
    <div className="flex w-full justify-between">
      <div className="flex items-center gap-2 text-xs">
        <CommentIcon className="size-4 text-muted-foreground" />
        <p className="space-x-1 ">
          <span>0</span>
          <span>Comments</span>
        </p>
      </div>
      <div className="flex items-center gap-2 text-xs">
        <HeartIcon className="size-4 text-muted-foreground" />
        <p className="space-x-1 ">
          <span>0</span>
          <span>Likes</span>
        </p>
      </div>
      <div className="flex items-center gap-2 text-xs">
        <ShareIcon className="size-4 text-muted-foreground" />
        <p className="space-x-1 ">
          <span>0</span>
          <span>Shares</span>
        </p>
      </div>
      <div className="flex items-center gap-2 text-xs">
        <SaveIcon className="size-4 text-muted-foreground" />
        <p className="space-x-1 ">
          <span>0</span>
          <span>Saves</span>
        </p>
      </div>
    </div>
  );
};
