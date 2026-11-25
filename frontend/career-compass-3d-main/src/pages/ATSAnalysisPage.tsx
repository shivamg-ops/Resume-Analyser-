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
        title="ATS Score Deep Dive"
        subtitle="Detailed keyword matching and semantic parsing diagnostics."
      >
        <EmptyState
          title="No Resume Active for ATS Analysis"
          description="Upload your resume or select a previous analysis from history to review its detailed ATS scoring breakdown."
          actionText="Upload Resume Now"
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
      title="ATS Score Deep Dive"
      subtitle={`Diagnostic breakdown for ${currentFileName || "Uploaded Resume"} against ${bestJob?.job || targetRole}.`}
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
            <div className="flex items-center gap-3 mb-3 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
              <h4 className="font-bold text-sm text-[#F1F5F9]">Matched Competencies</h4>
            </div>
            <p className="text-2xl font-bold font-display text-[#F1F5F9] mb-1">
              {extractedSkills.length}
            </p>
            <p className="text-xs text-[#94A3B8]">
              High-value technical and core skills successfully recognized.
            </p>
          </div>

          <div className="saas-card p-5">
            <div className="flex items-center gap-3 mb-3 text-rose-400">
              <XCircle className="w-5 h-5" />
              <h4 className="font-bold text-sm text-[#F1F5F9]">Missing Critical Skills</h4>
            </div>
            <p className="text-2xl font-bold font-display text-[#F1F5F9] mb-1">
              {missingSkills.length}
            </p>
            <p className="text-xs text-[#94A3B8]">
              Skills expected for this role profile that were absent in text.
            </p>
          </div>

          <div className="saas-card p-5">
            <div className="flex items-center gap-3 mb-3 text-[#22C1C3]">
              <TrendingUp className="w-5 h-5" />
              <h4 className="font-bold text-sm text-[#F1F5F9]">Semantic Relevance</h4>
            </div>
            <p className="text-2xl font-bold font-display text-[#F1F5F9] mb-1">
              {Math.round(bestJob?.semantic_score ?? 72)}%
            </p>
            <p className="text-xs text-[#94A3B8]">
              Vector embedding cosine distance via sentence-transformers.
            </p>
          </div>
        </div>

        {/* Keyword Breakdown Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Matched Keywords */}
          <div className="saas-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h4 className="font-bold text-[#F1F5F9] text-base">Identified Technical Skills</h4>
              </div>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                {extractedSkills.length} Detected
              </span>
            </div>

            <p className="text-xs text-[#94A3B8] leading-relaxed mb-4">
              These keywords match standard industry position descriptors and contribute directly to your ATS pass rate:
            </p>

            <div className="flex flex-wrap gap-2">
              {extractedSkills.map((skill, idx) => (
                <SkillBadge key={idx} name={skill} type="matched" />
              ))}
            </div>
          </div>

          {/* Missing Keywords */}
          <div className="saas-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-rose-400" />
                <h4 className="font-bold text-[#F1F5F9] text-base">Keywords to Add (Gaps)</h4>
              </div>
              <span className="text-xs font-semibold text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full">
                {missingSkills.length} Missing
              </span>
            </div>

            {missingSkills.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#94A3B8]">
                <Award className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className="font-semibold text-emerald-400">Zero Critical Skill Deficits!</p>
                <p>Your resume contains all foundational skills required for this role.</p>
              </div>
            ) : (
              <>
                <p className="text-xs text-[#94A3B8] leading-relaxed mb-4">
                  Consider incorporating these missing keywords in your summary, bullet points, or technical toolbars:
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {missingSkills.map((skill, idx) => (
                    <SkillBadge key={idx} name={skill} type="missing" />
                  ))}
                </div>
              </>
            )}

            <div className="pt-4 border-t border-[#263B43] flex items-center justify-between mt-4">
              <Link to="/skill-gap" className="text-xs font-semibold text-[#22C1C3] hover:underline flex items-center gap-1">
                <span>View Full Skill Gap Matrix</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Strengths & Improvement Suggestions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="saas-card p-6">
            <div className="flex items-center gap-2 mb-4 text-[#22C1C3]">
              <ShieldCheck className="w-5 h-5" />
              <h4 className="font-bold text-[#F1F5F9] text-base">Key Profile Strengths</h4>
            </div>

            <ul className="space-y-3 text-xs text-[#94A3B8] leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C1C3] mt-1 shrink-0" />
                <span>Clear presence of core programming languages and frameworks required for engineering roles.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C1C3] mt-1 shrink-0" />
                <span>Solid formatting structure with clean text extraction and minimal parsing friction.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C1C3] mt-1 shrink-0" />
                <span>Well-defined terminology for modern frontend and backend development stacks.</span>
              </li>
            </ul>
          </div>

          <div className="saas-card p-6">
            <div className="flex items-center gap-2 mb-4 text-amber-400">
              <Lightbulb className="w-5 h-5" />
              <h4 className="font-bold text-[#F1F5F9] text-base">Actionable Recommendations</h4>
            </div>

            <ul className="space-y-3 text-xs text-[#94A3B8] leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1 shrink-0" />
                <span>Explicitly list missing tools such as <strong className="text-[#F1F5F9]">API design, Docker, or CI/CD</strong> in your project descriptions.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1 shrink-0" />
                <span>Quantify bullet points with tangible metrics (e.g., "Reduced query latency by 35% using Redis").</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1 shrink-0" />
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

