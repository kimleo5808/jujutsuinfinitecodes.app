"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface CopyCodeButtonProps {
  code: string;
  className?: string;
}

export function CopyCodeButton({ code, className = "" }: CopyCodeButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`group flex items-center justify-center rounded-lg p-2 transition-all hover:bg-violet-100 dark:hover:bg-violet-900/30 ${className}`}
      aria-label={copied ? "Copied!" : "Copy code"}
      title={copied ? "Copied!" : "Copy code"}
    >
      {copied ? (
        <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
      ) : (
        <Copy className="h-5 w-5 text-slate-500 transition-colors group-hover:text-violet-600 dark:text-slate-400 dark:group-hover:text-violet-400" />
      )}
    </button>
  );
}
