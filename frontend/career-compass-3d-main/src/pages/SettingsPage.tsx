import React, { useState } from "react";
import { User, Bell, Palette, Shield, Save, Check } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export const SettingsPage: React.FC = () => {
  const [name, setName] = useState("Shivam Anand");
  const [email, setEmail] = useState("shivam@example.com");
  const [targetIndustry, setTargetIndustry] = useState("AI & Software Engineering");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <DashboardLayout
      title="Settings & Profile"
      subtitle="Manage your platform preferences, account attributes, and notification parameters."
    >
      <div className="max-w-3xl space-y-8">
        <form onSubmit={handleSave} className="space-y-6">
          {/* User Profile Card */}
          <div className="saas-card p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#263B43]">
              <div className="w-10 h-10 rounded-xl bg-[#22C1C3]/10 border border-[#22C1C3]/30 flex items-center justify-center text-[#22C1C3]">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#F1F5F9] text-base">Candidate Profile</h3>
                <p className="text-xs text-[#94A3B8]">Personal details associated with your ATS portfolio.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#94A3B8] block mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0B151B] border border-[#263B43] rounded-xl px-3.5 py-2.5 text-xs text-[#F1F5F9] focus:outline-none focus:border-[#22C1C3]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#94A3B8] block mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0B151B] border border-[#263B43] rounded-xl px-3.5 py-2.5 text-xs text-[#F1F5F9] focus:outline-none focus:border-[#22C1C3]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-[#94A3B8] block mb-1.5">
                  Target Domain / Track
                </label>
                <input
                  type="text"
                  value={targetIndustry}
                  onChange={(e) => setTargetIndustry(e.target.value)}
                  className="w-full bg-[#0B151B] border border-[#263B43] rounded-xl px-3.5 py-2.5 text-xs text-[#F1F5F9] focus:outline-none focus:border-[#22C1C3]"
                />
              </div>
            </div>
          </div>

          {/* Preferences & Notifications */}
          <div className="saas-card p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#263B43]">
              <div className="w-10 h-10 rounded-xl bg-[#0D9488]/10 border border-[#0D9488]/30 flex items-center justify-center text-[#0D9488]">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#F1F5F9] text-base">Alerts & Notifications</h3>
                <p className="text-xs text-[#94A3B8]">Configure automated report generation alerts.</p>
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-center justify-between p-3 rounded-xl bg-[#0B151B] border border-[#263B43] cursor-pointer">
                <div>
                  <span className="text-xs font-semibold text-[#F1F5F9] block">
                    Weekly ATS Insights Digest
                  </span>
                  <span className="text-[11px] text-[#94A3B8]">
                    Receive email summaries of emerging skills in your target role.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="accent-[#22C1C3] w-4 h-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-[#0B151B] border border-[#263B43] cursor-pointer">
                <div>
                  <span className="text-xs font-semibold text-[#F1F5F9] block">
                    High Contrast Neon Theme
                  </span>
                  <span className="text-[11px] text-[#94A3B8]">
                    Boost luminosity of cyan and teal accents across all dashboards.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={highContrast}
                  onChange={(e) => setHighContrast(e.target.checked)}
                  className="accent-[#22C1C3] w-4 h-4 cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* Save Action */}
          <div className="flex items-center justify-end gap-3 pt-2">
            {saved && (
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <Check className="w-4 h-4" /> Preferences saved!
              </span>
            )}

            <button
              type="submit"
              className="glow-cyan-btn inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs text-[#0B151B]"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

