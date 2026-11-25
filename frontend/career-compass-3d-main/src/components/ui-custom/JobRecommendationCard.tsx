import React from "react";
import { Briefcase, ArrowRight, Star } from "lucide-react";
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
      className={`saas-card p-6 flex flex-col justify-between hover:border-[#635BDB]/40 transition-all duration-200 ${
        isTopMatch ? "border-[#635BDB] ring-1 ring-[#635BDB]/20 shadow-sm" : ""
      }`}
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#635BDB]/10 border border-[#635BDB]/20 flex items-center justify-center text-[#635BDB]">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#0F172A] text-base">{job.job}</h4>
              <span className="text-xs text-[#64748B]">Full-time • Tech Industry</span>
            </div>
          </div>

          {isTopMatch && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#F4A340]/15 text-[#C06F11] border border-[#F4A340]/30 flex items-center gap-1">
              <Star className="w-3 h-3 fill-[#F4A340]" />
              Top Match
            </span>
          )}
        </div>

        {/* Dual Scores (Teal & Purple) */}
        <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] mb-4">
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-[#64748B] font-medium">Semantic Match</span>
              <span className="font-bold text-[#635BDB]">{semanticPct}%</span>
            </div>
            <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#635BDB] h-full rounded-full transition-all duration-700"
                style={{ width: `${Math.max(5, semanticPct)}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-[#64748B] font-medium">ATS Match</span>
              <span className="font-bold text-[#18A999]">{atsPct}%</span>
            </div>
            <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#18A999] h-full rounded-full transition-all duration-700"
                style={{ width: `${Math.max(5, atsPct)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-[#64748B] leading-relaxed mb-4">
          Strong alignment detected with core engineering proficiencies required for{" "}
          <strong className="text-[#0F172A]">{job.job}</strong> roles.
        </p>

        {/* Missing Skills alert if any (Orange Highlights) */}
        {job.missing_skills && job.missing_skills.length > 0 && (
          <div className="mb-4">
            <span className="text-[11px] font-semibold text-[#64748B] block mb-2">
              Recommended Additions:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {job.missing_skills.slice(0, 4).map((skill, idx) => (
                <SkillBadge key={idx} name={skill} type="missing" size="sm" />
              ))}
              {job.missing_skills.length > 4 && (
                <span className="text-[10px] text-[#64748B] self-center">
                  +{job.missing_skills.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between mt-2">
        <span className="text-xs font-semibold text-[#0E7A6E] bg-[#18A999]/10 px-2.5 py-0.5 rounded-full">
          High Recruiter Demand
        </span>

        <Link
          to={`/skill-gap?role=${encodeURIComponent(job.job)}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#635BDB] hover:text-[#5249D4] hover:underline"
        >
          <span>Skill Gap</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
