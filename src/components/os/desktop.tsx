"use client";

import { useState, type ReactNode } from 'react';
import { Dock } from './dock';
import { Window } from './window';
import { FileExplorerView } from './file-explorer-view';
import { CliView } from './cli-view';
import { FeatureCards } from './feature-cards';

export type AppID = "file-explorer" | "terminal" | "system-info";

export type App = {
    id: AppID;
    name: string;
    component: ReactNode;
};

type OpenWindow = {
    id: AppID;
    zIndex: number;
    position: { x: number; y: number };
}

const apps: App[] = [
    { id: 'file-explorer', name: 'File Explorer', component: <FileExplorerView /> },
    { id: 'terminal', name: 'Terminal', component: <CliView /> },
    { id: 'system-info', name: 'System Info', component: <FeatureCards /> },
];

const initialPositions: { [key in AppID]: { x: number, y: number } } = {
  "file-explorer": { x: 100, y: 50 },
  "terminal": { x: 700, y: 80 },
  "system-info": { x: 150, y: 120 },
};

export default function Desktop() {
    const [openWindows, setOpenWindows] = useState<OpenWindow[]>([
        { id: 'system-info', zIndex: 1, position: initialPositions['system-info'] }
    ]);

    const focusWindow = (id: AppID) => {
        setOpenWindows((prev) => {
            const maxZ = prev.reduce((max, win) => Math.max(max, win.zIndex), 0);
            const windowToFocus = prev.find((win) => win.id === id);
            if (!windowToFocus || (prev.length > 1 && windowToFocus.zIndex === maxZ)) {
                return prev;
            }
            
            return prev.map((win) =>
                win.id === id ? { ...win, zIndex: maxZ + 1 } : win
            );
        });
    };

    const handleAppClick = (id: AppID) => {
        const existingWindowIndex = openWindows.findIndex(win => win.id === id);

        if (existingWindowIndex !== -1) {
            focusWindow(id);
        } else {
            const maxZ = openWindows.reduce((max, win) => Math.max(max, win.zIndex), 0);
            setOpenWindows(prev => [
                ...prev,
                { id, zIndex: maxZ + 1, position: initialPositions[id] }
            ]);
        }
    };
    
    const closeWindow = (id: AppID) => {
        setOpenWindows(prev => prev.filter(win => win.id !== id));
    };

    const maxZ = openWindows.reduce((max, win) => Math.max(max, win.zIndex), 0);

    return (
        <div className="relative h-full w-full os-desktop-bg">
            <div className="relative h-full w-full">
                {openWindows.map((win) => {
                    const app = apps.find(a => a.id === win.id);
                    if (!app) return null;
                    return (
                        <Window
                            key={win.id}
                            id={win.id}
                            title={app.name}
                            initialPosition={win.position}
                            zIndex={win.zIndex}
                            isFocused={win.zIndex === maxZ && openWindows.length > 0}
                            onClose={closeWindow}
                            onFocus={focusWindow}
                        >
                            {app.component}
                        </Window>
                    );
                })}
            </div>
            <Dock apps={apps} openWindows={openWindows} onAppClick={handleAppClick} />
        </div>
    );
}
