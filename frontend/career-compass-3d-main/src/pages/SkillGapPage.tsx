import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  GitCompare,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ArrowRight,
  TrendingUp,
  Brain,
  Award
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SkillBadge } from "@/components/ui-custom/SkillBadge";
import { EmptyState } from "@/components/ui-custom/EmptyState";
import { useAnalysis } from "@/context/AnalysisContext";

export const SkillGapPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const queryRole = searchParams.get("role");

  const { currentAnalysis, targetRole, setTargetRole } = useAnalysis();

  if (!currentAnalysis) {
    return (
      <DashboardLayout
        title="Skill Gap Diagnostics"
        subtitle="Compare your existing skill set against industry job requirements."
      >
        <EmptyState
          title="No Active Resume to Compare"
          description="Upload your resume to perform real-time gap analysis and see what skills you need to learn next."
          actionText="Upload Resume"
          actionLink="/upload"
        />
      </DashboardLayout>
    );
  }

  const activeRoleName = queryRole || targetRole;
  const matchedJob = currentAnalysis.job_matches?.find(
    (j) => j.job.toLowerCase() === activeRoleName.toLowerCase()
  ) || currentAnalysis.job_matches?.[0];

  const matchedSkills = currentAnalysis.extracted_skills || [];
  const missingSkills = matchedJob?.missing_skills || [];
  const totalSkills = matchedSkills.length + missingSkills.length;
  const matchPercentage = totalSkills > 0 
    ? Math.round((matchedSkills.length / totalSkills) * 100) 
    : 70;

  return (
    <DashboardLayout
      title="Skill Gap Diagnostics"
      subtitle={`Detailed skill breakdown for ${matchedJob?.job || activeRoleName}.`}
    >
      <div className="space-y-8">
        {/* Target Role Selector Header */}
        <div className="saas-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-[#E2E8F0]">
          <div>
            <span className="text-[11px] font-bold text-[#635BDB] uppercase tracking-wider block mb-1">
              Active Benchmark Role
            </span>
            <h3 className="text-2xl font-bold text-[#0F172A]">{matchedJob?.job || activeRoleName}</h3>
            <p className="text-xs text-[#64748B] mt-1">
              Comparison based on verified technical stack requirements.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[#64748B]">Switch Role:</span>
            <select
              value={matchedJob?.job || activeRoleName}
              onChange={(e) => setTargetRole(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#635BDB]"
            >
              {currentAnalysis.job_matches?.map((j) => (
                <option key={j.job} value={j.job} className="bg-white text-[#0F172A]">
                  {j.job} ({Math.round(j.ats_score)}% ATS)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Visual Comparison Progress */}
        <div className="saas-card p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#0F172A]">Skill Coverage Index</span>
            <span className="text-sm font-extrabold text-[#18A999]">{matchPercentage}% Coverage</span>
          </div>

          <div className="w-full bg-[#E2E8F0] h-3 rounded-full overflow-hidden flex">
            <div
              className="bg-[#18A999] h-full transition-all duration-700"
              style={{ width: `${matchPercentage}%` }}
              title="Matched Skills"
            />
            <div
              className="bg-[#F4A340] h-full transition-all duration-700"
              style={{ width: `${100 - matchPercentage}%` }}
              title="Missing Skills"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-[#64748B] mt-3">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#18A999]" />
              {matchedSkills.length} Matched Skills
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F4A340]" />
              {missingSkills.length} Skills to Acquire
            </span>
          </div>
        </div>

        {/* 2 Column Comparison: Matched vs Missing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Matched */}
          <div className="saas-card p-6">
            <div className="flex items-center gap-2 mb-4 text-[#18A999]">
              <CheckCircle2 className="w-5 h-5" />
              <h4 className="font-bold text-[#0F172A] text-base">Verified Skills In Your Resume</h4>
            </div>

            <p className="text-xs text-[#64748B] mb-4">
              You already possess core qualifications required for this job description:
            </p>

            <div className="flex flex-wrap gap-2">
              {matchedSkills.map((s, idx) => (
                <SkillBadge key={idx} name={s} type="matched" />
              ))}
            </div>
          </div>

          {/* Missing / High-Impact */}
          <div className="saas-card p-6">
            <div className="flex items-center gap-2 mb-4 text-[#F4A340]">
              <XCircle className="w-5 h-5" />
              <h4 className="font-bold text-[#0F172A] text-base">Skills to Add or Learn</h4>
            </div>

            <p className="text-xs text-[#64748B] mb-4">
              Adding projects, courses, or mentions of these skills will bridge the gap:
            </p>

            <div className="flex flex-wrap gap-2">
              {missingSkills.map((s, idx) => (
                <SkillBadge key={idx} name={s} type="missing" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
