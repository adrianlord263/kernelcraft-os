"use client";

import { useState, useRef, useEffect } from "react";

const commands: { [key: string]: string[] } = {
  help: [
    "KernelCraft CLI - v1.0.0",
    "-------------------------",
    "Available commands:",
    "  help       - Show this help message",
    "  ls         - List files in current directory",
    "  uname      - Show system information",
    "  clear      - Clear the terminal screen",
  ],
  ls: ["kernel.bin   drivers/   lib/   users/   README.md"],
  uname: ["KernelCraft OS 1.0.0-alpha", "Architecture: Web x86_64"],
  clear: [],
};

export function CliView() {
  const [history, setHistory] = useState<({text: string, type: 'input' | 'output' | 'error' | 'system'})[]>([
    { text: "Welcome to KernelCraft OS Terminal.", type: "system" },
    { text: "Type 'help' for a list of commands.", type: "system" },
    { text: '', type: 'system'}
  ]);
  const [input, setInput] = useState("");
  const endOfHistoryRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endOfHistoryRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const command = input.trim().toLowerCase();
      let newHistory = [...history, { text: input, type: "input" as const }];

      if (command in commands) {
        if (command === "clear") {
          newHistory = [];
        } else {
          const output = commands[command].map((line) => ({ text: line, type: "output" as const }));
          newHistory.push(...output);
        }
      } else if (command) {
        newHistory.push({ text: `command not found: ${command}`, type: "error" as const });
      }

      newHistory.push({ text: '', type: 'system'});
      setHistory(newHistory);
      setInput("");
    }
  };

  return (
    <div
      className="bg-[#0D1117] text-white font-mono text-sm p-4 h-full flex flex-col overflow-y-auto"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex-grow">
        {history.map((line, index) => (
          <div key={index} className="flex whitespace-pre-wrap">
            {line.type === "input" && <span className="text-cyan-400 mr-2 shrink-0">{'>'}</span>}
            <p className={
              line.type === "error" ? "text-red-400" 
              : line.type === "system" ? "text-gray-500"
              : "text-gray-300"
            }>{line.text}</p>
          </div>
        ))}
        <div ref={endOfHistoryRef} />
      </div>
      <div className="flex items-center mt-2">
        <span className="text-cyan-400 mr-2 shrink-0">{'>'}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          className="bg-transparent border-none focus:ring-0 outline-none w-full text-gray-300"
          autoFocus
          autoComplete="off"
        />
      </div>
    </div>
  );
}
