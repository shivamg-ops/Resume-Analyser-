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
  const radius = size === "lg" ? 80 : size === "md" ? 60 : 45;
  const strokeWidth = size === "lg" ? 12 : size === "md" ? 9 : 7;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

  let colorHex = "#22C1C3";
  let tierLabel = "Optimal Match";
  let tierDescription = "High likelihood of passing automated ATS screening filters.";

  if (normalizedScore < 50) {
    colorHex = "#F43F5E";
    tierLabel = "Needs Immediate Attention";
    tierDescription = "Critical skill gaps detected for this role profile.";
  } else if (normalizedScore < 75) {
    colorHex = "#F59E0B";
    tierLabel = "Moderate Match";
    tierDescription = "Good fundamentals with a few missing technical skills.";
  }

  return (
    <div className="saas-card p-6 flex flex-col md:flex-row items-center gap-6">
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
            stroke="#263B43"
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
            style={{ filter: `drop-shadow(0 0 10px ${colorHex}55)` }}
          />
        </svg>

        {/* Center score readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl md:text-4xl font-extrabold text-[#F1F5F9] font-display">
            {normalizedScore}%
          </span>
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#94A3B8]">
            ATS Score
          </span>
        </div>
      </div>

      {/* Info details */}
      <div className="flex-1 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold mb-2"
          style={{ backgroundColor: `${colorHex}15`, color: colorHex, border: `1px solid ${colorHex}33` }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colorHex }} />
          {tierLabel}
        </div>

        <h3 className="text-xl font-bold text-[#F1F5F9] mb-1">
          {role || "Target Role"}
        </h3>
        <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">
          {tierDescription}
        </p>

        {/* Breakdown bars */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-[#263B43]">
          <div>
            <span className="text-[11px] text-[#94A3B8] block">Keyword Match</span>
            <span className="text-sm font-semibold text-[#F1F5F9]">{Math.min(100, normalizedScore + 5)}%</span>
          </div>
          <div>
            <span className="text-[11px] text-[#94A3B8] block">Semantic Fit</span>
            <span className="text-sm font-semibold text-[#22C1C3]">{normalizedScore}%</span>
          </div>
          <div>
            <span className="text-[11px] text-[#94A3B8] block">Format Integrity</span>
            <span className="text-sm font-semibold text-emerald-400">98%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

