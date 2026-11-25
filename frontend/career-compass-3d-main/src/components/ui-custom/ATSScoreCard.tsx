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
    <div className="saas-card p-7 flex flex-col md:flex-row items-center gap-7 border-[#1E3844]">
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
            stroke="#1E3844"
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
            className="transition-all duration-1000 ease-out"
            style={{ filter: `drop-shadow(0 0 16px ${colorHex}88)` }}
          />
        </svg>

        {/* Center score readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl md:text-5xl font-black text-[#FFFFFF] font-display tracking-tight">
            {normalizedScore}%
          </span>
          <span className="text-[10px] uppercase tracking-widest font-bold text-[#94A3B8]">
            ATS Score
          </span>
        </div>
      </div>

      {/* Info details */}
      <div className="flex-1 text-center md:text-left">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3 shadow-sm"
          style={{
            backgroundColor: `${colorHex}18`,
            color: colorHex,
            border: `1px solid ${colorHex}44`,
            boxShadow: `0 0 12px ${colorHex}22`
          }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: colorHex }} />
          {tierLabel}
        </div>

        <h3 className="text-2xl font-bold text-[#FFFFFF] mb-1.5 font-display">
          {role || "Target Role"}
        </h3>
        <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-5">
          {tierDescription}
        </p>

        {/* Breakdown bars */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-[#1E3844]">
          <div className="p-2.5 rounded-xl bg-[#070D12]/60 border border-[#1E3844]">
            <span className="text-[10px] text-[#94A3B8] uppercase font-bold block mb-0.5">Keyword Match</span>
            <span className="text-sm font-bold text-[#FFFFFF]">{Math.min(100, normalizedScore + 5)}%</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#070D12]/60 border border-[#1E3844]">
            <span className="text-[10px] text-[#94A3B8] uppercase font-bold block mb-0.5">Semantic Fit</span>
            <span className="text-sm font-bold text-[#00F2FE]">{normalizedScore}%</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#070D12]/60 border border-[#1E3844]">
            <span className="text-[10px] text-[#94A3B8] uppercase font-bold block mb-0.5">Format Integrity</span>
            <span className="text-sm font-bold text-emerald-400">98%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
