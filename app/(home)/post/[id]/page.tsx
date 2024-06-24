import { MenuIcon, SaveIcon } from "@/components/icons";
import PostInfo from "@/components/post/PostInfo";
import UsersAvatar from "@/components/shared/UsersAvatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  getCommentsByPostId,
  getLikesByPostId,
  getPostById,
} from "@/lib/actions/post.action";
import { getTimestamp } from "@/lib/utils";
import { ParamsProps } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default async function PostPage({ params }: ParamsProps) {
  const { id } = params;

  const postId = { postId: id };

  const [post, resultComments, resultLikes] = await Promise.all([
    getPostById(postId),
    getCommentsByPostId(postId),
    getLikesByPostId(postId),
  ]);

  if (!post) {
    return null;
  }

  return (
    <div className="mx-auto h-4/5 w-full">
      <Card className="rounded-none border-0 shadow-none">
        <CardHeader className="flex flex-row items-center p-4">
          <Link href={`/profile/${post?.author?.clerkId}`}>
            <UsersAvatar
              name={post?.author?.username}
              avatar={post?.author?.avatar}
              subText={getTimestamp(post?.createdAt)}
            />
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto size-8 rounded-full"
              >
                <MenuIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <SaveIcon className="mr-2 size-4" />
                Save
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <div className="grid h-full grid-cols-3">
          <CardContent className="col-span-2 mx-auto">
            <Image
              src={post?.imageUrl}
              width={600}
              height={320}
              alt="Image"
              className="aspect-square object-cover"
            />
          </CardContent>
          <PostInfo
            likes={resultLikes.likes.length}
            comments={resultComments.comments}
          />
        </div>
      </Card>
    </div>
  );
}
