import React from "react";
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
  const [collapsed, setCollapsed] = React.useState(false);

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
      className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out border-r border-[#1E3844] bg-[#070D12]/95 backdrop-blur-2xl flex flex-col ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[#1E3844]">
        <Link to="/" className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00F2FE] via-[#0EA5E9] to-[#0D9488] p-[1.5px] shrink-0 shadow-lg shadow-[#00F2FE]/25">
            <div className="w-full h-full bg-[#070D12] rounded-[10px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-[#00F2FE]" />
            </div>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-display font-bold text-base tracking-tight text-[#FFFFFF] whitespace-nowrap">
                Resume<span className="text-[#00F2FE]">Analyser</span>
              </span>
              <span className="text-[10px] text-[#94A3B8] font-semibold tracking-widest uppercase">
                AI Career Suite
              </span>
            </div>
          )}
        </Link>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#00F2FE] hover:bg-[#0F1D24] transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
        <div className="text-[11px] font-bold text-[#94A3B8]/70 uppercase tracking-wider px-3 mb-2">
          {!collapsed ? "Workspace" : "•••"}
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`group flex items-center gap-3.5 px-3 py-2.5 rounded-xl font-semibold text-xs transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-[#00F2FE]/20 to-[#0EA5E9]/10 text-[#00F2FE] border border-[#00F2FE]/40 shadow-sm shadow-[#00F2FE]/15"
                  : "text-[#94A3B8] hover:text-[#FFFFFF] hover:bg-[#0F1D24] hover:border-[#1E3844] border border-transparent"
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                  isActive ? "text-[#00F2FE]" : "text-[#94A3B8] group-hover:text-[#FFFFFF]"
                }`}
              />
              {!collapsed && <span className="truncate">{item.label}</span>}
              {!collapsed && isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#00F2FE] shadow-sm shadow-[#00F2FE]" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Pro Model Card */}
      {!collapsed && (
        <div className="p-4 m-3 rounded-2xl border border-[#1E3844] bg-gradient-to-b from-[#0F1D24] to-[#070D12] shadow-inner">
          <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-[#00F2FE]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Neural Model v2</span>
          </div>
          <p className="text-[11px] text-[#94A3B8] leading-relaxed mb-3">
            Using all-MiniLM-L6-v2 semantic embeddings for ATS scoring.
          </p>
          <div className="w-full bg-[#1E3844]/60 h-1.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-[#00F2FE] to-[#0D9488] h-full w-4/5 rounded-full" />
          </div>
          <div className="flex justify-between items-center text-[10px] text-[#94A3B8] mt-2">
            <span>Accuracy Tier</span>
            <span className="text-[#00F2FE] font-bold">99.4%</span>
          </div>
        </div>
      )}

      {/* Footer Profile */}
      <div className="p-3 border-t border-[#1E3844] flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00F2FE] to-[#0D9488] p-[1.5px] shrink-0">
          <div className="w-full h-full rounded-[10px] bg-[#0F1D24] flex items-center justify-center font-bold text-xs text-[#00F2FE]">
            SA
          </div>
        </div>
        {!collapsed && (
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-[#FFFFFF] truncate">Shivam Anand</span>
            <span className="text-[10px] text-[#94A3B8] truncate">shivam@example.com</span>
          </div>
        )}
      </div>
    </aside>
  );
};
