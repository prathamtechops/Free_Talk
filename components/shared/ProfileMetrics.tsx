import { cn } from "@/lib/utils";

export const ProfileMetrics = ({
  className,
  textStyles,
}: {
  className?: string;
  textStyles?: string;
}) => {
  return (
    <div className={cn("", className)}>
      <div className="flex items-center gap-2 text-xs">
        <p className={cn("space-x-1", textStyles)}>
          <span>0</span>
          <span>Posts</span>
        </p>
      </div>
      <div className="flex items-center gap-2 text-xs">
        <p className={cn("space-x-1", textStyles)}>
          <span>0</span>
          <span>Followers</span>
        </p>
      </div>
      <div className="flex items-center gap-2 text-xs">
        <p className={cn("space-x-1", textStyles)}>
          <span>0</span>
          <span>Following</span>
        </p>
      </div>
    </div>
  );
};
