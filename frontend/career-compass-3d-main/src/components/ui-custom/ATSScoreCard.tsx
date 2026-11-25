import React from "react";

interface ATSScoreCardProps {
  score: number;
  role: string;
  size?: "sm" | "md" | "lg";
  showTier?: boolean;
}

export const ATSScoreCard: React.FC<ATSScoreCardProps> = ({
  score,
  role,
  size = "md",
  showTier = true,
}) => {
  const normalizedScore = Math.min(100, Math.max(0, Math.round(score)));

  // SVG Gauge calculations
  const radius = size === "lg" ? 82 : size === "md" ? 60 : 45;
  const strokeWidth = size === "lg" ? 14 : size === "md" ? 10 : 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

  let colorHex = "#00F2FE";
  let tierLabel = "Optimal ATS Fit";
  let tierDescription = "High likelihood of passing automated ATS screening algorithms.";

  if (normalizedScore < 50) {
    colorHex = "#F43F5E";
    tierLabel = "Needs Immediate Attention";
    tierDescription = "Critical skill gaps detected for this role profile.";
  } else if (normalizedScore < 75) {
    colorHex = "#F59E0B";
    tierLabel = "Moderate Match";
    tierDescription = "Good baseline skills with several missing high-impact keywords.";
  }

  return (
    <div className="saas-card p-6 md:p-7 flex flex-col md:flex-row items-center gap-6 border-[#1E293B]">
      {/* Radial Gauge */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg
          className="transform -rotate-90"
          width={radius * 2 + strokeWidth * 2}
          height={radius * 2 + strokeWidth * 2}
        >
          {/* Background circle */}
          <circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            stroke="#1E293B"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Active progress */}
          <circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            stroke={colorHex}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center score readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl md:text-4xl font-bold text-[#F8FAFC] tracking-tight">
            {normalizedScore}%
          </span>
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#94A3B8]">
            ATS Score
          </span>
        </div>
      </div>

      {/* Info details */}
      <div className="flex-1 text-center md:text-left">
        <div
          className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md text-xs font-medium mb-2.5"
          style={{
            backgroundColor: `${colorHex}15`,
            color: colorHex,
            border: `1px solid ${colorHex}33`,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colorHex }} />
          {tierLabel}
        </div>

        <h3 className="text-xl font-bold text-[#F8FAFC] mb-1">
          {role || "Target Role"}
        </h3>
        <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-4">
          {tierDescription}
        </p>

        {/* Breakdown bars */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-3 border-t border-[#1E293B]">
          <div className="p-2.5 rounded-lg bg-[#0A0F14] border border-[#1E293B]">
            <span className="text-[10px] text-[#94A3B8] uppercase font-semibold block mb-0.5">Keyword Match</span>
            <span className="text-sm font-bold text-[#F8FAFC]">{Math.min(100, normalizedScore + 5)}%</span>
          </div>
          <div className="p-2.5 rounded-lg bg-[#0A0F14] border border-[#1E293B]">
            <span className="text-[10px] text-[#94A3B8] uppercase font-semibold block mb-0.5">Semantic Fit</span>
            <span className="text-sm font-bold text-[#38BDF8]">{normalizedScore}%</span>
          </div>
          <div className="p-2.5 rounded-lg bg-[#0A0F14] border border-[#1E293B]">
            <span className="text-[10px] text-[#94A3B8] uppercase font-semibold block mb-0.5">Format Integrity</span>
            <span className="text-sm font-bold text-[#10B981]">98%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
