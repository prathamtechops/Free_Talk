import { MenuIcon } from "@/components/icons";
import { Metrics } from "@/components/shared/Metrics";
import UsersAvatar from "@/components/shared/UsersAvatar";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const PostCard = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <UsersAvatar avatar={""} name="John Doe" subText="2 hours ago" />

          <DropdownMenu>
            <DropdownMenuTrigger>
              <MenuIcon className="size-6 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="flex  flex-col">
        <p className="text-pretty text-sm font-thin ">
          John Doe is a great man i am john doe this i sthe post about joe doe a
          john dena man
        </p>
        {/* /TODO: Add image */}
      </CardContent>
      <div className="border-b-2" />
      <CardFooter>
        <Metrics />
      </CardFooter>
    </Card>
  );
};
