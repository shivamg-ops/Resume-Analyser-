import React from "react";
import { Link } from "react-router-dom";
import {
  FileCheck2,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ArrowRight,
  TrendingUp,
  Brain,
  ShieldCheck,
  Award
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ATSScoreCard } from "@/components/ui-custom/ATSScoreCard";
import { SkillBadge } from "@/components/ui-custom/SkillBadge";
import { EmptyState } from "@/components/ui-custom/EmptyState";
import { ResumeAdvisorPanel } from "@/components/ui-custom/ResumeAdvisorPanel";
import { ResumeContentViewer } from "@/components/ui-custom/ResumeContentViewer";
import { useAnalysis } from "@/context/AnalysisContext";

export const ATSAnalysisPage: React.FC = () => {
  const { currentAnalysis, targetRole, currentFileName } = useAnalysis();

  if (!currentAnalysis) {
    return (
      <DashboardLayout
        title="Resume & ATS Review"
        subtitle="Detailed insights into how recruiters and tracking systems perceive your profile."
      >
        <EmptyState
          title="No Resume Selected Yet"
          description="Upload your resume or pick an earlier one from your history to receive personalized feedback and advice."
          actionText="Upload Resume"
          actionLink="/upload"
        />
      </DashboardLayout>
    );
  }

  const bestJob = currentAnalysis.job_matches?.[0];
  const atsScore = bestJob?.ats_score ?? 85;
  const missingSkills = bestJob?.missing_skills || [];
  const extractedSkills = currentAnalysis.extracted_skills || [];

  return (
    <DashboardLayout
      title="Resume Health & ATS Score"
      subtitle={`Personalized career feedback for ${currentFileName || "Your Resume"} targeting ${bestJob?.job || targetRole}.`}
    >
      <div className="space-y-8">
        {/* Main Score Hero Gauge */}
        <ATSScoreCard
          score={atsScore}
          role={bestJob?.job || targetRole}
          size="lg"
        />

        {/* Resume Contact & Extracted Text Viewer */}
        <ResumeContentViewer
          resumeText={currentAnalysis.resume_text}
          contactInfo={currentAnalysis.contact_info}
          fileName={currentFileName}
        />

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="saas-card p-5">
            <div className="flex items-center gap-3 mb-3 text-[#18A999]">
              <CheckCircle2 className="w-5 h-5" />
              <h4 className="font-bold text-sm text-[#0F172A]">Matched Competencies</h4>
            </div>
            <p className="text-2xl font-bold font-display text-[#0F172A] mb-1">
              {extractedSkills.length}
            </p>
            <p className="text-xs text-[#64748B]">
              High-value technical and core skills successfully recognized.
            </p>
          </div>

          <div className="saas-card p-5">
            <div className="flex items-center gap-3 mb-3 text-[#F4A340]">
              <XCircle className="w-5 h-5" />
              <h4 className="font-bold text-sm text-[#0F172A]">Missing Critical Skills</h4>
            </div>
            <p className="text-2xl font-bold font-display text-[#0F172A] mb-1">
              {missingSkills.length}
            </p>
            <p className="text-xs text-[#64748B]">
              Valuable keywords to consider adding to your resume experience.
            </p>
          </div>

          <div className="saas-card p-5">
            <div className="flex items-center gap-3 mb-3 text-[#635BDB]">
              <TrendingUp className="w-5 h-5" />
              <h4 className="font-bold text-sm text-[#0F172A]">Semantic Fit Score</h4>
            </div>
            <p className="text-2xl font-bold font-display text-[#0F172A] mb-1">
              {Math.round(bestJob?.semantic_score ?? 78)}%
            </p>
            <p className="text-xs text-[#64748B]">
              Contextual vector similarity to industry job descriptions.
            </p>
          </div>
        </div>

        {/* Matched vs Missing Skills breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Matched Skills */}
          <div className="saas-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#18A999]" />
                <h4 className="font-bold text-[#0F172A] text-base">
                  Identified Profile Skills ({extractedSkills.length})
                </h4>
              </div>
              <span className="text-xs text-[#18A999] font-semibold bg-[#18A999]/10 px-2.5 py-0.5 rounded-full">
                Validated
              </span>
            </div>

            <p className="text-xs text-[#64748B] mb-4">
              These keywords are prominent in your resume and align with modern recruiter queries:
            </p>

            <div className="flex flex-wrap gap-2">
              {extractedSkills.map((skill, idx) => (
                <SkillBadge key={idx} name={skill} type="matched" />
              ))}
            </div>
          </div>

          {/* Missing Skills */}
          <div className="saas-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#F4A340]" />
                <h4 className="font-bold text-[#0F172A] text-base">
                  Recommended Additions ({missingSkills.length})
                </h4>
              </div>
              <span className="text-xs text-[#C06F11] font-semibold bg-[#F4A340]/15 px-2.5 py-0.5 rounded-full">
                ATS Opportunity
              </span>
            </div>

            <p className="text-xs text-[#64748B] mb-4">
              Adding projects or bullet points reflecting these skills can notably increase match score:
            </p>

            {missingSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {missingSkills.map((skill, idx) => (
                  <SkillBadge key={idx} name={skill} type="missing" />
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-[#18A999]/10 border border-[#18A999]/20 text-xs text-[#0E7A6E]">
                No critical skills missing for this role profile. Great alignment!
              </div>
            )}
          </div>
        </div>

        {/* Strengths & Suggestions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="saas-card p-6">
            <div className="flex items-center gap-2 mb-4 text-[#18A999]">
              <ShieldCheck className="w-5 h-5" />
              <h4 className="font-bold text-[#0F172A] text-base">Key Profile Strengths</h4>
            </div>

            <ul className="space-y-3 text-xs text-[#64748B] leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#18A999] mt-1 shrink-0" />
                <span>Clear presence of core programming languages and frameworks required for engineering roles.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#18A999] mt-1 shrink-0" />
                <span>Solid formatting structure with clean text extraction and minimal parsing friction.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#18A999] mt-1 shrink-0" />
                <span>Well-defined terminology for modern frontend and backend development stacks.</span>
              </li>
            </ul>
          </div>

          <div className="saas-card p-6">
            <div className="flex items-center gap-2 mb-4 text-[#F4A340]">
              <Lightbulb className="w-5 h-5" />
              <h4 className="font-bold text-[#0F172A] text-base">Actionable Recommendations</h4>
            </div>

            <ul className="space-y-3 text-xs text-[#64748B] leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F4A340] mt-1 shrink-0" />
                <span>Explicitly list tools such as <strong className="text-[#0F172A]">API design, Docker, or CI/CD</strong> in your project descriptions.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F4A340] mt-1 shrink-0" />
                <span>Quantify bullet points with tangible metrics (e.g., "Reduced query latency by 35% using Redis").</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F4A340] mt-1 shrink-0" />
                <span>Re-upload the modified version to observe instant score improvements.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* AI Resume Advisor & ATS Optimization Panel */}
        <div className="pt-4">
          <ResumeAdvisorPanel
            extractedSkills={extractedSkills}
            missingSkills={missingSkills}
            targetRole={bestJob?.job || targetRole}
            atsScore={atsScore}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};
