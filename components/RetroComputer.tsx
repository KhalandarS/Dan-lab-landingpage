import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChatMessage } from '../types';

// File System Types
type FileType = 'file' | 'dir';

interface FileSystemNode {
  type: FileType;
  content?: string;
  children?: { [key: string]: FileSystemNode };
}

// Initial File System Structure
const initialFileSystem: { [key: string]: FileSystemNode } = {
  Agent8: {
    type: "dir",
    children: {
      "info.txt": {
        type: "file",
        content:
          "Agent8: No-code AI agent builder.\nBuild agents using natural language prompts.\nStatus: LIVE BETA.",
      },
      "specs.md": {
        type: "file",
        content:
          "Architecture: Transformer-based cognitive engine.\nInput: Natural Language.\nOutput: Executable Agent Runtime.",
      },
    },
  },
  Zerant: {
    type: "dir",
    children: {
      "readme.txt": {
        type: "file",
        content:
          "Zerant: Agentic Mobile Browser.\nAutomates web navigation, form filling, and travel booking on mobile devices.",
      },
      "version.log": {
        type: "file",
        content:
          "v0.9.2 - Alpha\n- Added flight booking module\n- Fixed login persistence",
      },
    },
  },
  Dapify: {
    type: "dir",
    children: {
      "manifesto.txt": {
        type: "file",
        content:
          "Web3 development needs to be accessible.\nDapify allows users to generate smart contracts via prompt.\nTarget: Ethereum, Solana.",
      },
    },
  },
  AI_Glasses: {
    type: "dir",
    children: {
      "blueprint.asc": {
        type: "file",
        content:
          "[RESTRICTED] Hardware Schematics...\nDisplay: MicroLED Transparent.\nProcessor: Neural Silicon v2.\nOS: RealityOS.",
      },
    },
  },
  AGI_Research: {
    type: "dir",
    children: {
      "journal.log": {
        type: "file",
        content:
          "Day 420: Model collapse observed in sector 7. Retraining with synthetic data.\nSelf-improvement loop stability: 87%.",
      },
      "hypothesis.txt": {
        type: "file",
        content:
          "The path to AGI lies not in parameter size, but in recursive reasoning architectures.",
      },
    },
  },
  "README.txt": {
    type: "file",
    content:
      'Welcome to DAN LAB Mainframe.\nUse "ls" to view files.\nUse "cd <folder>" to navigate (cd Agent8).\nUse "cat <file>" to read files.\nType "help" to view all commands.',
  },
};

