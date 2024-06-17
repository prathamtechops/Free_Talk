import {
  CommentIcon,
  HeartIcon,
  MenuIcon,
  SaveIcon,
  ShareIcon,
} from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MessageCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PostPage() {
  return (
    <div className="mx-auto w-full">
      <Card className="rounded-none border-0 shadow-none">
        <CardHeader className="flex flex-row items-center p-4">
          <Link
            href="#"
            className="flex items-center gap-2 text-sm font-semibold"
            prefetch={false}
          >
            <Avatar className="size-8 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            Acme Inc
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
        <CardContent className="p-0">
          <Image
            src="/placeholder.svg"
            width={600}
            height={600}
            alt="Image"
            className="aspect-square object-cover"
          />
        </CardContent>
        <CardFooter className="grid gap-2 p-2 pb-4">
          <div className="flex w-full items-center">
            <Button variant="ghost" size="icon">
              <HeartIcon className="size-4" />
              <span className="sr-only">Like</span>
            </Button>
            <Button variant="ghost" size="icon">
              <MessageCircleIcon className="size-4" />
              <span className="sr-only">Comment</span>
            </Button>
            <Button variant="ghost" size="icon">
              <ShareIcon className="size-4" />
              <span className="sr-only">Share</span>
            </Button>
            <Button variant="ghost" size="icon" className="ml-auto">
              <CommentIcon className="size-4" />
              <span className="sr-only">Comment</span>
            </Button>
          </div>
          <div className="grid w-full gap-1.5 px-2 text-sm">
            <div>
              <Link href="#" className="font-medium" prefetch={false}>
                john
              </Link>
              Wow, this photo is absolutely stunning! 😍✨
            </div>
            <div>
              <Link href="#" className="font-medium" prefetch={false}>
                amelia
              </Link>
              This post just made my day! 😃👍
            </div>
            <div>
              <Link href="#" className="font-medium" prefetch={false}>
                shadcn
              </Link>
              Great shot! 🔥
            </div>
            <div>
              <Link href="#" className="font-medium" prefetch={false}>
                olivia
              </Link>
              Love the composition! 👌
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
