import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Cpu, MemoryStick, Library, FolderGit2, TerminalSquare, GitBranch } from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "Cross-Platform Kernel",
    description: "A hybrid kernel with process scheduling, memory management, and device driver support, compatible across mobile and desktop.",
  },
  {
    icon: MemoryStick,
    title: "Memory Management",
    description: "Advanced paging and segmentation for efficient memory usage, preventing fragmentation and ensuring process isolation.",
  },
  {
    icon: Library,
    title: "Optimized Standard Library",
    description: "A C/C++ standard library optimized for size and performance on both embedded systems and powerful desktop computers.",
  },
  {
    icon: FolderGit2,
    title: "Unified File System",
    description: "A versatile file system supporting efficient storage and retrieval, compatible with various storage mediums.",
  },
  {
    icon: TerminalSquare,
    title: "Command Line Interface",
    description: "A powerful CLI for system administration, development tasks, and scripting on the desktop version of KernelCraft.",
  },
  {
    icon: GitBranch,
    title: "Cross-Compilation Toolchain",
    description: "An easy-to-use toolchain for building and testing KernelCraft and its applications across multiple platforms and architectures.",
  },
];

export function FeatureCards() {
  return (
    <ScrollArea className="h-full">
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card/80 backdrop-blur-sm border-primary/10 hover:border-primary/40 hover:bg-muted/50 transition-colors duration-300">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg font-headline">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground font-body">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
