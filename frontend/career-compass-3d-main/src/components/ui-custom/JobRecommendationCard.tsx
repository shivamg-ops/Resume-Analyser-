import React from "react";
import { Briefcase, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { JobMatch } from "@/types/result";
import { SkillBadge } from "./SkillBadge";

interface JobRecommendationCardProps {
  job: JobMatch;
  isTopMatch?: boolean;
}

export const JobRecommendationCard: React.FC<JobRecommendationCardProps> = ({
  job,
  isTopMatch = false,
}) => {
  const semanticPct = Math.round(job.semantic_score);
  const atsPct = Math.round(job.ats_score);

  return (
    <div
      className={`saas-card p-6 flex flex-col justify-between ${
        isTopMatch ? "border-[#22C1C3]/50 ring-1 ring-[#22C1C3]/30" : ""
      }`}
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#22C1C3]/10 border border-[#22C1C3]/30 flex items-center justify-center text-[#22C1C3]">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#F1F5F9] text-base">{job.job}</h4>
              <span className="text-xs text-[#94A3B8]">Full-time • Tech Roles</span>
            </div>
          </div>

          {isTopMatch && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#22C1C3]/15 text-[#22C1C3] border border-[#22C1C3]/30">
              Best Match
            </span>
          )}
        </div>

        {/* Dual Scores */}
        <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-[#0B151B]/60 border border-[#263B43] mb-4">
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-[#94A3B8]">Semantic Match</span>
              <span className="font-bold text-[#22C1C3]">{semanticPct}%</span>
            </div>
            <div className="w-full bg-[#263B43]/60 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#22C1C3] h-full rounded-full transition-all duration-700"
                style={{ width: `${Math.max(5, semanticPct)}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-[#94A3B8]">ATS Match</span>
              <span className="font-bold text-emerald-400">{atsPct}%</span>
            </div>
            <div className="w-full bg-[#263B43]/60 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all duration-700"
                style={{ width: `${Math.max(5, atsPct)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Why this role is recommended */}
        <p className="text-xs text-[#94A3B8] leading-relaxed mb-4">
          Your resume profile demonstrates strong alignment with core competencies required for{" "}
          <strong className="text-[#F1F5F9]">{job.job}</strong> roles.
        </p>

        {/* Missing Skills alert if any */}
        {job.missing_skills && job.missing_skills.length > 0 && (
          <div className="mb-4">
            <span className="text-[11px] font-semibold text-[#94A3B8] block mb-2">
              Missing High-Impact Skills:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {job.missing_skills.slice(0, 4).map((skill, idx) => (
                <SkillBadge key={idx} name={skill} type="missing" size="sm" />
              ))}
              {job.missing_skills.length > 4 && (
                <span className="text-[10px] text-[#94A3B8] self-center">
                  +{job.missing_skills.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-[#263B43] flex items-center justify-between mt-2">
        <Link
          to="/skill-gap"
          className="text-xs font-semibold text-[#22C1C3] hover:text-[#5EEAD4] flex items-center gap-1.5 transition-colors"
        >
          <span>View Skill Gap</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <span className="text-[11px] text-[#94A3B8]">High Market Demand</span>
      </div>
    </div>
  );
};
