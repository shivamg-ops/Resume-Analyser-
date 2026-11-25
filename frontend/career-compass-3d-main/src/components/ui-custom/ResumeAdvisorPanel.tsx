import React from "react";
import {
  Sparkles,
  Zap,
  Copy,
  Check,
  CheckCircle2,
  AlertTriangle,
  Lightbulb
} from "lucide-react";
import {
  generateResumeSuggestions,
  getPowerWordsForRole,
  ActionSuggestion
} from "@/utils/resumeAdvisor";

interface ResumeAdvisorPanelProps {
  extractedSkills: string[];
  missingSkills: string[];
  targetRole: string;
  atsScore: number;
}

export const ResumeAdvisorPanel: React.FC<ResumeAdvisorPanelProps> = ({
  extractedSkills,
  missingSkills,
  targetRole,
  atsScore,
}) => {
  const [copiedSnippet, setCopiedSnippet] = React.useState<string | null>(null);

  const suggestions = generateResumeSuggestions(
    extractedSkills,
    missingSkills,
    targetRole,
    atsScore
  );

  const powerWordData = getPowerWordsForRole(targetRole);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const getCategoryBadge = (category: ActionSuggestion["category"]) => {
    switch (category) {
      case "critical":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#F4A340]/15 text-[#C06F11] border border-[#F4A340]/30">
            High Priority
          </span>
        );
      case "power-words":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#635BDB]/10 text-[#635BDB] border border-[#635BDB]/20">
            Action Verbs
          </span>
        );
      case "warning":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#18A999]/15 text-[#0E7A6E] border border-[#18A999]/30">
            Content Boost
          </span>
        );
      case "formatting":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#635BDB]/10 text-[#635BDB] border border-[#635BDB]/20">
            ATS Scanner Rule
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Light Purple Advice Surface */}
      <div className="surface-ai-advice p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#635BDB] text-white text-xs font-bold mb-3 shadow-sm shadow-[#635BDB]/25">
              <Zap className="w-3.5 h-3.5" />
              <span>Personal Career Coach & Resume Advice</span>
            </div>
            <h3 className="text-xl font-bold text-[#0F172A] font-display">
              Actionable Tips to Elevate Your Resume
            </h3>
            <p className="text-xs text-[#64748B] max-w-2xl mt-1 leading-relaxed">
              We reviewed your resume against hiring criteria for <strong className="text-[#0F172A]">{targetRole}</strong>. Here are friendly, proven steps and bullet templates to help you stand out to hiring managers.
            </p>
          </div>
        </div>
      </div>

      {/* Actionable Improvement Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {suggestions.map((sug) => (
          <div
            key={sug.id}
            className="saas-card p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-semibold text-[#0F172A]">{sug.title}</span>
                {getCategoryBadge(sug.category)}
              </div>

              <p className="text-xs text-[#64748B] leading-relaxed mb-2">
                {sug.problem}
              </p>
              <p className="text-xs text-[#0F172A] leading-relaxed mb-4 font-medium">
                {sug.recommendation}
              </p>

              {sug.exampleSnippet && (
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] mb-3">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-[#635BDB] mb-1.5">
                    <span>Recommended Resume Bullet Template</span>
                    <button
                      onClick={() => handleCopy(sug.exampleSnippet!, sug.id)}
                      className="inline-flex items-center gap-1 hover:text-[#5249D4]"
                      title="Copy to clipboard"
                    >
                      {copiedSnippet === sug.id ? (
                        <>
                          <Check className="w-3 h-3 text-[#18A999]" />
                          <span className="text-[#18A999]">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-[#0F172A] italic leading-relaxed whitespace-pre-line">
                    "{sug.exampleSnippet}"
                  </p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-[11px] text-[#64748B]">
              <span>Impact: {sug.category === "critical" ? "High ATS Lift" : "Recruiter Engagement"}</span>
              <span className="font-semibold text-[#635BDB]">{sug.impact}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Power Action Verbs by Role */}
      {powerWordData && (
        <div className="saas-card p-6">
          <div className="flex items-center gap-2 mb-3 text-[#635BDB]">
            <Sparkles className="w-4 h-4" />
            <h4 className="font-bold text-sm text-[#0F172A]">
              High-Impact Power Words for {targetRole}
            </h4>
          </div>
          <p className="text-xs text-[#64748B] mb-4">
            Replace passive verbs (e.g., "helped with", "worked on") with these strong action verbs favored by technical recruiters.
          </p>
          <div className="flex flex-wrap gap-2">
            {(powerWordData.actionVerbs || []).map((word, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F4F3FF] text-[#635BDB] border border-[#635BDB]/20"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
