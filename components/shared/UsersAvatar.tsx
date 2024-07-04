import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { UserAvatarTypes } from "@/types";

export default function UsersAvatar({
  name,
  avatar,
  subText,
  className,
  avatarSize = "size-9",
  textClassName,
  children,
}: UserAvatarTypes) {
  return (
    <div className={cn("flex gap-3", className)}>
      <Avatar className={`${avatarSize}`}>
        <AvatarImage src={avatar} alt={name ? name[0] : ""} />
        <AvatarFallback>
          <span>{name ? name[0] : ""}</span>
        </AvatarFallback>
      </Avatar>
      {name && (
        <div className={cn("min-w-0 overflow-hidden text-xs", textClassName)}>
          <p className="truncate text-sm font-bold">{name}</p>
          <p className="truncate text-muted-foreground">{subText}</p>
        </div>
      )}
      {children && <div className="ml-auto">{children}</div>}
    </div>
  );
}
