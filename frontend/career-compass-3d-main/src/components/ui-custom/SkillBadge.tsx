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
      <span className={`inline-flex items-center gap-1.5 rounded-full font-semibold border border-[#F4A340]/30 bg-[#F4A340]/15 text-[#C06F11] ${sizeClasses}`}>
        <XCircle className="w-3 h-3 text-[#F4A340]" />
        <span className="capitalize">{name}</span>
      </span>
    );
  }

  if (type === "neutral") {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full font-medium border border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B] ${sizeClasses}`}>
        <span className="capitalize">{name}</span>
      </span>
    );
  }

  // Matched (Teal #18A999)
  return (
    <span className={`badge-skill ${sizeClasses}`}>
      <Sparkles className="w-3 h-3 text-[#18A999]" />
      <span className="capitalize font-semibold">{name}</span>
    </span>
  );
};
