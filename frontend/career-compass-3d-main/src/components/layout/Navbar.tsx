import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, UploadCloud, ChevronRight } from "lucide-react";
import { useAnalysis } from "@/context/AnalysisContext";

interface NavbarProps {
  title?: string;
  subtitle?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ title, subtitle }) => {
  const navigate = useNavigate();
  const { currentFileName, isAnalyzing } = useAnalysis();

  return (
    <header className="sticky top-0 z-30 h-16 w-full border-b border-[#1E3844] bg-[#070D12]/85 backdrop-blur-2xl px-6 flex items-center justify-between">
      {/* Title / Breadcrumbs */}
      <div>
        <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
          <Link to="/dashboard" className="hover:text-[#00F2FE] transition-colors">
            Platform
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#1E3844]" />
          <span className="text-[#00F2FE] font-bold">{title || "Dashboard"}</span>
        </div>
        {subtitle && <p className="text-[11px] text-[#94A3B8] hidden sm:block mt-0.5">{subtitle}</p>}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Active Analysis Indicator */}
        {currentFileName && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#1E3844] bg-[#0F1D24]/90 text-xs">
            <span className="w-2 h-2 rounded-full bg-[#00F2FE] animate-pulse shadow-sm shadow-[#00F2FE]" />
            <span className="text-[#94A3B8]">Active:</span>
            <span className="text-[#FFFFFF] font-semibold truncate max-w-[150px]">{currentFileName}</span>
          </div>
        )}

        {/* Global Action Button */}
        <button
          onClick={() => navigate("/upload")}
          disabled={isAnalyzing}
          className="glow-cyan-btn inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs transition-all"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload New</span>
        </button>

        {/* Notifications */}
        <button
          className="relative p-2 rounded-xl border border-[#1E3844] text-[#94A3B8] hover:text-[#00F2FE] hover:bg-[#0F1D24] transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#00F2FE] shadow-sm shadow-[#00F2FE]" />
        </button>

        {/* User Avatar */}
        <Link
          to="/settings"
          className="w-9 h-9 rounded-xl border border-[#1E3844] bg-[#0F1D24] flex items-center justify-center font-bold text-xs text-[#00F2FE] hover:border-[#00F2FE] transition-colors shadow-sm"
        >
          SA
        </Link>
      </div>
    </header>
  );
};
