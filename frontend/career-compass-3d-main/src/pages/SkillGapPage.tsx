import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  GitCompare,
  CheckCircle2,
  XCircle,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Award
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SkillBadge } from "@/components/ui-custom/SkillBadge";
import { EmptyState } from "@/components/ui-custom/EmptyState";
import { useAnalysis } from "@/context/AnalysisContext";

export const SkillGapPage: React.FC = () => {
  const { currentAnalysis, targetRole, setTargetRole } = useAnalysis();

  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);

  if (!currentAnalysis) {
    return (
      <DashboardLayout
        title="Skill Gap & Learning Roadmap"
        subtitle="Compare your profile against target role requirements and identify missing competencies."
      >
        <EmptyState
          title="No Resume Active for Skill Gap Analysis"
          description="Upload your resume to compare your current skill set with industry standards for top tech roles."
          actionText="Upload Resume Now"
          actionLink="/upload"
        />
      </DashboardLayout>
    );
  }

  const jobs = currentAnalysis.job_matches || [];
  const activeJob = jobs[selectedRoleIndex] || jobs[0];

  const matchedSkills = currentAnalysis.extracted_skills || [];
  const missingSkills = activeJob?.missing_skills || [];
  const totalRequired = matchedSkills.length + missingSkills.length;
  const matchPercentage = totalRequired > 0 
    ? Math.round((matchedSkills.length / totalRequired) * 100) 
    : 80;

  return (
    <DashboardLayout
      title="Skill Gap Analysis"
      subtitle="Side-by-side competency comparison and personalized learning recommendations."
    >
      <div className="space-y-8">
        {/* Role Switcher Pills */}
        <div className="saas-card p-4">
          <span className="text-xs font-semibold text-[#94A3B8] block mb-2.5">
            Select Role to Benchmark Against:
          </span>
          <div className="flex flex-wrap gap-2">
            {jobs.map((job, idx) => (
              <button
                key={job.job}
                onClick={() => setSelectedRoleIndex(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                  selectedRoleIndex === idx
                    ? "bg-[#22C1C3]/15 text-[#22C1C3] border-[#22C1C3] shadow-sm shadow-[#22C1C3]/20"
                    : "bg-[#0B151B] text-[#94A3B8] border-[#263B43] hover:text-[#F1F5F9] hover:border-[#94A3B8]/50"
                }`}
              >
                <span>{job.job}</span>
                <span className="ml-2 text-[10px] opacity-75 font-normal">
                  ({Math.round(job.ats_score)}%)
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Competency Gap Overview */}
        <div className="saas-card p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#263B43]">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22C1C3]/10 text-[#22C1C3] text-xs font-semibold mb-2">
                <GitCompare className="w-3.5 h-3.5" />
                <span>Benchmarked Position</span>
              </div>
              <h3 className="text-2xl font-bold text-[#F1F5F9] font-display">
                {activeJob?.job}
              </h3>
              <p className="text-xs text-[#94A3B8] mt-1">
                Comparing {matchedSkills.length} acquired skills against role taxonomy requirements.
              </p>
            </div>

            <div className="text-right">
              <span className="text-3xl font-extrabold text-[#22C1C3] font-display">
                {Math.round(activeJob?.ats_score ?? 80)}%
              </span>
              <span className="block text-[11px] text-[#94A3B8]">Overall Match Rate</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-xs text-[#94A3B8] mb-2 font-medium">
              <span>Skill Coverage</span>
              <span className="text-[#F1F5F9]">{matchedSkills.length} of {totalRequired} Competencies</span>
            </div>
            <div className="w-full bg-[#0B151B] border border-[#263B43] h-3 rounded-full overflow-hidden p-0.5">
              <div
                className="bg-gradient-to-r from-[#22C1C3] to-[#0D9488] h-full rounded-full transition-all duration-700"
                style={{ width: `${Math.max(5, matchPercentage)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Side-by-Side Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Matched Skills */}
          <div className="saas-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h4 className="font-bold text-[#F1F5F9] text-base">Verified Skills You Possess</h4>
              </div>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                {matchedSkills.length}
              </span>
            </div>

            <p className="text-xs text-[#94A3B8] leading-relaxed mb-4">
              These proficiencies align with this role's baseline requirements:
            </p>

            <div className="flex flex-wrap gap-2">
              {matchedSkills.map((s, idx) => (
                <SkillBadge key={idx} name={s} type="matched" />
              ))}
            </div>
          </div>

          {/* Missing Skills */}
          <div className="saas-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <XCircle className="w-5 h-5 text-rose-400" />
                <h4 className="font-bold text-[#F1F5F9] text-base">Identified Skill Gaps</h4>
              </div>
              <span className="text-xs font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full">
                {missingSkills.length}
              </span>
            </div>

            {missingSkills.length === 0 ? (
              <div className="py-6 text-center text-xs text-[#94A3B8]">
                <Award className="w-7 h-7 text-emerald-400 mx-auto mb-2" />
                <p className="font-semibold text-emerald-400">Complete Skill Coverage</p>
                <p>No critical missing proficiencies detected for this role.</p>
              </div>
            ) : (
              <>
                <p className="text-xs text-[#94A3B8] leading-relaxed mb-4">
                  Mastering or referencing these competencies can boost your score:
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {missingSkills.map((s, idx) => (
                    <SkillBadge key={idx} name={s} type="missing" />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Learning Roadmap Suggestions */}
        <div className="saas-card p-6">
          <div className="flex items-center gap-2.5 mb-4 text-[#22C1C3]">
            <BookOpen className="w-5 h-5" />
            <h4 className="font-bold text-[#F1F5F9] text-base">Recommended Upskilling Actions</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#0B151B] border border-[#263B43]">
              <span className="text-xs font-bold text-[#22C1C3] block mb-1">Step 1: Projects</span>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Build a portfolio demonstration showcasing {missingSkills[0] || "REST APIs"} with documented repository links.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#0B151B] border border-[#263B43]">
              <span className="text-xs font-bold text-[#22C1C3] block mb-1">Step 2: Resume Revision</span>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Add practical coursework or certifications covering {missingSkills[1] || "Cloud Architecture"}.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#0B151B] border border-[#263B43]">
              <span className="text-xs font-bold text-[#22C1C3] block mb-1">Step 3: Verification</span>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Re-upload the revised resume to check whether your ATS score advances beyond 90%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
