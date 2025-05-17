import {
  Facebook,
  Instagram,
  LinkedinIcon,
  XIcon,
  Youtube
} from "lucide-react";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "./ui/tooltip";
import Link from "next/link";
import { cn } from "@/lib/utils";
export const SocialMedias = [
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/irfan-sha",
    Icon: <LinkedinIcon />
  },
  {
    title: "youtube",
    href: "https://www.youtube.com",
    Icon: <Youtube />
  },
  {
    title: "Facebook",
    href: "https://www.facebook.com/irkhan143",
    Icon: <LinkedinIcon />
  },
  {
    title: "X",
    href: "https://www.x.com/irfanshah143",
    Icon: <XIcon />
  },
  {
    title: "instagram",
    href: "https://www.instagram.com/irfanshah.exe",
    Icon: <Instagram />
  }
];
interface ISocialMediaIconsProps {
  className?: string;
  iconClassName?: string;
  toolTipClassName?: string;
}
const SocialMediaIcons = ({
  className,
  iconClassName,
  toolTipClassName
}: ISocialMediaIconsProps) => {
  return (
    <TooltipProvider>
      <div className={cn("flex flex-row gap-6", className)}>
        {SocialMedias.map((item) => (
          <Tooltip key={item.title}>
            <TooltipTrigger asChild>
              <Link target="_blank"
                className={cn(
                  "flex justify-center items-center hover:text-accent-color hoverEffect border rounded-full w-8 h-8 p-2 hover:border-accent-color",
                  iconClassName
                )}
                href={item?.href}
              >
                {item?.Icon}
              </Link>
            </TooltipTrigger>
            <TooltipContent className={cn("bg-white text-black font-semibold", toolTipClassName)}>{item?.title}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default SocialMediaIcons;
