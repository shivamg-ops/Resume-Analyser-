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
  accentColor = "purple",
}) => {
  const accentClasses = {
    purple: "text-[#635BDB] bg-[#635BDB]/10 border-[#635BDB]/20",
    teal: "text-[#18A999] bg-[#18A999]/10 border-[#18A999]/20",
    cyan: "text-[#0284C7] bg-[#0284C7]/10 border-[#0284C7]/20",
    emerald: "text-[#18A999] bg-[#18A999]/10 border-[#18A999]/20",
  }[accentColor];

  return (
    <div className="saas-card p-5 group hover:border-[#635BDB]/30 transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold tracking-wide text-[#475569]">{title}</span>
        <div className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-105 ${accentClasses}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-2xl font-extrabold tracking-tight text-[#0F172A] font-display">
          {value}
        </span>
        {trend && (
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              trend.positive
                ? "text-[#0E7A6E] bg-[#18A999]/15"
                : "text-rose-600 bg-rose-500/10"
            }`}
          >
            {trend.value}
          </span>
        )}
      </div>

      {subtitle && <p className="text-xs text-[#64748B] font-medium mt-1">{subtitle}</p>}
    </div>
  );
};
