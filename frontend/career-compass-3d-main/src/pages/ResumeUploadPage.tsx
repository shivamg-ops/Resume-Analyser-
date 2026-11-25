import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  UploadCloud,
  FileText,
  CheckCircle,
  AlertCircle,
  Loader2,
  Briefcase,
  ArrowRight,
  Info
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAnalysis } from "@/context/AnalysisContext";

export const ResumeUploadPage: React.FC = () => {
  const navigate = useNavigate();
  const { analyzeResume, isAnalyzing, targetRole, setTargetRole } = useAnalysis();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState<string>("");

  const targetRoles = [
    "Full Stack Developer",
    "Backend Developer",
    "Frontend Developer",
    "Machine Learning Engineer",
    "AI Research Engineer",
    "Data Scientist",
    "Data Analyst",
  ];

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragover") setIsDragOver(true);
    if (e.type === "dragleave") setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    setErrorMessage(null);
    const validExtensions = [".pdf", ".docx", ".txt"];
    const fileExt = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();

    if (!validExtensions.includes(fileExt)) {
      setErrorMessage("Please upload a PDF, DOCX, or TXT file.");
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setErrorMessage("File exceeds 15MB limit. Please upload a smaller document.");
      return;
    }

    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;

    setErrorMessage(null);
    try {
      setLoadingStep("Reading your document and preparing the parser...");
      await new Promise((r) => setTimeout(r, 400));

      setLoadingStep("Identifying your strengths, technical skills & achievements...");
      await new Promise((r) => setTimeout(r, 400));

      setLoadingStep("Benchmarking against top industry hiring standards...");
      await analyzeResume(selectedFile, targetRole);

      navigate("/ats-analysis");
    } catch (err: any) {
      setErrorMessage(err.message || "We couldn't connect to the analysis engine. Please ensure the backend is running.");
    }
  };

  return (
    <DashboardLayout
      title="Upload Your Resume"
      subtitle="Let our AI review your experience, spot missing keywords, and suggest recruiter-approved improvements."
    >
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Step 1: Target Role Selector */}
        <div className="saas-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-[#635BDB]/10 border border-[#635BDB]/20 flex items-center justify-center text-[#635BDB]">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0F172A]">Select Target Role Profile</h3>
              <p className="text-xs text-[#64748B]">The ATS score will be calibrated against this role's required skill set.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {targetRoles.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setTargetRole(role)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left transition-all border ${
                  targetRole === role
                    ? "bg-[#635BDB] text-white border-[#635BDB] shadow-sm shadow-[#635BDB]/25"
                    : "bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0] hover:border-[#635BDB]/40 hover:text-[#0F172A]"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Drag & Drop Zone */}
        <div
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`saas-card-static p-10 text-center transition-all border-2 border-dashed ${
            isDragOver
              ? "border-[#635BDB] bg-[#F4F3FF]"
              : "border-[#CBD5E1] hover:border-[#635BDB]/50"
          }`}
        >
          <div className="w-16 h-16 rounded-2xl bg-[#F4F3FF] border border-[#635BDB]/20 mx-auto flex items-center justify-center text-[#635BDB] mb-4 shadow-sm">
            <UploadCloud className="w-8 h-8" />
          </div>

          <h3 className="text-lg font-bold text-[#0F172A] mb-1">
            Choose or Drag & Drop Resume
          </h3>
          <p className="text-xs text-[#64748B] max-w-sm mx-auto mb-6">
            Supported formats: <span className="text-[#0F172A] font-semibold">PDF, DOCX, TXT</span> (Max file size: 15MB)
          </p>

          <label className="glow-cyan-btn inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs cursor-pointer">
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              className="hidden"
              onChange={handleFileInput}
              disabled={isAnalyzing}
            />
            <FileText className="w-4 h-4" />
            <span>Select Resume File</span>
          </label>

          {/* Selected File Feedback */}
          {selectedFile && (
            <div className="mt-6 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] max-w-md mx-auto flex items-center justify-between text-left">
              <div className="flex items-center gap-3 overflow-hidden">
                <FileText className="w-5 h-5 text-[#635BDB] shrink-0" />
                <div className="truncate">
                  <span className="text-xs font-bold text-[#0F172A] truncate block">
                    {selectedFile.name}
                  </span>
                  <span className="text-[11px] text-[#64748B]">
                    {Math.round(selectedFile.size / 1024)} KB
                  </span>
                </div>
              </div>
              <CheckCircle className="w-5 h-5 text-[#18A999] shrink-0 ml-2" />
            </div>
          )}
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-3 text-rose-700 text-xs">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Submit Button & Progress */}
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={handleSubmit}
            disabled={!selectedFile || isAnalyzing}
            className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
              !selectedFile || isAnalyzing
                ? "bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed"
                : "glow-cyan-btn"
            }`}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing Resume...</span>
              </>
            ) : (
              <>
                <span>Begin Comprehensive Analysis</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {isAnalyzing && (
            <div className="flex items-center gap-2 text-xs text-[#635BDB] animate-pulse">
              <Info className="w-3.5 h-3.5" />
              <span>{loadingStep || "Analysing resume..."}</span>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};
