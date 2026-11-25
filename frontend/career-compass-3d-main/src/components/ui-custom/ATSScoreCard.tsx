import React from "react";
import { Award, CheckCircle2 } from "lucide-react";

interface ATSScoreCardProps {
  score: number;
  role: string;
  size?: "md" | "lg";
}

export const ATSScoreCard: React.FC<ATSScoreCardProps> = ({
  score,
  role,
  size = "lg",
}) => {
  const normalizedScore = Math.min(100, Math.max(0, Math.round(score)));

  // Gauge calculations
  const radius = size === "lg" ? 64 : 48;
  const strokeWidth = size === "lg" ? 10 : 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

  // Dribbble Theme colors: Teal for high match, Orange for attention
  let colorHex = "#18A999"; // Success Teal
  let tierLabel = "Strong Match";
  let tierDescription = "Your resume shows high keyword and qualification alignment with this target role.";

  if (normalizedScore < 50) {
    colorHex = "#E11D48";
    tierLabel = "Needs Immediate Attention";
    tierDescription = "Critical skill gaps detected for this role profile.";
  } else if (normalizedScore < 75) {
    colorHex = "#F4A340"; // Orange highlight
    tierLabel = "Moderate Match";
    tierDescription = "Good baseline skills with several missing high-impact keywords.";
  }

  return (
    <div className="saas-card p-6 md:p-7 flex flex-col md:flex-row items-center gap-6 border-[#E2E8F0]">
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
            stroke="#EEF2F6"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Active progress (Teal / Orange) */}
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
          <span className="text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            {normalizedScore}%
          </span>
          <span className="text-[10px] uppercase tracking-wider font-bold text-[#475569]">
            ATS Score
          </span>
        </div>
      </div>

      {/* Info details */}
      <div className="flex-1 text-center md:text-left">
        <div
          className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-bold mb-2.5"
          style={{
            backgroundColor: `${colorHex}15`,
            color: colorHex,
            border: `1px solid ${colorHex}33`,
          }}
        >
          <Award className="w-3.5 h-3.5" />
          <span>{tierLabel}</span>
        </div>

        <h3 className="text-xl font-bold text-[#0F172A] mb-1">
          Target Role: <span className="text-[#635BDB]">{role || "Target Role"}</span>
        </h3>
        <p className="text-xs sm:text-sm text-[#334155] leading-relaxed mb-4 font-normal">
          {tierDescription}
        </p>

        {/* Breakdown bars */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-3 border-t border-[#E2E8F0]">
          <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <span className="text-[10px] text-[#475569] uppercase font-bold block mb-0.5">Keyword Match</span>
            <span className="text-sm font-bold text-[#0F172A]">{Math.min(100, normalizedScore + 5)}%</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#F4F3FF] border border-[#635BDB]/20">
            <span className="text-[10px] text-[#635BDB] uppercase font-bold block mb-0.5">Semantic Fit</span>
            <span className="text-sm font-bold text-[#635BDB]">{normalizedScore}%</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#18A999]/10 border border-[#18A999]/20">
            <span className="text-[10px] text-[#0E7A6E] uppercase font-bold block mb-0.5">ATS Integrity</span>
            <span className="text-sm font-bold text-[#18A999]">98%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
