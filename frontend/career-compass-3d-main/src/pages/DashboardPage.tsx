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
      {/* Welcome Banner */}
      <div className="saas-card p-6 md:p-8 mb-8 bg-gradient-to-r from-[#14232B] via-[#14232B] to-[#0D9488]/20 border-[#263B43]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22C1C3]/10 text-[#22C1C3] text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Engine Active</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#F1F5F9] font-display">
              Welcome back, <span className="text-[#22C1C3]">Candidate</span>
            </h2>
            <p className="text-sm text-[#94A3B8] max-w-xl mt-1 leading-relaxed">
              Your resume profile is currently indexed against <strong className="text-[#F1F5F9]">industry benchmark roles</strong>. Upload an updated version anytime to recalculate ATS match rates.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => navigate("/upload")}
              className="glow-cyan-btn inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs text-[#0B151B]"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Analyse Resume</span>
            </button>
            <Link
              to="/ats-analysis"
              className="px-5 py-3 rounded-xl border border-[#263B43] bg-[#14232B] hover:bg-[#1B2F3A] text-xs font-semibold text-[#F1F5F9] transition-colors"
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
          accentColor="cyan"
          trend={{ value: "+2 this week", positive: true }}
        />
        <StatCard
          title="Average ATS Score"
          value={`${avgAts}%`}
          subtitle="Target role baseline"
          icon={Target}
          accentColor="teal"
          trend={{ value: "+8% gain", positive: true }}
        />
        <StatCard
          title="Skills Extracted"
          value={totalSkillsExtracted}
          subtitle="NLP recognized keywords"
          icon={Brain}
          accentColor="purple"
        />
        <StatCard
          title="Recommended Jobs"
          value={recommendedJobsCount}
          subtitle="High compatibility roles"
          icon={Briefcase}
          accentColor="emerald"
        />
      </div>

      {/* Active Resume ATS Preview */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[#F1F5F9] font-display">
            Active ATS Analysis
          </h3>
          <Link to="/ats-analysis" className="text-xs font-semibold text-[#22C1C3] hover:underline flex items-center gap-1">
            <span>Explore Breakdown</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <ATSScoreCard
          score={bestJob?.ats_score ?? 88}
          role={bestJob?.job ?? targetRole}
          size="lg"
        />
      </div>

      {/* Two Column Grid: Top Jobs & Extracted Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Top 2 Job Matches */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#F1F5F9] font-display">
              Top Recommended Positions
            </h3>
            <Link to="/jobs" className="text-xs font-semibold text-[#22C1C3] hover:underline flex items-center gap-1">
              <span>View All ({recommendedJobsCount})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentAnalysis?.job_matches?.slice(0, 2).map((job, idx) => (
              <JobRecommendationCard key={idx} job={job} isTopMatch={idx === 0} />
            ))}
          </div>
        </div>

        {/* Skills Footprint */}
        <div className="saas-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-[#F1F5F9] text-base">Verified Skills Footprint</h4>
              <span className="text-xs text-[#22C1C3] font-semibold">
                {currentAnalysis?.extracted_skills?.length || 0} Skills
              </span>
            </div>

            <p className="text-xs text-[#94A3B8] leading-relaxed mb-4">
              AI-extracted from your resume text and mapped to industry standard taxonomies.
            </p>

            <div className="flex flex-wrap gap-2">
              {(currentAnalysis?.extracted_skills || [
                "python", "django", "react", "javascript", "sql", "pytorch", "deep learning", "nlp"
              ]).map((skill, idx) => (
                <SkillBadge key={idx} name={skill} type="matched" size="sm" />
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-[#263B43] mt-6">
            <Link
              to="/skill-gap"
              className="text-xs font-semibold text-[#22C1C3] hover:underline flex items-center justify-between"
            >
              <span>Analyze Missing Skills</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent History Table */}
      <div className="saas-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-[#F1F5F9] font-display">Recent Resume Analyses</h3>
            <p className="text-xs text-[#94A3B8]">Audit trail of uploaded documents and ATS benchmark results.</p>
          </div>
          <Link to="/history" className="text-xs font-semibold text-[#22C1C3] hover:underline">
            Full History
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#263B43] text-[#94A3B8]">
                <th className="pb-3 font-semibold">Document Name</th>
                <th className="pb-3 font-semibold">Target Position</th>
                <th className="pb-3 font-semibold">ATS Score</th>
                <th className="pb-3 font-semibold">Date Analyzed</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#263B43]/50 text-[#F1F5F9]">
              {analysisHistory.slice(0, 4).map((rec) => (
                <tr key={rec.id} className="hover:bg-[#1B2F3A]/40 transition-colors">
                  <td className="py-3.5 font-medium flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#22C1C3]" />
                    <span className="truncate max-w-[200px]">{rec.fileName}</span>
                  </td>
                  <td className="py-3.5 text-[#94A3B8]">{rec.targetRole}</td>
                  <td className="py-3.5">
                    <span className="px-2.5 py-0.5 rounded-full font-semibold text-xs bg-[#22C1C3]/10 text-[#22C1C3] border border-[#22C1C3]/20">
                      {rec.atsScore}%
                    </span>
                  </td>
                  <td className="py-3.5 text-[#94A3B8] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{rec.analyzedAt}</span>
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => {
                        selectHistoryItem(rec);
                        navigate("/ats-analysis");
                      }}
                      className="text-xs font-semibold text-[#22C1C3] hover:underline"
                    >
                      Inspect
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
