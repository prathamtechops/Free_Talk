import {
  CommentIcon,
  HeartIcon,
  SaveIcon,
  ShareIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";

interface MetricInterface {
  comments: number;
  likes: number;
  shares: number;
  saved: number;
  textStyles?: string;
  showText?: boolean;
  iconStyles?: string;
}

const metricsData = [
  { icon: CommentIcon, countKey: "comments" as const, label: "Comments" },
  { icon: HeartIcon, countKey: "likes" as const, label: "Likes" },
  { icon: ShareIcon, countKey: "shares" as const, label: "Shares" },
  { icon: SaveIcon, countKey: "saved" as const, label: "Saves" },
];

export const Metrics = ({
  comments = 0,
  likes = 0,
  shares = 0,
  saved = 0,
  textStyles = "",
  iconStyles = "",
  showText = true,
}: MetricInterface) => {
  const counts = { comments, likes, shares, saved };

  return (
    <div className="flex w-full justify-between">
      {metricsData.map(({ icon: Icon, countKey, label }) => (
        <div
          key={countKey}
          className={cn("flex items-center gap-2 text-xs", textStyles)}
        >
          <Icon className={cn("size-4 text-muted-foreground", iconStyles)} />
          <p className="space-x-1 ">
            <span>{counts[countKey]}</span>
            {showText && <span>{label}</span>}
          </p>
        </div>
      ))}
    </div>
  );
};
