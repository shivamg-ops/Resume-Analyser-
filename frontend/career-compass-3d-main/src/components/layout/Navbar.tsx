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
    <header className="sticky top-0 z-30 h-16 w-full border-b border-[#E2E8F0] bg-[#FFFFFF]/90 backdrop-blur-md px-6 flex items-center justify-between">
      {/* Title / Breadcrumbs */}
      <div>
        <div className="flex items-center gap-2 text-xs text-[#64748B]">
          <Link to="/dashboard" className="hover:text-[#635BDB] transition-colors">
            Workspace
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#CBD5E1]" />
          <span className="text-[#0F172A] font-semibold">{title || "Dashboard"}</span>
        </div>
        {subtitle && <p className="text-[11px] text-[#64748B] hidden sm:block mt-0.5">{subtitle}</p>}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Active Analysis Indicator */}
        {currentFileName && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#18A999]/30 bg-[#18A999]/10 text-xs">
            <span className="w-2 h-2 rounded-full bg-[#18A999]" />
            <span className="text-[#0E7A6E] font-medium">Active:</span>
            <span className="text-[#0F172A] font-semibold truncate max-w-[150px]">{currentFileName}</span>
          </div>
        )}

        {/* Global Action Button (Purple #635BDB) */}
        <button
          onClick={() => navigate("/upload")}
          disabled={isAnalyzing}
          className="glow-cyan-btn inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload Resume</span>
        </button>

        {/* Notifications */}
        <button
          className="relative p-2 rounded-xl border border-[#E2E8F0] text-[#64748B] hover:text-[#635BDB] hover:bg-[#F4F3FF] transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F4A340]" />
        </button>

        {/* User Avatar */}
        <Link
          to="/settings"
          className="w-8 h-8 rounded-xl border border-[#E2E8F0] bg-[#F4F3FF] flex items-center justify-center font-bold text-xs text-[#635BDB] hover:border-[#635BDB]/50 transition-colors"
        >
          SA
        </Link>
      </div>
    </header>
  );
};
