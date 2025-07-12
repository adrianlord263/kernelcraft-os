"use client";

import { FolderGit2, TerminalSquare, Info } from "lucide-react";
import type { App, AppID } from './desktop';
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


type DockProps = {
  apps: App[];
  openWindows: { id: AppID; zIndex: number }[];
  onAppClick: (id: AppID) => void;
};

const iconMap: Record<AppID, React.ElementType> = {
  "file-explorer": FolderGit2,
  "terminal": TerminalSquare,
  "system-info": Info,
};

export function Dock({ apps, openWindows, onAppClick }: DockProps) {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
      <TooltipProvider>
        <div className="flex items-center justify-center space-x-2 bg-card/50 backdrop-blur-md p-2 rounded-xl border border-primary/20 shadow-lg transition-all duration-300">
          {apps.map((app) => {
            const Icon = iconMap[app.id];
            const isOpen = openWindows.some(win => win.id === app.id);
            return (
              <Tooltip key={app.id}>
                <TooltipTrigger asChild>
                  <div className="relative flex flex-col items-center">
                    <button
                      onClick={() => onAppClick(app.id)}
                      className="p-3 bg-muted/50 rounded-lg hover:bg-primary/20 transition-colors duration-200 group"
                      aria-label={`Open ${app.name}`}
                    >
                      <Icon className="h-8 w-8 text-foreground group-hover:text-primary transition-colors" />
                    </button>
                    {isOpen && <div className="absolute -bottom-1.5 h-1.5 w-1.5 bg-primary rounded-full" />}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{app.name}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </TooltipProvider>
    </div>
  );
}
