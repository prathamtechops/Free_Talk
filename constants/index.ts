import {
  AddIcon,
  AvatarIcon,
  BellIcon,
  ChatIcon,
  ExploreIcon,
  HomeIcon,
  MagnifyingGlassIcon,
} from "@/components/icons";

export const navlinks: { name: string; href?: string; icon?: any }[] = [
  {
    name: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    name: "Explore",
    href: "/explore",
    icon: ExploreIcon,
  },
  {
    name: "Post",
    icon: AddIcon,
  },
  {
    name: "Chat",
    href: "/chat",
    icon: ChatIcon,
  },
  {
    name: "Notifications",
    icon: BellIcon,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: AvatarIcon,
  },
];

export const mobileNavlinks: { name: string; href?: string; icon?: any }[] = [
  {
    name: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    name: "Explore",
    href: "/explore",
    icon: ExploreIcon,
  },
  {
    name: "Post",
    icon: AddIcon,
  },
  {
    name: "Search",
    icon: MagnifyingGlassIcon,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: AvatarIcon,
  },
];