export const RetroComputer: React.FC = () => {
  const [bootSequence] = useState<string[]>([
    "Dan Lab Kernel v1.0.4",
    "MemCheck: 64TB OK",
    "Loading Filesystem ... MOUNTED",
    "Initializing Neural Interface ... ONLINE",
    "> SYSTEM READY",
  ]);

  const [bootDone, setBootDone] = useState(false);
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [isScrollable, setIsScrollable] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ---------------------------------------------------------
  // 🔥 ADDED: Command history storage
  // ---------------------------------------------------------
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // ---------------------------------------------------------
  // 🔥 ADDED: Arrow key handler
  // ---------------------------------------------------------
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();

      if (commandHistory.length === 0) return;

      const newIndex =
        historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);

      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex]);
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();

      if (historyIndex === -1) return;

      const newIndex = historyIndex + 1;

      if (newIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    }
  };

  // Smooth scroll (your original logic preserved)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    setIsScrollable(el.scrollHeight > el.clientHeight + 3);

    const isAtBottom =
      Math.abs(el.scrollHeight - (el.scrollTop + el.clientHeight)) < 10;

    if (bootDone && isAtBottom) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }

    if (el.scrollTop < 0) el.scrollTop = 0;
  }, [history, bootDone]);

  useEffect(() => {
    const timer = setTimeout(() => setBootDone(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const getPromptPath = () => {
    if (currentPath.length === 0) return "~";
    return "~/" + currentPath.join("/");
  };

  const resolvePath = (path: string[]): FileSystemNode | null => {
    let current: FileSystemNode = { type: "dir", children: initialFileSystem };
    for (const segment of path) {
      if (current.type === "dir" && current.children && current.children[segment]) {
        current = current.children[segment];
      } else return null;
    }
    return current;
  };

  const getDirectoryDetails = (node: FileSystemNode): string => {
    if (node.type !== "dir" || !node.children) return "";
    const fileContents = Object.keys(node.children)
      .filter((name) => node.children![name].type === "file")
      .map((name) => node.children![name].content || "")
      .join("\n\n");

    return fileContents;
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const rawInput = input.trim();
    const args = rawInput.split(" ");
    const cmd = args[0].toLowerCase();
    const target = args[1];

    // 🔥 Save command to commandHistory
    setCommandHistory((prev) => [...prev, rawInput]);
    setHistoryIndex(-1);

    setHistory((prev) => [
      ...prev,
      { role: "user", text: `${getPromptPath()} > ${rawInput}` },
    ]);
    setInput("");

    if (cmd === "ls") {
      const node = resolvePath(currentPath);
      if (node?.children) {
        const entries = Object.keys(node.children);
        const listing = entries
          .map((name) =>
            node.children![name].type === "dir" ? `[${name}]` : name
          )
          .join("  ");
        setHistory((prev) => [...prev, { role: "model", text: listing }]);
      }
    } else if (cmd === "cd") {
      if (!target) setCurrentPath([]);
      else if (target === "..") setCurrentPath((prev) => prev.slice(0, -1));
      else {
        const newPath = [...currentPath, target];
        const node = resolvePath(newPath);
        if (node?.type === "dir") {
          setCurrentPath(newPath);
          const details = getDirectoryDetails(node);
          if (details.trim() !== "") {
            setHistory((prev) => [...prev, { role: "model", text: details }]);
          }
        } else {
          setHistory((prev) => [
            ...prev,
            { role: "model", text: `bash: cd: ${target}: No such directory` },
          ]);
        }
      }
    } else if (cmd === "cat") {
      if (!target) {
        setHistory((prev) => [
          ...prev,
          { role: "model", text: "Usage: cat <file>" },
        ]);
      } else {
        const newPath = [...currentPath, target];
        const node = resolvePath(newPath);
        if (node?.type === "file") {
          setHistory((prev) => [
            ...prev,
            { role: "model", text: node.content || "" },
          ]);
        } else {
          setHistory((prev) => [
            ...prev,
            { role: "model", text: `cat: ${target}: No such file` },
          ]);
        }
      }
    } else if (cmd === "help") {
      setHistory((prev) => [
        ...prev,
        {
          role: "model",
          text:
            "Available commands:\n  ls\n  cd <dir>\n  cd ..\n  cat <file>\n  clear\n  whoami\n  help",
        },
      ]);
    } else if (cmd === "clear") {
      setHistory([]);
    } else if (cmd === "whoami") {
      setHistory((prev) => [
        ...prev,
        { role: "model", text: "guest@dan-lab-mainframe" },
      ]);
    } else {
      setHistory((prev) => [
        ...prev,
        {
          role: "model",
          text: `Command not found: "${cmd}". Type "help" for help.`,
        },
      ]);
    }
  };

  return (
    <div
      className="relative w-full max-w-[360px] aspect-[9/11] mx-auto perspective-1000 cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full h-full bg-[#E3DBC8] rounded-[24px] relative flex flex-col p-5 overflow-hidden"
        style={{
          boxShadow:
            "inset 2px 2px 5px rgba(255,255,255,0.7), inset -5px -5px 10px rgba(0,0,0,0.1), 15px 15px 40px rgba(0,0,0,0.2), -2px -2px 0px rgba(0,0,0,0.05)",
          borderRight: "12px solid #C4BFAE",
          borderBottom: "12px solid #B0AB9B",
          borderTop: "1px solid #F4F0E6",
          borderLeft: "1px solid #F4F0E6",
        }}
      >
        {/* SCREEN */}
        <div className="w-full h-[220px] bg-[#C4BFAE] rounded-xl p-[2px] mb-4 shadow-[inset_3px_3px_8px_rgba(0,0,0,0.15),inset_-1px_-1px_2px_rgba(255,255,255,0.2)]">
          <div className="w-full h-full bg-[#999] rounded-lg p-[4px] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2)]">
            <div
              ref={scrollRef}
              className={`w-full h-full bg-[#101214] rounded-[6px] relative ${
                isScrollable ? "overflow-y-auto" : "overflow-y-hidden"
              } overflow-x-hidden border-2 border-[#333] shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]`}
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                overscrollBehavior: "contain",
              }}
            >
              {/* Scanlines */}
              <div
                className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10 z-[20]"
                style={{
                  background:
                    "linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%), linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))",
                  backgroundSize: "100% 2px, 3px 100%",
                }}
              />

              {/* Glow */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[30] radial-gradient-glow opacity-30 mix-blend-screen" />

              {/* CONTENT */}
              <div className="p-4 font-mono text-[#00FF41] text-xs leading-relaxed">
                {/* BOOT */}
                <div className="space-y-1 mb-4">
                  {bootSequence.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>

                {/* HISTORY */}
                <div className="space-y-2">
                  {history.map((msg, i) => (
                    <div key={i}>
                      {msg.role === "user" ? (
                        <div className="text-white">{msg.text}</div>
                      ) : (
                        <div className="whitespace-pre-wrap">{msg.text}</div>
                      )}
                    </div>
                  ))}
                </div>

                {/* INPUT */}
                <form onSubmit={handleCommand} className="mt-2 flex items-center gap-2 pb-8">
                  <span>{getPromptPath()} &gt;</span>

                  <input
                    ref={inputRef}
                    value={input}
                    onKeyDown={handleKeyDown}     // 🔥 Arrow support
                    onChange={(e) => setInput(e.target.value)}
                    className="bg-transparent outline-none w-full"
                    autoFocus
                    autoComplete="off"
                    spellCheck="false"
                  />

                  <span className="w-2 h-4 bg-[#00FF41] animate-pulse" />
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* CHIN */}
        <div className="flex-1 flex items-center justify-between px-6">
          <div className="flex flex-col gap-[1px] opacity-90">
            <div className="w-5 h-[2px] bg-[#61BB46]" />
            <div className="w-5 h-[2px] bg-[#FDB827]" />
            <div className="w-5 h-[2px] bg-[#F5821F]" />
            <div className="w-5 h-[2px] bg-[#E03A3E]" />
            <div className="w-5 h-[2px] bg-[#963D97]" />
            <div className="w-5 h-[2px] bg-[#009DDC]" />
          </div>

          <div className="w-32 h-[5px] bg-[#333] rounded-full shadow-inner"></div>
        </div>
      </motion.div>

      {/* FLOOR SHADOW */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[85%] h-8 bg-black/30 blur-2xl rounded-full"></div>
    </div>
  );
};
