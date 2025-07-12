import { File, Folder, HardDrive } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const fileSystem = {
  name: "KernelCraft (C:)",
  icon: HardDrive,
  children: [
    {
      name: "boot",
      icon: Folder,
      children: [{ name: "kernel.bin", icon: File }, { name: "config.sys", icon: File }, { name: "bootloader.asm", icon: File }],
    },
    {
      name: "drivers",
      icon: Folder,
      children: [{ name: "video.drv", icon: File }, { name: "sound.drv", icon: File }, { name: "net.drv", icon: File }],
    },
    {
      name: "include",
      icon: Folder,
      children: [{ name: "stdio.h", icon: File }, { name: "string.h", icon: File }, { name: "vector", icon: File }],
    },
    {
      name: "lib",
      icon: Folder,
      children: [{ name: "libc.so", icon: File }, { name: "libcpp.so", icon: File }],
    },
    {
      name: "users",
      icon: Folder,
      children: [
        {
          name: "developer",
          icon: Folder,
          children: [
            { name: "scheduler.c", icon: File }, 
            { name: "memory_manager.cpp", icon: File },
            { name: "notes.txt", icon: File }
          ],
        },
      ],
    },
    { name: "LICENSE", icon: File },
    { name: "README.md", icon: File },
  ],
};

type FileNode = {
  name: string;
  icon: React.ElementType;
  children?: FileNode[];
}

const FileTree = ({ node, level = 0 }: { node: FileNode; level?: number }) => {
  const Icon = node.icon;
  return (
    <div>
      <div
        className="flex items-center space-x-2 py-1.5 px-2 rounded-md hover:bg-muted/80 transition-colors duration-150"
        style={{ paddingLeft: `${level * 1.5 + 0.5}rem` }}
      >
        <Icon className="h-4 w-4 flex-shrink-0 text-primary" />
        <span className="text-sm font-mono truncate">{node.name}</span>
      </div>
      {node.children && (
        <div>
          {node.children.map((child, index) => (
            <FileTree key={index} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export function FileExplorerView() {
  return (
    <ScrollArea className="h-full">
      <div className="p-2 h-full bg-card/50">
        <FileTree node={fileSystem} />
      </div>
    </ScrollArea>
  );
}
