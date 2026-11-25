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
      className={`fixed top-0 left-0 z-40 h-screen transition-all duration-200 border-r border-[#1E293B] bg-[#0A0F14] flex flex-col ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[#1E293B]">
        <Link to="/" className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-[#0284C7] flex items-center justify-center shrink-0">
            <Bot className="w-4 h-4 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-[#F8FAFC] whitespace-nowrap">
                Resume<span className="text-[#38BDF8]">Analyser</span>
              </span>
            </div>
          )}
        </Link>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#111822] transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
        {!collapsed && (
          <div className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider px-3 mb-2">
            Navigation
          </div>
        )}
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`group flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-xs transition-colors ${
                isActive
                  ? "bg-[#1E293B] text-[#38BDF8] font-semibold"
                  : "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#111822]"
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${
                  isActive ? "text-[#38BDF8]" : "text-[#64748B] group-hover:text-[#94A3B8]"
                }`}
              />
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Model Tier Card */}
      {!collapsed && (
        <div className="p-3 m-2.5 rounded-lg border border-[#1E293B] bg-[#111822]">
          <div className="flex items-center gap-2 mb-1 text-xs font-semibold text-[#38BDF8]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Match Engine</span>
          </div>
          <p className="text-[11px] text-[#94A3B8] leading-relaxed">
            all-MiniLM-L6-v2 embeddings active.
          </p>
        </div>
      )}

      {/* Footer Profile */}
      <div className="p-3 border-t border-[#1E293B] flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-[#1E293B] border border-[#334155] flex items-center justify-center font-bold text-xs text-[#38BDF8] shrink-0">
          SA
        </div>
        {!collapsed && (
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-medium text-[#F8FAFC] truncate">Shivam Anand</span>
            <span className="text-[10px] text-[#64748B] truncate">shivam@example.com</span>
          </div>
        )}
      </div>
    </aside>
  );
};
