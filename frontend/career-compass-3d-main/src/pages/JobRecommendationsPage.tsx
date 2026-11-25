import React, { useState } from "react";
import { Search, Filter, Briefcase, Sparkles } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { JobRecommendationCard } from "@/components/ui-custom/JobRecommendationCard";
import { EmptyState } from "@/components/ui-custom/EmptyState";
import { useAnalysis } from "@/context/AnalysisContext";

export const JobRecommendationsPage: React.FC = () => {
  const { currentAnalysis } = useAnalysis();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMinScore, setFilterMinScore] = useState<number>(0);

  if (!currentAnalysis) {
    return (
      <DashboardLayout
        title="Job Recommendations"
        subtitle="AI-matched career trajectories ranked by semantic compatibility and ATS score."
      >
        <EmptyState
          title="No Active Career Matches"
          description="Upload your resume to receive AI-powered job role recommendations ranked by embedding similarity."
          actionText="Upload Resume Now"
          actionLink="/upload"
        />
      </DashboardLayout>
    );
  }

  const jobs = currentAnalysis.job_matches || [];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.job.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesScore = job.ats_score >= filterMinScore;
    return matchesSearch && matchesScore;
  });

  return (
    <DashboardLayout
      title="Job Recommendations"
      subtitle="Career paths ordered by cosine similarity and ATS rule compliance."
    >
      <div className="space-y-6">
        {/* Search & Filter Toolbar */}
        <div className="saas-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by job title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0B151B] border border-[#263B43] rounded-xl pl-9 pr-4 py-2 text-xs text-[#F1F5F9] focus:outline-none focus:border-[#22C1C3]"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-xs text-[#94A3B8] whitespace-nowrap">Min ATS Score:</span>
            <select
              value={filterMinScore}
              onChange={(e) => setFilterMinScore(Number(e.target.value))}
              className="bg-[#0B151B] border border-[#263B43] rounded-xl px-3 py-2 text-xs text-[#F1F5F9] focus:outline-none focus:border-[#22C1C3]"
            >
              <option value="0">All Scores (0%+)</option>
              <option value="50">50% and above</option>
              <option value="75">75% and above</option>
              <option value="85">85% and above (Top Tier)</option>
            </select>
          </div>
        </div>

        {/* Job Cards Grid */}
        {filteredJobs.length === 0 ? (
          <EmptyState
            title="No Matching Roles Found"
            description="Try loosening your search query or minimum score filter."
            actionText="Reset Filters"
            onAction={() => {
              setSearchQuery("");
              setFilterMinScore(0);
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job, idx) => (
              <JobRecommendationCard
                key={job.job}
                job={job}
                isTopMatch={idx === 0 && searchQuery === ""}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
