import React from "react";
import { Sparkles, XCircle } from "lucide-react";

interface SkillBadgeProps {
  name: string;
  type?: "matched" | "missing" | "neutral";
  size?: "sm" | "md";
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({
  name,
  type = "matched",
  size = "md",
}) => {
  const sizeClasses = size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-xs";

  if (type === "missing") {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full font-medium border border-rose-500/30 bg-rose-500/10 text-rose-300 ${sizeClasses}`}>
        <XCircle className="w-3 h-3 text-rose-400" />
        <span className="capitalize">{name}</span>
      </span>
    );
  }

  if (type === "neutral") {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full font-medium border border-[#263B43] bg-[#14232B] text-[#94A3B8] ${sizeClasses}`}>
        <span className="capitalize">{name}</span>
      </span>
    );
  }

  return (
    <span className={`badge-skill ${sizeClasses}`}>
      <Sparkles className="w-3 h-3 text-[#22C1C3]" />
      <span className="capitalize">{name}</span>
    </span>
  );
};

