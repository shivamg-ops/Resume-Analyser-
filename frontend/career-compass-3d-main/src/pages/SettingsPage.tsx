import React, { useState } from "react";
import {
  User,
  Shield,
  Palette,
  Sliders,
  Check,
  Save,
  Bell,
  Sparkles
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export const SettingsPage: React.FC = () => {
  const [userName, setUserName] = useState("Shivam Anand");
  const [userEmail, setUserEmail] = useState("shivam@example.com");
  const [targetRolePreference, setTargetRolePreference] = useState("Full Stack Developer");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <DashboardLayout
      title="Platform Settings"
      subtitle="Manage your profile, career preferences, and analysis configurations."
    >
      <div className="max-w-4xl space-y-8">
        <form onSubmit={handleSave} className="space-y-6">
          {/* User Profile Card */}
          <div className="saas-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#635BDB]/10 border border-[#635BDB]/20 flex items-center justify-center text-[#635BDB]">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#0F172A]">Candidate Profile</h3>
                <p className="text-xs text-[#64748B]">Personal details reflected in reports and dashboards.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#0F172A] block mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#0F172A] focus:outline-none focus:border-[#635BDB]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#0F172A] block mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#0F172A] focus:outline-none focus:border-[#635BDB]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-[#0F172A] block mb-1.5">
                  Primary Career Role Focus
                </label>
                <select
                  value={targetRolePreference}
                  onChange={(e) => setTargetRolePreference(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#0F172A] focus:outline-none focus:border-[#635BDB]"
                >
                  <option value="Full Stack Developer">Full Stack Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Machine Learning Engineer">Machine Learning Engineer</option>
                  <option value="Data Scientist">Data Scientist</option>
                </select>
              </div>
            </div>
          </div>

          {/* Color & Theme Preferences */}
          <div className="saas-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#18A999]/10 border border-[#18A999]/20 flex items-center justify-center text-[#18A999]">
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#0F172A]">Theme & Visual Palette</h3>
                <p className="text-xs text-[#64748B]">Active design system configuration.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#0F172A] block">
                  Dribbble / Modern Enterprise (White + Purple + Teal + Orange)
                </span>
                <span className="text-[11px] text-[#64748B]">
                  Signature high-clarity professional interface with balanced accents.
                </span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#18A999]/10 text-[#0E7A6E]">
                Active
              </span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="submit"
              className="glow-cyan-btn inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold"
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4 text-[#18A999]" />
                  <span>Settings Saved</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Preferences</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};
