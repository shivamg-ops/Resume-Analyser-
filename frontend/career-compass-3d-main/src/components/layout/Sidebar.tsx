import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  UploadCloud,
  FileCheck2,
  GitCompare,
  Briefcase,
  History,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Bot
} from "lucide-react";

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Upload Resume", icon: UploadCloud, path: "/upload" },
    { label: "ATS Analysis", icon: FileCheck2, path: "/ats-analysis" },
    { label: "Skill Gap Analysis", icon: GitCompare, path: "/skill-gap" },
    { label: "Job Matches", icon: Briefcase, path: "/jobs" },
    { label: "History", icon: History, path: "/history" },
    { label: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out border-r border-[#263B43] bg-[#0B151B]/95 backdrop-blur-2xl flex flex-col ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[#263B43]">
        <Link to="/" className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#22C1C3] to-[#0D9488] p-[1.5px] shrink-0 shadow-lg shadow-[#22C1C3]/20">
            <div className="w-full h-full bg-[#0B151B] rounded-[10px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-[#22C1C3]" />
            </div>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-display font-bold text-base tracking-tight text-[#F1F5F9] whitespace-nowrap">
                Resume<span className="text-[#22C1C3]">Analyser</span>
              </span>
              <span className="text-[10px] text-[#94A3B8] font-medium tracking-widest uppercase">
                AI Career Suite
              </span>
            </div>
          )}
        </Link>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#14232B] transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="text-[11px] font-semibold text-[#94A3B8]/60 uppercase tracking-wider px-3 mb-2">
          {!collapsed ? "Workspace" : "•••"}
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`group flex items-center gap-3.5 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-[#22C1C3]/15 to-[#0D9488]/10 text-[#22C1C3] border border-[#22C1C3]/30 shadow-sm shadow-[#22C1C3]/10"
                  : "text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#14232B]"
              }`}
            >
              <Icon
                className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${
                  isActive ? "text-[#22C1C3]" : "text-[#94A3B8] group-hover:text-[#F1F5F9]"
                }`}
              />
              {!collapsed && <span className="truncate">{item.label}</span>}
              {!collapsed && isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#22C1C3] shadow-sm shadow-[#22C1C3]" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Pro Badge Card */}
      {!collapsed && (
        <div className="p-4 m-3 rounded-xl border border-[#263B43] bg-gradient-to-b from-[#14232B] to-[#0B151B]">
          <div className="flex items-center gap-2 mb-1.5 text-xs font-semibold text-[#22C1C3]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Neural Model v2</span>
          </div>
          <p className="text-[11px] text-[#94A3B8] leading-relaxed mb-3">
            Using all-MiniLM-L6-v2 semantic embeddings for ATS scoring.
          </p>
          <div className="w-full bg-[#263B43]/50 h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#22C1C3] h-full w-4/5 rounded-full" />
          </div>
          <div className="flex justify-between items-center text-[10px] text-[#94A3B8] mt-1.5">
            <span>Accuracy Tier</span>
            <span className="text-[#F1F5F9] font-medium">99.4%</span>
          </div>
        </div>
      )}

      {/* Footer Profile */}
      <div className="p-3 border-t border-[#263B43] flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#22C1C3] to-[#0D9488] p-[1.5px] shrink-0">
          <div className="w-full h-full rounded-full bg-[#14232B] flex items-center justify-center font-bold text-xs text-[#22C1C3]">
            SA
          </div>
        </div>
        {!collapsed && (
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-[#F1F5F9] truncate">Shivam Anand</span>
            <span className="text-[10px] text-[#94A3B8] truncate">shivam@example.com</span>
          </div>
        )}
      </div>
    </aside>
  );
};

