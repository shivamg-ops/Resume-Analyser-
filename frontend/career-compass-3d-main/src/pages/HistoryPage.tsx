import React from "react";
import { useNavigate } from "react-router-dom";
import {
  History as HistoryIcon,
  FileText,
  Trash2,
  ExternalLink,
  Calendar,
  Award,
  ArrowRight
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { EmptyState } from "@/components/ui-custom/EmptyState";
import { useAnalysis } from "@/context/AnalysisContext";

export const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { analysisHistory, selectHistoryItem } = useAnalysis();

  const handleSelect = (record: any) => {
    selectHistoryItem(record);
    navigate("/ats-analysis");
  };

  return (
    <DashboardLayout
      title="Analysis History"
      subtitle="Track your resume evolution and historical ATS scores across versions."
    >
      <div className="space-y-6">
        {analysisHistory.length === 0 ? (
          <EmptyState
            title="No Analysis History Yet"
            description="All resumes you upload and analyse will be automatically catalogued here for side-by-side comparison."
            actionText="Upload First Resume"
            actionLink="/upload"
          />
        ) : (
          <div className="saas-card overflow-hidden">
            <div className="p-5 border-b border-[#E2E8F0] flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-[#0F172A]">Historical Resume Scans</h3>
                <p className="text-xs text-[#64748B]">Showing past {analysisHistory.length} analyses stored in session cache.</p>
              </div>
            </div>

            <div className="divide-y divide-[#E2E8F0]">
              {analysisHistory.map((item) => (
                <div
                  key={item.id}
                  className="p-5 hover:bg-[#F8FAFC] transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#635BDB]/10 border border-[#635BDB]/20 flex items-center justify-center text-[#635BDB] shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-[#0F172A]">{item.fileName}</h4>
                        {item.fileSize && (
                          <span className="text-[11px] text-[#64748B]">({item.fileSize})</span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-[#64748B] mt-1">
                        <span>Target Role: <strong className="text-[#0F172A]">{item.targetRole}</strong></span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {item.analyzedAt}
                        </span>
                        <span>•</span>
                        <span>{item.extractedSkills.length} skills identified</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-[#64748B] block">ATS Score</span>
                      <span className="text-lg font-extrabold text-[#18A999]">
                        {item.atsScore}%
                      </span>
                    </div>

                    <button
                      onClick={() => handleSelect(item)}
                      className="px-4 py-2 rounded-xl border border-[#E2E8F0] bg-white hover:bg-[#F4F3FF] hover:border-[#635BDB]/40 text-xs font-semibold text-[#635BDB] transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <span>View Report</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
