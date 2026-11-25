import React, { useState } from "react";
import {
  FileText,
  User,
  Mail,
  Phone,
  Linkedin,
  Github,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Download
} from "lucide-react";
import type { ContactInfo } from "@/types/result";

interface ResumeContentViewerProps {
  resumeText?: string;
  contactInfo?: ContactInfo;
  fileName?: string;
}

export const ResumeContentViewer: React.FC<ResumeContentViewerProps> = ({
  resumeText,
  contactInfo,
  fileName,
}) => {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const candidateName = contactInfo?.candidate_name || "Resume Candidate";
  const email = contactInfo?.email;
  const phone = contactInfo?.phone;
  const linkedin = contactInfo?.linkedin;
  const github = contactInfo?.github;

  const handleCopyText = () => {
    if (!resumeText) return;
    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadText = () => {
    if (!resumeText) return;
    const blob = new Blob([resumeText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName || "resume"}_extracted.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="saas-card overflow-hidden border-[#1E3A47] hover:border-[#00F2FE]/40 transition-all duration-300">
      {/* Header bar */}
      <div className="p-5 md:p-6 bg-[#070D12]/70 border-b border-[#1E3A47] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00F2FE]/10 border border-[#00F2FE]/30 flex items-center justify-center text-[#00F2FE] shadow-[0_0_12px_rgba(0,242,254,0.15)]">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#F8FAFC]">
              Resume Contact & Extracted Text
            </h3>
            <p className="text-xs text-[#94A3B8]">
              Verified contact information and raw text parsed by the ATS engine.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {resumeText && (
            <>
              <button
                onClick={handleCopyText}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1E3A47] bg-[#0F1D24] hover:bg-[#152B35] text-xs font-semibold text-[#F8FAFC] transition-colors"
                title="Copy all extracted text"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#00F2FE]" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
              <button
                onClick={handleDownloadText}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1E3A47] bg-[#0F1D24] hover:bg-[#152B35] text-xs font-semibold text-[#F8FAFC] transition-colors"
                title="Download extracted text as TXT"
              >
                <Download className="w-3.5 h-3.5 text-[#2DD4BF]" />
                <span>Export TXT</span>
              </button>
            </>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00F2FE]/15 hover:bg-[#00F2FE]/25 border border-[#00F2FE]/40 text-xs font-bold text-[#00F2FE] transition-colors"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                <span>Collapse Text</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                <span>View Full Text</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Extracted Contact Info Grid */}
      <div className="p-5 md:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-[#0F1D24]/50 border-b border-[#1E3A47]">
        {/* Candidate Name */}
        <div className="p-3.5 rounded-xl bg-[#070D12]/60 border border-[#1E3A47]">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#94A3B8] block mb-1">
            Candidate Name
          </span>
          <div className="flex items-center gap-2 text-sm font-semibold text-[#F8FAFC]">
            <User className="w-4 h-4 text-[#00F2FE] shrink-0" />
            <span className="truncate">{candidateName}</span>
          </div>
        </div>

        {/* Email */}
        <div className="p-3.5 rounded-xl bg-[#070D12]/60 border border-[#1E3A47]">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#94A3B8] block mb-1">
            Email Address
          </span>
          <div className="flex items-center gap-2 text-sm font-semibold text-[#F8FAFC]">
            <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="truncate text-xs font-mono">{email || "Not detected"}</span>
          </div>
        </div>

        {/* Phone */}
        <div className="p-3.5 rounded-xl bg-[#070D12]/60 border border-[#1E3A47]">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#94A3B8] block mb-1">
            Phone Number
          </span>
          <div className="flex items-center gap-2 text-sm font-semibold text-[#F8FAFC]">
            <Phone className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="truncate text-xs font-mono">{phone || "Not detected"}</span>
          </div>
        </div>

        {/* Links (LinkedIn / GitHub) */}
        <div className="p-3.5 rounded-xl bg-[#070D12]/60 border border-[#1E3A47]">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#94A3B8] block mb-1">
            Profiles & Links
          </span>
          <div className="flex items-center gap-3 text-xs">
            {linkedin ? (
              <a
                href={linkedin.startsWith("http") ? linkedin : `https://${linkedin}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[#00F2FE] hover:underline"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
            ) : (
              <span className="text-[#94A3B8] text-xs">No LinkedIn</span>
            )}

            {github ? (
              <a
                href={github.startsWith("http") ? github : `https://${github}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[#2DD4BF] hover:underline"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            ) : (
              <span className="text-[#94A3B8] text-xs">No GitHub</span>
            )}
          </div>
        </div>
      </div>

      {/* Raw Resume Text Accordion Body */}
      {isExpanded ? (
        <div className="p-5 md:p-6 bg-[#070D12]/90">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#94A3B8]">
              <FileText className="w-4 h-4 text-[#00F2FE]" />
              <span>Full Extracted Document Content ({resumeText ? resumeText.length : 0} characters)</span>
            </div>
            <span className="text-[11px] text-[#94A3B8]">Scrollable Text Stream</span>
          </div>

          <div className="p-4 rounded-xl bg-[#0B151B] border border-[#1E3A47] max-h-96 overflow-y-auto font-mono text-xs text-[#E2E8F0] leading-relaxed whitespace-pre-wrap selection:bg-[#00F2FE]/30">
            {resumeText || (
              <span className="text-[#94A3B8] italic">
                Raw text is available when a live resume is uploaded through the Upload page.
              </span>
            )}
          </div>
        </div>
      ) : (
        <div
          onClick={() => setIsExpanded(true)}
          className="p-3.5 text-center bg-[#070D12]/40 hover:bg-[#070D12]/80 cursor-pointer border-t border-[#1E3A47]/40 transition-colors"
        >
          <span className="text-xs text-[#94A3B8] hover:text-[#00F2FE] font-medium flex items-center justify-center gap-1.5">
            Click to view and inspect all parsed resume text paragraphs ({resumeText ? `${Math.round(resumeText.length / 5)} words` : "click to expand"})
            <ChevronDown className="w-3.5 h-3.5" />
          </span>
        </div>
      )}
    </div>
  );
};
