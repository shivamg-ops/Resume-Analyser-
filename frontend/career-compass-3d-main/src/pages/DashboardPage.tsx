import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FileText,
  Target,
  Brain,
  Briefcase,
  ArrowRight,
  TrendingUp,
  Sparkles,
  UploadCloud,
  CheckCircle2,
  Clock
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/ui-custom/StatCard";
import { ATSScoreCard } from "@/components/ui-custom/ATSScoreCard";
import { JobRecommendationCard } from "@/components/ui-custom/JobRecommendationCard";
import { SkillBadge } from "@/components/ui-custom/SkillBadge";
import { useAnalysis } from "@/context/AnalysisContext";

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentAnalysis, currentFileName, analysisHistory, targetRole, selectHistoryItem } = useAnalysis();

  const totalAnalyses = analysisHistory.length;
  const bestJob = currentAnalysis?.job_matches?.[0];
  const avgAts = totalAnalyses > 0
    ? Math.round(analysisHistory.reduce((acc, cur) => acc + cur.atsScore, 0) / totalAnalyses)
    : 85;

  const totalSkillsExtracted = currentAnalysis?.extracted_skills?.length || 15;
  const recommendedJobsCount = currentAnalysis?.job_matches?.length || 6;

  return (
    <DashboardLayout
      title="Executive Dashboard"
      subtitle="Overview of your resume performance, skill footprint, and job alignment."
    >
      {/* Welcome Banner (White with Soft Purple Accent) */}
      <div className="saas-card p-6 md:p-8 mb-8 bg-gradient-to-r from-white via-white to-[#F4F3FF] border-[#E2E8F0]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#635BDB]/10 text-[#635BDB] border border-[#635BDB]/20 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Engine Active</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] font-display">
              Welcome back, <span className="text-[#635BDB]">Candidate</span>
            </h2>
            <p className="text-sm text-[#64748B] max-w-xl mt-1 leading-relaxed">
              Your resume profile is currently indexed against <strong className="text-[#0F172A]">industry benchmark roles</strong>. Upload an updated version anytime to recalculate ATS match rates.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => navigate("/upload")}
              className="glow-cyan-btn inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Analyse Resume</span>
            </button>
            <Link
              to="/ats-analysis"
              className="px-5 py-3 rounded-xl border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-xs font-semibold text-[#0F172A] transition-all shadow-sm"
            >
              Full Report
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard
          title="Total Resumes Analysed"
          value={totalAnalyses}
          subtitle="All historical versions"
          icon={FileText}
          accentColor="purple"
        />
        <StatCard
          title="Average ATS Score"
          value={`${avgAts}%`}
          subtitle="Across all target roles"
          icon={Target}
          accentColor="teal"
          trend={{ value: "+4.2%", positive: true }}
        />
        <StatCard
          title="Skills Extracted"
          value={totalSkillsExtracted}
          subtitle="Identified proficiencies"
          icon={Brain}
          accentColor="purple"
        />
        <StatCard
          title="Recommended Jobs"
          value={recommendedJobsCount}
          subtitle="High compatibility matches"
          icon={Briefcase}
          accentColor="teal"
        />
      </div>

      {/* ATS Score & Skills Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 space-y-6">
          <ATSScoreCard
            score={bestJob?.ats_score ?? avgAts}
            role={bestJob?.job || targetRole}
            size="lg"
          />

          {/* Quick Extracted Skills Card */}
          <div className="saas-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-[#635BDB]" />
                <h3 className="font-bold text-base text-[#0F172A]">
                  Extracted Skills from Resume
                </h3>
              </div>
              <Link
                to="/skill-gap"
                className="text-xs font-semibold text-[#635BDB] hover:underline inline-flex items-center gap-1"
              >
                <span>Full Skill Gap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="flex flex-wrap gap-2">
              {currentAnalysis?.extracted_skills && currentAnalysis.extracted_skills.length > 0 ? (
                currentAnalysis.extracted_skills.map((skill, idx) => (
                  <SkillBadge key={idx} name={skill} type="matched" />
                ))
              ) : (
                <p className="text-xs text-[#64748B]">No skills extracted yet. Upload a resume to see identified competencies.</p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Analysis History Sidebar Card */}
        <div className="saas-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#635BDB]" />
                <h3 className="font-bold text-sm text-[#0F172A]">Recent Analyses</h3>
              </div>
              <Link to="/history" className="text-xs font-semibold text-[#635BDB] hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {analysisHistory.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  onClick={() => selectHistoryItem(item)}
                  className="p-3 rounded-xl border border-[#E2E8F0] hover:border-[#635BDB]/40 bg-[#F8FAFC] hover:bg-[#F4F3FF] cursor-pointer transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold text-[#0F172A] truncate block max-w-[170px]">
                      {item.fileName}
                    </span>
                    <span className="text-xs font-bold text-[#18A999] bg-[#18A999]/10 px-2 py-0.5 rounded-full">
                      {item.atsScore}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#64748B] mt-1.5">
                    <span>{item.targetRole}</span>
                    <span>{item.analyzedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#E2E8F0] mt-4">
            <button
              onClick={() => navigate("/upload")}
              className="w-full py-2.5 rounded-xl border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-xs font-semibold text-[#0F172A] transition-colors shadow-sm"
            >
              Upload Another Resume
            </button>
          </div>
        </div>
      </div>

      {/* Top Recommended Job Roles */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-[#0F172A]">Top Job Compatibility Matches</h3>
            <p className="text-xs text-[#64748B]">Ranked by semantic vector similarity and ATS keyword coverage.</p>
          </div>
          <Link
            to="/jobs"
            className="text-xs font-semibold text-[#635BDB] hover:underline inline-flex items-center gap-1"
          >
            <span>See All Roles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentAnalysis?.job_matches && currentAnalysis.job_matches.length > 0 ? (
            currentAnalysis.job_matches.slice(0, 3).map((job, idx) => (
              <JobRecommendationCard key={idx} job={job} isTopMatch={idx === 0} />
            ))
          ) : (
            <div className="col-span-full p-8 text-center saas-card">
              <p className="text-sm text-[#64748B]">Upload a resume to discover matched careers.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};
