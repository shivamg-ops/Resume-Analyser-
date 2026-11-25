import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  accentColor?: "cyan" | "teal" | "purple" | "emerald";
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  accentColor = "cyan",
}) => {
  const accentClasses = {
    cyan: "text-[#00F2FE] bg-[#00F2FE]/10 border-[#00F2FE]/30 shadow-[0_0_12px_rgba(0,242,254,0.15)]",
    teal: "text-[#2DD4BF] bg-[#2DD4BF]/10 border-[#2DD4BF]/30 shadow-[0_0_12px_rgba(45,212,191,0.15)]",
    purple: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  }[accentColor];

  return (
    <div className="saas-card p-5 group hover:border-[#00F2FE]/40 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold tracking-wide uppercase text-[#94A3B8]">{title}</span>
        <div className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-110 ${accentClasses}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-2xl font-black tracking-tight text-[#F8FAFC] font-display">
          {value}
        </span>
        {trend && (
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              trend.positive
                ? "text-emerald-400 bg-emerald-500/10"
                : "text-rose-400 bg-rose-500/10"
            }`}
          >
            {trend.value}
          </span>
        )}
      </div>

      {subtitle && <p className="text-xs text-[#94A3B8] mt-1">{subtitle}</p>}
    </div>
  );
};

