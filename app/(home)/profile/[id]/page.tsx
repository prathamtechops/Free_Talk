import { GalleryIcon, SaveIcon } from "@/components/icons";
import { ProfileMetrics } from "@/components/shared/ProfileMetrics";
import { ShareProfile } from "@/components/shared/ShareProfile";
import UserPosts from "@/components/shared/UserPosts";
import { Button, buttonVariants } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserByClerkId } from "@/lib/actions/user.actions";
import { cn } from "@/lib/utils";
import { URLProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const Profile = async ({ params }: URLProps) => {
  const { userId } = auth();

  const user = await getUserByClerkId({ clerkId: params.id });

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="grid size-full grid-cols-1  lg:grid-cols-3 lg:gap-20">
      <div className="flex min-w-[256px] flex-col items-center gap-4 rounded-lg bg-background p-8 lg:size-full lg:p-12">
        <div className="flex items-center gap-10 lg:flex-col lg:gap-4">
          <Image
            src={user?.avatar}
            alt={user?.name}
            width={150}
            height={150}
            className=" rounded-full lg:-mt-20"
          />
          <div className="">
            <h1 className="text-2xl font-bold">
              {user?.username}
              {userId !== user?.clerkId && (
                <span className="ml-2 rounded-full bg-primary px-2 text-xs font-bold text-white">
                  Action
                </span>
              )}
            </h1>
            <p className="text-sm text-muted-foreground">{user?.name}</p>
            <div className="lg:hidden">
              <ProfileMetrics
                className="mt-5 flex gap-4 lg:flex-col"
                textStyles="text-sm  font-thin"
              />
            </div>
          </div>
        </div>
        <p className="w-full p-2 text-start text-sm lg:text-center ">
          {user?.bio ? user?.bio : "No bio"}
        </p>
        <div className="hidden lg:flex">
          <ProfileMetrics
            className="flex gap-4 lg:flex-col"
            textStyles="text-lg text-muted-foreground font-bold"
          />
        </div>
        <div className="mt-auto flex w-full gap-2 lg:flex-col">
          {userId === user?.clerkId && (
            <ShareProfile
              className="self-end"
              userId={userId}
              username={user?.username}
            />
          )}
          {userId === user?.clerkId && (
            <Link
              href="/profile/edit"
              className={cn("w-full", buttonVariants({ variant: "outline" }))}
            >
              Edit Profile
            </Link>
          )}
          {userId !== user?.clerkId && (
            <Button className="w-full">Follow</Button>
          )}
          {userId !== user?.clerkId && (
            <Button className="w-full">Message</Button>
          )}
        </div>
      </div>
      <div className="size-full bg-background lg:col-span-2">
        <Tabs defaultValue="posts">
          <TabsList
            className={cn("grid w-full grid-cols-2 rounded-lg", {
              "grid-cols-1": userId !== user?.clerkId,
            })}
          >
            <TabsTrigger value="posts">
              <p className="flex items-center pb-2">
                <GalleryIcon className="size-5" />
                <span className="ml-2">Posts</span>
              </p>
            </TabsTrigger>
            {userId === user?.clerkId && (
              <TabsTrigger value="saved">
                <p className="flex items-center pb-2">
                  <SaveIcon className="size-5" />
                  <span className="ml-2">Saved</span>
                </p>
              </TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="posts">
            <UserPosts userId={user._id} />
          </TabsContent>
          {userId === user?.clerkId && (
            <TabsContent value="saved">Change your password here.</TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
