import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Search, UploadCloud, ChevronRight, Sparkles } from "lucide-react";
import { useAnalysis } from "@/context/AnalysisContext";

interface NavbarProps {
  title?: string;
  subtitle?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ title, subtitle }) => {
  const navigate = useNavigate();
  const { currentFileName, isAnalyzing } = useAnalysis();

  return (
    <header className="sticky top-0 z-30 h-16 w-full border-b border-[#263B43] bg-[#0B151B]/80 backdrop-blur-xl px-6 flex items-center justify-between">
      {/* Title / Breadcrumbs */}
      <div>
        <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
          <Link to="/dashboard" className="hover:text-[#F1F5F9] transition-colors">
            Platform
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#263B43]" />
          <span className="text-[#22C1C3] font-medium">{title || "Dashboard"}</span>
        </div>
        {subtitle && <p className="text-xs text-[#94A3B8] hidden sm:block mt-0.5">{subtitle}</p>}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Active Analysis Indicator */}
        {currentFileName && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#263B43] bg-[#14232B]/80 text-xs">
            <span className="w-2 h-2 rounded-full bg-[#22C1C3] animate-pulse" />
            <span className="text-[#94A3B8]">Active:</span>
            <span className="text-[#F1F5F9] font-medium truncate max-w-[150px]">{currentFileName}</span>
          </div>
        )}

        {/* Global Action Button */}
        <button
          onClick={() => navigate("/upload")}
          disabled={isAnalyzing}
          className="glow-cyan-btn inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-[#0B151B] transition-all"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload New</span>
        </button>

        {/* Notifications */}
        <button
          className="relative p-2 rounded-xl border border-[#263B43] text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#14232B] transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#22C1C3]" />
        </button>

        {/* User Avatar */}
        <Link
          to="/settings"
          className="w-9 h-9 rounded-xl border border-[#263B43] bg-[#14232B] flex items-center justify-center font-bold text-xs text-[#22C1C3] hover:border-[#22C1C3] transition-colors"
        >
          SA
        </Link>
      </div>
    </header>
  );
};
