import { GalleryIcon } from "@/components/icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserSessionTypes } from "@/types";

export const HomePostField = ({ user }: UserSessionTypes) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Want to share something?</CardTitle>
      </CardHeader>
      <div className="border-b-2" />
      <CardContent className="flex items-center">
        <div className="flex w-full">
          {/* <UsersAvatar avatar={user?.avatar} /> */}
          <Input
            placeholder="What's on your mind?"
            className="border-none shadow-none focus:bg-background focus:ring-0 focus-visible:bg-background focus-visible:ring-0 "
          />
        </div>
        <GalleryIcon className="ml-2 size-6 text-muted-foreground" />
      </CardContent>
    </Card>
  );
};
