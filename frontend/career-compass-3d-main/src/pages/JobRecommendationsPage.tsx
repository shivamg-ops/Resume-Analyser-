import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  ArrowRight,
  TrendingUp,
  Award
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { JobRecommendationCard } from "@/components/ui-custom/JobRecommendationCard";
import { EmptyState } from "@/components/ui-custom/EmptyState";
import { useAnalysis } from "@/context/AnalysisContext";

export const JobRecommendationsPage: React.FC = () => {
  const { currentAnalysis, targetRole } = useAnalysis();
  const [searchQuery, setSearchQuery] = useState("");
  const [minMatch, setMinMatch] = useState<number>(0);

  if (!currentAnalysis || !currentAnalysis.job_matches) {
    return (
      <DashboardLayout
        title="Job Recommendations"
        subtitle="AI-matched career paths calibrated to your skill footprint."
      >
        <EmptyState
          title="No Job Matches Available"
          description="Upload your resume to discover compatible tech roles ranked by AI semantic match and ATS scoring."
          actionText="Upload Resume"
          actionLink="/upload"
        />
      </DashboardLayout>
    );
  }

  const matches = currentAnalysis.job_matches.filter((m) => {
    const matchesSearch = m.job.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesScore = m.ats_score >= minMatch;
    return matchesSearch && matchesScore;
  });

  return (
    <DashboardLayout
      title="Recommended Career Paths"
      subtitle="Job roles where your resume profile ranks with high candidate viability."
    >
      <div className="space-y-6">
        {/* Search & Filter Bar */}
        <div className="saas-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" />
            <input
              type="text"
              placeholder="Search job titles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#635BDB]"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <span className="text-xs text-[#64748B]">Min ATS Score:</span>
            <div className="flex items-center gap-1.5">
              {[0, 60, 75, 85].map((score) => (
                <button
                  key={score}
                  onClick={() => setMinMatch(score)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    minMatch === score
                      ? "bg-[#635BDB] text-white shadow-sm"
                      : "bg-[#F8FAFC] text-[#64748B] hover:text-[#0F172A] border border-[#E2E8F0]"
                  }`}
                >
                  {score === 0 ? "All" : `${score}%+`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((job, idx) => (
            <JobRecommendationCard
              key={idx}
              job={job}
              isTopMatch={idx === 0 && !searchQuery && minMatch === 0}
            />
          ))}
        </div>

        {matches.length === 0 && (
          <div className="saas-card p-12 text-center">
            <p className="text-sm text-[#64748B]">No job roles match the current filter criteria.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setMinMatch(0);
              }}
              className="mt-3 text-xs text-[#635BDB] font-semibold hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
