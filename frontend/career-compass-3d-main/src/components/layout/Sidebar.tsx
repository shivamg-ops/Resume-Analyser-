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
  Compass
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
      className={`fixed top-0 left-0 z-40 h-screen transition-all duration-200 border-r border-[#E2E8F0] bg-[#FFFFFF] flex flex-col ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[#E2E8F0]">
        <Link to="/" className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-8 h-8 rounded-xl bg-[#635BDB] flex items-center justify-center shrink-0 shadow-sm shadow-[#635BDB]/30">
            <Compass className="w-4 h-4 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-[#0F172A] whitespace-nowrap">
                Resume<span className="text-[#635BDB]">Analyser</span>
              </span>
            </div>
          )}
        </Link>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
        {!collapsed && (
          <div className="text-[10px] font-bold text-[#475569] uppercase tracking-wider px-3 mb-2">
            Main Menu
          </div>
        )}
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-xs transition-all duration-150 ${
                isActive
                  ? "bg-[#635BDB] text-white shadow-sm shadow-[#635BDB]/25 font-bold"
                  : "text-[#334155] hover:text-[#635BDB] hover:bg-[#F4F3FF]"
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${
                  isActive ? "text-white" : "text-[#475569] group-hover:text-[#635BDB]"
                }`}
              />
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/80" />
              )}
            </Link>
          );
        })}
      </div>

      {/* AI Model Card (Light Purple Accent) */}
      {!collapsed && (
        <div className="p-3 m-3 rounded-xl border border-[#635BDB]/20 bg-[#F4F3FF]">
          <div className="flex items-center gap-2 mb-1 text-xs font-bold text-[#635BDB]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Match Engine</span>
          </div>
          <p className="text-[11px] text-[#334155] leading-relaxed">
            Neural semantic scoring with ATS keyword calibration.
          </p>
        </div>
      )}

      {/* Footer Profile */}
      <div className="p-3 border-t border-[#E2E8F0] flex items-center gap-2.5 bg-[#FAFAFC]">
        <div className="w-8 h-8 rounded-xl bg-[#635BDB]/15 text-[#635BDB] border border-[#635BDB]/30 flex items-center justify-center font-bold text-xs shrink-0">
          SA
        </div>
        {!collapsed && (
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-[#0F172A] truncate">Shivam Anand</span>
            <span className="text-[10px] text-[#475569] truncate">shivam@example.com</span>
          </div>
        )}
      </div>
    </aside>
  );
};
