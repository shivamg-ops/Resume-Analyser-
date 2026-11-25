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
    cyan: "text-[#22C1C3] bg-[#22C1C3]/10 border-[#22C1C3]/30",
    teal: "text-[#0D9488] bg-[#0D9488]/10 border-[#0D9488]/30",
    purple: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  }[accentColor];

  return (
    <div className="saas-card p-5 group">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-medium text-[#94A3B8]">{title}</span>
        <div className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-110 ${accentClasses}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-2xl font-bold tracking-tight text-[#F1F5F9] font-display">
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
