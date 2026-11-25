import React from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Clock, ArrowRight, Trash2, CheckCircle2 } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAnalysis } from "@/context/AnalysisContext";

export const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { analysisHistory, selectHistoryItem } = useAnalysis();

  return (
    <DashboardLayout
      title="Analysis History"
      subtitle="Complete chronological audit log of all evaluated resume documents."
    >
      <div className="saas-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-[#F1F5F9] font-display">
              Saved Resume Runs ({analysisHistory.length})
            </h3>
            <p className="text-xs text-[#94A3B8]">
              Click any past analysis to load its full ATS score, keywords, and job matches.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#263B43] text-[#94A3B8]">
                <th className="pb-3.5 font-semibold">Document Name</th>
                <th className="pb-3.5 font-semibold">File Size</th>
                <th className="pb-3.5 font-semibold">Target Position</th>
                <th className="pb-3.5 font-semibold">ATS Score</th>
                <th className="pb-3.5 font-semibold">Date Analyzed</th>
                <th className="pb-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#263B43]/50 text-[#F1F5F9]">
              {analysisHistory.map((rec) => (
                <tr key={rec.id} className="hover:bg-[#1B2F3A]/40 transition-colors">
                  <td className="py-4 font-medium flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#22C1C3]/10 border border-[#22C1C3]/20 flex items-center justify-center text-[#22C1C3]">
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className="truncate max-w-[220px]">{rec.fileName}</span>
                  </td>
                  <td className="py-4 text-[#94A3B8]">{rec.fileSize || "N/A"}</td>
                  <td className="py-4 text-[#94A3B8] font-medium">{rec.targetRole}</td>
                  <td className="py-4">
                    <span className="px-2.5 py-1 rounded-full font-bold text-xs bg-[#22C1C3]/15 text-[#22C1C3] border border-[#22C1C3]/30">
                      {rec.atsScore}%
                    </span>
                  </td>
                  <td className="py-4 text-[#94A3B8]">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{rec.analyzedAt}</span>
                    </div>
                  </td>
                  <td className="py-4 text-right">
                    <button
                      onClick={() => {
                        selectHistoryItem(rec);
                        navigate("/ats-analysis");
                      }}
                      className="glow-cyan-btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#0B151B]"
                    >
                      <span>Load Analysis</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

