"use client";

import { useState, useRef, useEffect, type MouseEvent, type ReactNode } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { X, Minimize2, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

type WindowProps = {
  id: string;
  title: string;
  children: ReactNode;
  initialPosition: { x: number; y: number };
  zIndex: number;
  isFocused: boolean;
  onClose: (id: string) => void;
  onFocus: (id: string) => void;
  className?: string;
};

export function Window({ id, title, children, initialPosition, zIndex, isFocused, onClose, onFocus, className }: WindowProps) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('.window-control')) return;
    
    setIsDragging(true);
    onFocus(id);
    const windowRect = windowRef.current?.getBoundingClientRect();
    if (windowRect) {
      dragStartPos.current = {
        x: e.clientX - windowRect.left,
        y: e.clientY - windowRect.top,
      };
    }
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      if (!isDragging || !windowRef.current) return;
      
      const newX = e.clientX - dragStartPos.current.x;
      const newY = e.clientY - dragStartPos.current.y;
      
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={windowRef}
      className="absolute"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: zIndex,
        userSelect: isDragging ? 'none' : 'auto'
      }}
      onMouseDown={() => onFocus(id)}
    >
      <Card className={cn(
        "w-[640px] h-[480px] flex flex-col shadow-2xl bg-card/80 backdrop-blur-lg border-primary/20 transition-all duration-300", 
        isFocused ? "border-accent shadow-accent/20" : "border-primary/20",
        className
      )}>
        <CardHeader
          className="flex flex-row items-center justify-between p-2 bg-muted/50 rounded-t-lg cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
        >
          <span className="text-sm font-semibold truncate pl-2">{title}</span>
          <div className="flex items-center space-x-1">
            <button className="window-control p-1 rounded-full text-muted-foreground/80 hover:bg-muted-foreground/20" aria-label="Minimize">
              <Minimize2 className="h-4 w-4" />
            </button>
            <button className="window-control p-1 rounded-full text-muted-foreground/80 hover:bg-muted-foreground/20" aria-label="Maximize">
              <Maximize2 className="h-4 w-4" />
            </button>
            <button onClick={() => onClose(id)} className="window-control p-1 rounded-full text-muted-foreground/80 hover:bg-destructive/80 hover:text-destructive-foreground" aria-label="Close">
              <X className="h-4 w-4" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-0 flex-grow overflow-hidden">
          {children}
        </CardContent>
      </Card>
    </div>
  );
}
