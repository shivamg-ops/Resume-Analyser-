import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  UploadCloud,
  FileCheck2,
  TrendingUp,
  Brain,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Compass
} from "lucide-react";
import { useAnalysis } from "@/context/AnalysisContext";

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { analyzeResume, isAnalyzing } = useAnalysis();

  const handleQuickUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await analyzeResume(file);
      navigate("/ats-analysis");
    } catch (err: any) {
      alert(`Upload failed: ${err.message || "Backend error"}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FC] text-[#0F172A] relative overflow-hidden">
      {/* Top Navbar */}
      <nav className="container mx-auto px-6 h-20 flex items-center justify-between border-b border-[#E2E8F0] bg-white/80 backdrop-blur-md">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#635BDB] flex items-center justify-center text-white shadow-sm shadow-[#635BDB]/30">
            <Compass className="w-5 h-5" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-[#0F172A]">
            Resume<span className="text-[#635BDB]">Analyser</span>
          </span>
        </Link>

        <div className="flex items-center gap-5">
          <Link
            to="/dashboard"
            className="text-sm font-semibold text-[#64748B] hover:text-[#635BDB] transition-colors"
          >
            Dashboard
          </Link>
          <Link
            to="/upload"
            className="glow-cyan-btn px-5 py-2.5 rounded-xl text-xs font-bold transition-all"
          >
            Launch Platform
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-20 pb-24 text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#635BDB]/20 bg-[#F4F3FF] text-[#635BDB] text-xs font-bold mb-8 shadow-sm">
          <Sparkles className="w-4 h-4 text-[#635BDB]" />
          <span>Your Personal AI Career & Resume Mentor</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 font-display leading-[1.1] text-[#0F172A]">
          Land Your <span className="text-[#635BDB]">Dream Job</span> With Confidence
        </h1>

        <p className="text-base sm:text-lg text-[#334155] font-medium max-w-2xl mx-auto leading-relaxed mb-10">
          Get honest, recruiter-grade feedback on your resume in seconds. Discover what ATS algorithms love, which high-impact keywords you're missing, and which tech roles fit you best.
        </p>

        {/* Quick Upload CTA Box */}
        <div className="saas-card p-8 max-w-xl mx-auto mb-16 shadow-md border-[#E2E8F0]">
          <div className="w-14 h-14 rounded-2xl bg-[#F4F3FF] border border-[#635BDB]/20 flex items-center justify-center text-[#635BDB] mx-auto mb-4">
            <UploadCloud className="w-7 h-7" />
          </div>

          <h3 className="text-lg font-bold text-[#0F172A] mb-1">
            Drop Your Resume Here for Instant Feedback
          </h3>
          <p className="text-xs text-[#475569] font-medium mb-6">
            Supports PDF, DOCX, TXT. Fast, private, and calibrated against real tech recruiters.
          </p>

          <label className="glow-cyan-btn inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs cursor-pointer">
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              className="hidden"
              onChange={handleQuickUpload}
              disabled={isAnalyzing}
            />
            <Sparkles className="w-4 h-4" />
            <span>{isAnalyzing ? "Processing Resume..." : "Upload & Score Resume Free"}</span>
          </label>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="saas-card p-6">
            <div className="w-10 h-10 rounded-xl bg-[#635BDB]/10 border border-[#635BDB]/20 flex items-center justify-center text-[#635BDB] mb-4">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-[#0F172A] text-base mb-2">Recruiter-Grade ATS Scoring</h4>
            <p className="text-xs text-[#475569] leading-relaxed font-medium">
              Find out how Applicant Tracking Systems parse your experience and keyword density.
            </p>
          </div>

          <div className="saas-card p-6">
            <div className="w-10 h-10 rounded-xl bg-[#18A999]/10 border border-[#18A999]/20 flex items-center justify-center text-[#18A999] mb-4">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-[#0F172A] text-base mb-2">Skill Gap Roadmap</h4>
            <p className="text-xs text-[#475569] leading-relaxed font-medium">
              Identify exactly which frameworks or tools are missing between your resume and your target title.
            </p>
          </div>

          <div className="saas-card p-6">
            <div className="w-10 h-10 rounded-xl bg-[#F4A340]/15 border border-[#F4A340]/30 flex items-center justify-center text-[#F4A340] mb-4">
              <Brain className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-[#0F172A] text-base mb-2">Semantic AI Career Match</h4>
            <p className="text-xs text-[#475569] leading-relaxed font-medium">
              Matches your skills to high-demand engineering roles using advanced vector similarity.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
