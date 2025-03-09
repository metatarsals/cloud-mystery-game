"use client";

import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export function GlowingEffectDemo() {
    const gridItemsData = [
      {
        area: "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]",
        icon: <Search className="h-4 w-4 text-black dark:text-neutral-400" />,
        title: "Start the Search",
        description: "A missing girl. A digital trail. The first clue is hidden where you least expect it."
      },
      {
        area: "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]",
        icon: <Lock className="h-4 w-4 text-black dark:text-neutral-400" />,
        title: "Encrypted Messages",
        description: "Not everything is readable at first glance. Can you decode what was meant to stay hidden?"
      },
      {
        area: "md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]",
        icon: <Box className="h-4 w-4 text-black dark:text-neutral-400" />,
        title: "Lost Files & Hidden Directories",
        description: "Scrambled texts, corrupted data, and misplaced logs—everything leads to something."
      },
      {
        area: "md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]",
        icon: <Settings className="h-4 w-4 text-black dark:text-neutral-400" />,
        title: "Digital Footprints",
        description: "The web is full of traces—DNS records, packet captures, metadata. Find what’s been left behind."
      },
      {
        area: "md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]",
        icon: <Sparkles className="h-4 w-4 text-black dark:text-neutral-400" />,
        title: "The Final Discovery",
        description: "A hidden page, an encrypted message, a choice. Will you uncover the truth?"
      }      
      ];
            
  return (
    <div className="flex items-center justify-center h-screen px-8">
    <ul className="mx-36 mb-12 grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
      {gridItemsData.map((item, index) => (
        <GridItem
        key={index}
        area={item.area}
        icon={item.icon}
        title={item.title}
        description={item.description}
        />
    ))}
    </ul>
    </div>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2.5xl border  p-2  md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 tracking-tighter">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2 ">
              {icon}
            </div>
            <div className="space-y-2">
              <h3 className="pt-0.5 font-medium text-2xl text-balancetext-white">
                {title}
              </h3>
              <h2 className="text-gray-400" >
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
