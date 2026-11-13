"use client";

import { useState } from "react";
import { Copy, Check, FileCode, Braces, GitBranch, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";

export function HeroCodeWindow() {
  const [activeTab, setActiveTab] = useState<"ts" | "json">("ts");
  const [copied, setCopied] = useState(false);
  const { language } = useLanguage();

  const tsCode = `import { CodeLab } from "@pupcl/community";

// Inisialisasi wadah belajar teknologi
export const pupcl = new CodeLab({
  campus: "President University Pekanbaru",
  openTo: "All Students & Disciplines",
  focusTracks: [
    "Full-Stack Web (Next.js, TS)",
    "Mobile Apps (Flutter, Dart)",
    "Applied AI & Automations",
    "Git & Modern Team Workflow",
  ],
  readyToBuild: true,
});

// Belajar, bangun solusi, dan berkembang
await pupcl.startLearning();`;

  const jsonCode = `{
  "community": "PU Pekanbaru Code Lab",
  "acronym": "PUPCL",
  "campus": "President University Pekanbaru",
  "mission": "Empowering students through code and tech",
  "culture": [
    "Zero Prior Experience Required",
    "Peer-to-Peer Mentorship",
    "Hands-on Project Building"
  ],
  "status": "Active & Welcoming"
}`;

  const currentCode = activeTab === "ts" ? tsCode : jsonCode;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    toast.success(
      language === "en" ? "Code snippet copied!" : "Potongan kode berhasil disalin!"
    );
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl border border-neutral-700/80 dark:border-neutral-800 bg-[#0d1117] text-slate-200 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
      {/* Window Titlebar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-neutral-800/80">
        <div className="flex items-center gap-2">
          {/* macOS window controls */}
          <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block" />

          {/* File Tabs */}
          <div className="flex items-center gap-1 ml-3">
            <button
              onClick={() => setActiveTab("ts")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs transition-colors cursor-pointer ${
                activeTab === "ts"
                  ? "bg-[#0d1117] text-blue-400 font-semibold border border-neutral-700/60"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              <FileCode size={13} className="text-blue-400" />
              <span>pupcl.config.ts</span>
            </button>
            <button
              onClick={() => setActiveTab("json")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs transition-colors cursor-pointer ${
                activeTab === "json"
                  ? "bg-[#0d1117] text-amber-400 font-semibold border border-neutral-700/60"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              <Braces size={13} className="text-amber-400" />
              <span>manifest.json</span>
            </button>
          </div>
        </div>

        {/* Copy snippet button */}
        <button
          onClick={handleCopy}
          aria-label="Copy code"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check size={14} className="text-emerald-400" />
              <span className="text-emerald-400 text-[11px] font-sans">Copied</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span className="text-[11px] font-sans">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Editor Body with Clean Syntax Styling */}
      <div className="p-4 sm:p-5 overflow-x-auto leading-relaxed text-[12px] sm:text-[13px] bg-[#0d1117] min-h-[290px] flex">
        {/* Line Numbers */}
        <div className="select-none pr-4 text-neutral-600 text-right space-y-1 font-mono shrink-0">
          {(activeTab === "ts" ? tsCode : jsonCode)
            .split("\n")
            .map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
        </div>

        {/* Highlighted Code Content */}
        <div className="flex-1 space-y-1 overflow-x-auto">
          {activeTab === "ts" ? (
            <>
              <div>
                <span className="text-[#ff7b72]">import</span>{" "}
                <span className="text-[#e6edf3]">{`{ CodeLab }`}</span>{" "}
                <span className="text-[#ff7b72]">from</span>{" "}
                <span className="text-[#a5d6ff]">&quot;@pupcl/community&quot;</span>;
              </div>
              <div className="text-neutral-500 italic mt-1">
                {"// Inisialisasi wadah belajar teknologi"}
              </div>
              <div>
                <span className="text-[#ff7b72]">export const</span>{" "}
                <span className="text-[#79c0ff]">pupcl</span> ={" "}
                <span className="text-[#ff7b72]">new</span>{" "}
                <span className="text-[#ffa657]">CodeLab</span>({`{`}
              </div>
              <div className="pl-4">
                <span className="text-[#7ee787]">campus</span>:{" "}
                <span className="text-[#a5d6ff]">
                  &quot;President University Pekanbaru&quot;
                </span>,
              </div>
              <div className="pl-4">
                <span className="text-[#7ee787]">openTo</span>:{" "}
                <span className="text-[#a5d6ff]">
                  &quot;All Students &amp; Disciplines&quot;
                </span>,
              </div>
              <div className="pl-4">
                <span className="text-[#7ee787]">focusTracks</span>: [
              </div>
              <div className="pl-8 text-[#a5d6ff]">
                &quot;Full-Stack Web (Next.js, TS)&quot;,
              </div>
              <div className="pl-8 text-[#a5d6ff]">
                &quot;Mobile Apps (Flutter, Dart)&quot;,
              </div>
              <div className="pl-8 text-[#a5d6ff]">
                &quot;Applied AI &amp; Automations&quot;,
              </div>
              <div className="pl-8 text-[#a5d6ff]">
                &quot;Git &amp; Modern Team Workflow&quot;,
              </div>
              <div className="pl-4">],</div>
              <div className="pl-4">
                <span className="text-[#7ee787]">readyToBuild</span>:{" "}
                <span className="text-[#79c0ff]">true</span>,
              </div>
              <div>{`});`}</div>
              <div className="text-neutral-500 italic mt-2">
                {"// Belajar, bangun solusi, dan berkembang"}
              </div>
              <div>
                <span className="text-[#ff7b72]">await</span>{" "}
                <span className="text-[#79c0ff]">pupcl</span>.
                <span className="text-[#d2a8ff]">startLearning</span>();
              </div>
            </>
          ) : (
            <>
              <div>{`{`}</div>
              <div className="pl-4">
                <span className="text-[#7ee787]">&quot;community&quot;</span>:{" "}
                <span className="text-[#a5d6ff]">&quot;PU Pekanbaru Code Lab&quot;</span>,
              </div>
              <div className="pl-4">
                <span className="text-[#7ee787]">&quot;acronym&quot;</span>:{" "}
                <span className="text-[#a5d6ff]">&quot;PUPCL&quot;</span>,
              </div>
              <div className="pl-4">
                <span className="text-[#7ee787]">&quot;campus&quot;</span>:{" "}
                <span className="text-[#a5d6ff]">&quot;President University Pekanbaru&quot;</span>,
              </div>
              <div className="pl-4">
                <span className="text-[#7ee787]">&quot;mission&quot;</span>:{" "}
                <span className="text-[#a5d6ff]">&quot;Empowering students through code&quot;</span>,
              </div>
              <div className="pl-4">
                <span className="text-[#7ee787]">&quot;culture&quot;</span>: [
              </div>
              <div className="pl-8 text-[#a5d6ff]">
                &quot;Zero Prior Experience Required&quot;,
              </div>
              <div className="pl-8 text-[#a5d6ff]">
                &quot;Peer-to-Peer Mentorship&quot;,
              </div>
              <div className="pl-8 text-[#a5d6ff]">
                &quot;Hands-on Project Building&quot;
              </div>
              <div className="pl-4">],</div>
              <div className="pl-4">
                <span className="text-[#7ee787]">&quot;status&quot;</span>:{" "}
                <span className="text-[#a5d6ff]">&quot;Active &amp; Welcoming 🚀&quot;</span>
              </div>
              <div>{`}`}</div>
            </>
          )}
        </div>
      </div>

      {/* Editor Status Bar */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-[#161b22] border-t border-neutral-800/80 text-[11px] text-neutral-400 font-sans">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-neutral-300">
            <GitBranch size={12} className="text-blue-400" />
            <span>main</span>
          </span>
          <span className="hidden sm:inline">TypeScript 5.8</span>
          <span className="flex items-center gap-1 text-emerald-400">
            <CheckCircle2 size={12} />
            <span>Ready</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span>UTF-8</span>
          <span>LF</span>
          <span className="text-[#0047BA] dark:text-[#60a5fa] font-semibold">PUPCL</span>
        </div>
      </div>
    </div>
  );
}
