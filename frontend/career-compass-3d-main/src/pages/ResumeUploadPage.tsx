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
      setErrorMessage("Unsupported file format. Please upload a PDF, DOCX, or TXT file.");
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
      setLoadingStep("Reading document structure & paragraphs...");
      await new Promise((r) => setTimeout(r, 400));

      setLoadingStep("Extracting technical entities & skill taxonomy...");
      await new Promise((r) => setTimeout(r, 400));

      setLoadingStep("Computing semantic embeddings & ATS alignment...");
      await analyzeResume(selectedFile, targetRole);

      navigate("/ats-analysis");
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to analyze resume. Please ensure the backend is running.");
    }
  };

  return (
    <DashboardLayout
      title="Upload & Ingestion"
      subtitle="Feed your latest resume into our neural pipeline for automated ATS benchmarking."
    >
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Step 1: Target Role Selector */}
        <div className="saas-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-[#22C1C3]/10 border border-[#22C1C3]/30 flex items-center justify-center text-[#22C1C3]">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F1F5F9]">Select Target Role Profile</h3>
              <p className="text-xs text-[#94A3B8]">The ATS score will be calibrated against this role's required skill set.</p>
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
                    ? "bg-[#22C1C3]/15 text-[#22C1C3] border-[#22C1C3] shadow-sm shadow-[#22C1C3]/20"
                    : "bg-[#0B151B] text-[#94A3B8] border-[#263B43] hover:border-[#94A3B8]/50 hover:text-[#F1F5F9]"
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
              ? "border-[#22C1C3] bg-[#22C1C3]/5"
              : "border-[#263B43] hover:border-[#22C1C3]/50"
          }`}
        >
          <div className="w-16 h-16 rounded-2xl bg-[#14232B] border border-[#263B43] mx-auto flex items-center justify-center text-[#22C1C3] mb-4 shadow-lg shadow-[#22C1C3]/10">
            <UploadCloud className="w-8 h-8" />
          </div>

          <h3 className="text-lg font-bold text-[#F1F5F9] mb-1">
            Choose or Drag & Drop Resume
          </h3>
          <p className="text-xs text-[#94A3B8] max-w-sm mx-auto mb-6">
            Supported formats: <span className="text-[#F1F5F9] font-medium">PDF, DOCX, TXT</span> (Max file size: 15MB)
          </p>

          <label className="glow-cyan-btn inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs text-[#0B151B] cursor-pointer">
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              className="hidden"
              onChange={handleFileInput}
              disabled={isAnalyzing}
            />
            <span>Browse Local File</span>
          </label>

          {/* Selected File Details */}
          {selectedFile && (
            <div className="mt-6 p-4 rounded-xl bg-[#0B151B] border border-[#263B43] flex items-center justify-between text-left max-w-md mx-auto">
              <div className="flex items-center gap-3 min-w-0">
                <FileText className="w-6 h-6 text-[#22C1C3] shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[#F1F5F9] truncate">{selectedFile.name}</p>
                  <p className="text-[10px] text-[#94A3B8]">{Math.round(selectedFile.size / 1024)} KB</p>
                </div>
              </div>
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            </div>
          )}
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="p-4 rounded-xl border border-rose-500/40 bg-rose-500/10 text-rose-300 flex items-start gap-3 text-xs leading-relaxed">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
            <div>
              <span className="font-bold">Error:</span> {errorMessage}
            </div>
          </div>
        )}

        {/* Submit Button & Progress State */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#263B43]">
          <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
            <Info className="w-4 h-4 text-[#22C1C3]" />
            <span>Files are processed safely in your isolated backend session.</span>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!selectedFile || isAnalyzing}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-xs transition-all ${
              !selectedFile || isAnalyzing
                ? "bg-[#263B43] text-[#94A3B8] cursor-not-allowed"
                : "glow-cyan-btn text-[#0B151B]"
            }`}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{loadingStep || "Analyzing..."}</span>
              </>
            ) : (
              <>
                <span>Upload & Run ATS Analysis</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

