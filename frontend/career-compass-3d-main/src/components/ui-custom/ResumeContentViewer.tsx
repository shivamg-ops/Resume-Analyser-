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
    <div className="saas-card overflow-hidden border-[#E2E8F0]">
      {/* Header bar */}
      <div className="p-5 md:p-6 bg-[#FAFAFC] border-b border-[#E2E8F0] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#635BDB]/10 border border-[#635BDB]/20 flex items-center justify-center text-[#635BDB]">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#0F172A]">
              Resume Contact & Parsed Text
            </h3>
            <p className="text-xs text-[#64748B]">
              Verified contact information and extracted text parsed by the ATS engine.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {resumeText && (
            <>
              <button
                onClick={handleCopyText}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-xs font-semibold text-[#0F172A] transition-colors shadow-sm"
                title="Copy all extracted text"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#18A999]" />
                    <span className="text-[#18A999]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#635BDB]" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
              <button
                onClick={handleDownloadText}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-xs font-semibold text-[#0F172A] transition-colors shadow-sm"
                title="Download extracted text as TXT"
              >
                <Download className="w-3.5 h-3.5 text-[#18A999]" />
                <span>Export TXT</span>
              </button>
            </>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#635BDB]/10 hover:bg-[#635BDB]/15 border border-[#635BDB]/20 text-xs font-bold text-[#635BDB] transition-colors"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                <span>Collapse</span>
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
      <div className="p-5 md:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white border-b border-[#E2E8F0]">
        {/* Candidate Name */}
        <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#64748B] block mb-1">
            Candidate Name
          </span>
          <div className="flex items-center gap-2 text-sm font-bold text-[#0F172A]">
            <User className="w-4 h-4 text-[#635BDB] shrink-0" />
            <span className="truncate">{candidateName}</span>
          </div>
        </div>

        {/* Email */}
        <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#64748B] block mb-1">
            Email Address
          </span>
          <div className="flex items-center gap-2 text-sm font-semibold text-[#0F172A]">
            <Mail className="w-4 h-4 text-[#18A999] shrink-0" />
            <span className="truncate text-xs font-mono">{email || "Not detected"}</span>
          </div>
        </div>

        {/* Phone */}
        <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#64748B] block mb-1">
            Phone Number
          </span>
          <div className="flex items-center gap-2 text-sm font-semibold text-[#0F172A]">
            <Phone className="w-4 h-4 text-[#F4A340] shrink-0" />
            <span className="truncate text-xs font-mono">{phone || "Not detected"}</span>
          </div>
        </div>

        {/* Links */}
        <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#64748B] block mb-1">
            Profiles & Links
          </span>
          <div className="flex items-center gap-3 text-xs font-semibold">
            {linkedin ? (
              <a
                href={linkedin.startsWith("http") ? linkedin : `https://${linkedin}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[#635BDB] hover:underline"
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
                className="inline-flex items-center gap-1 text-[#18A999] hover:underline"
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
        <div className="p-5 md:p-6 bg-[#FAFAFC]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#64748B]">
              <FileText className="w-4 h-4 text-[#635BDB]" />
              <span>Full Extracted Text ({resumeText ? resumeText.length : 0} characters)</span>
            </div>
            <span className="text-[11px] text-[#94A3B8]">Scrollable Stream</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] max-h-96 overflow-y-auto font-mono text-xs text-[#334155] leading-relaxed whitespace-pre-wrap shadow-inner">
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
          className="p-3 text-center bg-[#FAFAFC] hover:bg-[#F1F5F9] cursor-pointer border-t border-[#E2E8F0] transition-colors"
        >
          <span className="text-xs text-[#635BDB] font-semibold flex items-center justify-center gap-1.5">
            View full extracted resume text
            <ChevronDown className="w-3.5 h-3.5" />
          </span>
        </div>
      )}
    </div>
  );
};
