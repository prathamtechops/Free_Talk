"use client";
import { navlinks } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AddPostDialog } from "./AddPostDialog";
import Notification from "./Notification";

export const SidebarContent = ({ clerkId }: { clerkId: string | null }) => {
  const pathname = usePathname();

  const hideLinkNames = pathname?.includes("/chat") || pathname === "/chat";

  return (
    <div className="flex flex-col space-y-4 bg-background">
      {navlinks.map((link) => {
        const Icon = link.icon;

        let isActive;
        if (link.href) {
          isActive =
            (pathname?.includes(link.href) && link.href.length > 1) ||
            pathname === link.href;
        }

        if (link.href === "/profile") {
          if (clerkId) {
            link.href = `/profile/${clerkId}`;
          }
        }

        return link.href ? (
          <Link
            className={cn("group flex items-center", {
              "shadow-2xl": isActive,
            })}
            href={link.href}
            key={link.name}
          >
            {isActive && <div className="h-full w-1 rounded-full bg-primary" />}
            <div className="flex items-center gap-4 p-2 pl-5">
              <Icon
                className={cn("group-hover:scale-125 size-5", {
                  "text-primary": isActive,
                })}
              />
              {!hideLinkNames && (
                <div
                  className={cn("hidden lg:block", {
                    "text-primary font-bold": isActive,
                  })}
                  key={link.name}
                >
                  {link.name}
                </div>
              )}
            </div>
          </Link>
        ) : link.name === "Notifications" ? (
          <Notification
            trigger={
              <div
                className="group flex cursor-pointer gap-4 p-2 pl-5"
                key={link.name}
              >
                <Icon className={cn("group-hover:scale-125 size-5")} />
                {!hideLinkNames && (
                  <span className="hidden lg:block" key={link.name}>
                    {link.name}
                  </span>
                )}
              </div>
            }
          />
        ) : (
          link.name === "Post" && (
            <AddPostDialog
              trigger={
                <div
                  className="group flex cursor-pointer gap-4 p-2 pl-5"
                  key={link.name}
                >
                  <Icon className={cn("group-hover:scale-125 size-5")} />
                  {!hideLinkNames && (
                    <span className="hidden lg:block" key={link.name}>
                      {link.name}
                    </span>
                  )}
                </div>
              }
            />
          )
        );
      })}
    </div>
  );
};
