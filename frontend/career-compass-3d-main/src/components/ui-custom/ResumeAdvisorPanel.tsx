import React from "react";
import {
  Sparkles,
  AlertTriangle,
  Flame,
  CheckCircle2,
  FileCheck,
  TrendingUp,
  ArrowRight,
  Zap,
  Copy,
  Check
} from "lucide-react";
import {
  generateResumeSuggestions,
  getPowerWordsForRole,
  ActionSuggestion
} from "@/utils/resumeAdvisor";
import { SkillBadge } from "@/components/ui-custom/SkillBadge";

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
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
            High Priority
          </span>
        );
      case "power-words":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#22C1C3]/15 text-[#22C1C3] border border-[#22C1C3]/30">
            Power Words
          </span>
        );
      case "warning":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            Content Boost
          </span>
        );
      case "formatting":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
            ATS Scanner Rule
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="saas-card p-6 border-[#22C1C3]/40 bg-gradient-to-r from-[#14232B] via-[#14232B] to-[#22C1C3]/10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22C1C3]/15 text-[#22C1C3] text-xs font-bold mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>AI Resume Coach & ATS Optimizer</span>
            </div>
            <h3 className="text-xl font-extrabold text-[#F1F5F9] font-display">
              Tailored Suggestions to Maximize ATS Pass Rate
            </h3>
            <p className="text-xs text-[#94A3B8] max-w-2xl mt-1 leading-relaxed">
              We analyzed your document structure against real-world Applicant Tracking Systems. Follow these exact improvements to boost search visibility and recruiter engagement for <strong className="text-[#F1F5F9]">{targetRole}</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Actionable Improvement Cards */}
      <div className="space-y-4">
        {suggestions.map((sug) => (
          <div key={sug.id} className="saas-card p-6 border-[#263B43] hover:border-[#22C1C3]/40">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2.5">
                {getCategoryBadge(sug.category)}
                <h4 className="font-bold text-sm text-[#F1F5F9]">{sug.title}</h4>
              </div>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full self-start sm:self-auto border border-emerald-500/20">
                {sug.impact}
              </span>
            </div>

            <p className="text-xs text-rose-300/90 mb-2 leading-relaxed flex items-start gap-1.5">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <span><strong className="text-rose-400">Current Issue:</strong> {sug.problem}</span>
            </p>

            <p className="text-xs text-[#94A3B8] mb-4 leading-relaxed pl-5">
              <strong className="text-[#F1F5F9]">How to fix:</strong> {sug.recommendation}
            </p>

            {/* Keywords to Inject */}
            {sug.keywordsToAdd && sug.keywordsToAdd.length > 0 && (
              <div className="pl-5 mb-4">
                <span className="text-[11px] font-semibold text-[#94A3B8] block mb-2">
                  Keywords to add right now:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {sug.keywordsToAdd.map((kw, i) => (
                    <SkillBadge key={i} name={kw} type="missing" size="sm" />
                  ))}
                </div>
              </div>
            )}

            {/* Code / Snippet Template */}
            {sug.exampleSnippet && (
              <div className="pl-5">
                <div className="p-3 rounded-xl bg-[#0B151B] border border-[#263B43] flex items-start justify-between gap-3 text-xs font-mono text-[#F1F5F9]">
                  <pre className="whitespace-pre-wrap leading-relaxed flex-1 text-[11px] text-[#22C1C3]">
                    {sug.exampleSnippet}
                  </pre>
                  <button
                    onClick={() => handleCopy(sug.exampleSnippet!, sug.id)}
                    className="p-1.5 rounded-lg border border-[#263B43] text-[#94A3B8] hover:text-[#22C1C3] hover:bg-[#14232B] transition-colors shrink-0"
                    title="Copy phrase template"
                  >
                    {copiedSnippet === sug.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Role-Specific Action Verbs & Phrases Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recommended Action Verbs */}
        <div className="saas-card p-6">
          <div className="flex items-center gap-2.5 mb-4 text-[#22C1C3]">
            <Flame className="w-5 h-5" />
            <h4 className="font-bold text-sm text-[#F1F5F9]">
              High-Impact Power Verbs for {powerWordData.roleCategory}
            </h4>
          </div>
          <p className="text-xs text-[#94A3B8] leading-relaxed mb-4">
            ATS parsers rank resumes higher when action verbs demonstrate initiative and execution rather than passive observation:
          </p>
          <div className="flex flex-wrap gap-2">
            {powerWordData.actionVerbs.map((verb, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#22C1C3]/10 border border-[#22C1C3]/25 text-[#22C1C3]"
              >
                {verb}
              </span>
            ))}
          </div>
        </div>

        {/* Phrases to Avoid vs What to Use */}
        <div className="saas-card p-6">
          <div className="flex items-center gap-2.5 mb-4 text-amber-400">
            <Sparkles className="w-5 h-5" />
            <h4 className="font-bold text-sm text-[#F1F5F9]">
              Phrasing Transformations (Weak vs Strong)
            </h4>
          </div>
          <div className="space-y-3">
            {powerWordData.phrasesToAvoid.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[#0B151B] border border-[#263B43] text-xs space-y-1">
                <div className="text-rose-400/80 line-through">
                  ❌ {item.avoid}
                </div>
                <div className="text-emerald-400 font-medium">
                  ✅ {item.replaceWith}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

