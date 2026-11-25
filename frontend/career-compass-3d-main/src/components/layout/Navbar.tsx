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
    <header className="sticky top-0 z-30 h-16 w-full border-b border-[#1E293B] bg-[#0A0F14]/90 backdrop-blur-md px-6 flex items-center justify-between">
      {/* Title / Breadcrumbs */}
      <div>
        <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
          <Link to="/dashboard" className="hover:text-[#38BDF8] transition-colors">
            Workspace
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#334155]" />
          <span className="text-[#F8FAFC] font-semibold">{title || "Dashboard"}</span>
        </div>
        {subtitle && <p className="text-[11px] text-[#94A3B8] hidden sm:block mt-0.5">{subtitle}</p>}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Active Analysis Indicator */}
        {currentFileName && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#1E293B] bg-[#111822] text-xs">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span className="text-[#94A3B8]">Active:</span>
            <span className="text-[#F8FAFC] font-medium truncate max-w-[150px]">{currentFileName}</span>
          </div>
        )}

        {/* Global Action Button */}
        <button
          onClick={() => navigate("/upload")}
          disabled={isAnalyzing}
          className="glow-cyan-btn inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload Resume</span>
        </button>

        {/* User Avatar */}
        <Link
          to="/settings"
          className="w-8 h-8 rounded-lg border border-[#1E293B] bg-[#111822] flex items-center justify-center font-bold text-xs text-[#38BDF8] hover:border-[#38BDF8]/40 transition-colors"
        >
          SA
        </Link>
      </div>
    </header>
  );
};
