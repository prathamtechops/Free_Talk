import { UserInterface } from "@/database/user.model";
import { cn } from "@/lib/utils";

export const ProfileMetrics = ({
  className,
  textStyles,
  postCount,
  followers,
  following,
}: {
  className?: string;
  textStyles?: string;
  postCount: number;
  followers: UserInterface[];
  following: UserInterface[];
}) => {
  return (
    <div className={cn("", className)}>
      <div className="flex items-center gap-2 text-xs">
        <p className={cn("space-x-1", textStyles)}>
          <span>{postCount}</span>
          <span>Posts</span>
        </p>
      </div>
      <div className="flex items-center gap-2 text-xs">
        <p className={cn("space-x-1", textStyles)}>
          <span>{followers.length}</span>
          <span>Followers</span>
        </p>
      </div>
      <div className="flex items-center gap-2 text-xs">
        <p className={cn("space-x-1", textStyles)}>
          <span>{following.length}</span>
          <span>Following</span>
        </p>
      </div>
    </div>
  );
};
