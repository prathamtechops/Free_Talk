"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { GalleryIcon, SaveIcon } from "../icons";

type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode | any;
};

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}) => {
  const [active, setActive] = useState<Tab>(propTabs[0]);
  const [tabs, setTabs] = useState<Tab[]>(propTabs);

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };

  const [hovering, setHovering] = useState(false);

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-2 select-none scrollbar-hide  items-center justify-start [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full",
          containerClassName
        )}
      >
        {propTabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => {
              moveSelectedTabToTop(idx);
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={cn("bg-background relative pt-4 px-12", tabClassName)}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {active.value === tab.value && (
              <div
                className={cn(
                  "absolute inset-0 text-primary",
                  activeTabClassName
                )}
              />
            )}

            <span
              className={cn(
                "relative  pb-2 flex gap-1 items-center justify-center",
                {
                  "border-b border-primary  text-primary":
                    active.value === tab.value,
                }
              )}
            >
              {tab.value === "posts" ? (
                <GalleryIcon className="size-5" />
              ) : (
                <SaveIcon className="size-5" />
              )}

              <span>{tab.title}</span>
            </span>
          </button>
        ))}
      </div>
      <FadeInDiv
        tabs={tabs}
        active={active}
        key={active.value}
        hovering={hovering}
        className={cn("mt-4", contentClassName)}
      />
    </>
  );
};

export const FadeInDiv = ({
  className,
  tabs,
  active,
  hovering,
}: {
  className?: string;
  key?: string;
  tabs: Tab[];
  active: Tab;
  hovering?: boolean;
}) => {
  return (
    <div className="scrollbar-hide  size-full overflow-auto bg-background ">
      {tabs.map((tab, idx) => (
        <div key={tab.value} className={cn("w-full h-full", className)}>
          {tab.content}
        </div>
      ))}
    </div>
  );
};
