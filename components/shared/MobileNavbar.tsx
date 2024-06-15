"use client";
import { mobileNavlinks } from "@/constants";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AddPostDialog } from "./AddPostDialog";

export const MobileNavbar = () => {
  const { userId } = useAuth();

  const pathname = usePathname();

  return (
    <div className="flex  w-full items-center justify-between  px-8 sm:hidden ">
      {mobileNavlinks.map((link) => {
        const Icon = link.icon;

        let isActive;
        if (link.href) {
          isActive =
            (pathname?.includes(link.href) && link.href.length > 1) ||
            pathname === link.href;
        }

        if (link.name === "Profile") {
          link.href = `/profile/${userId}`;
        }

        return link.href ? (
          <Link
            className={cn("group flex flex-col justify-center items-center ", {
              "shadow-2xl": isActive,
            })}
            href={link.href}
            key={link.name}
          >
            <div className="flex flex-col  gap-4 p-2 pl-5">
              <Icon
                className={cn("group-hover:scale-125 size-5", {
                  "text-primary ": isActive,
                })}
              />
              {isActive && (
                <div className="h-1 w-full rounded-full bg-primary" />
              )}
            </div>
          </Link>
        ) : link.name === "Post" ? (
          <AddPostDialog
            trigger={
              <div
                className="group flex cursor-pointer gap-4 p-2 pl-5"
                key={link.name}
              >
                <Icon className={cn("group-hover:scale-125 size-5")} />

                <span className="hidden lg:block" key={link.name}>
                  {link.name}
                </span>
              </div>
            }
          />
        ) : (
          <div
            className="group flex cursor-pointer gap-4 p-2 pl-5"
            key={link.name}
          >
            <Icon className={cn("group-hover:scale-125 size-5")} />

            <span className="hidden lg:block" key={link.name}>
              {link.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};
