import React from "react";
import { Link } from "react-router-dom";
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
  Bot
} from "lucide-react";
import FloatingOrbs from "@/components/FloatingOrbs";
import { useAnalysis } from "@/context/AnalysisContext";

export const LandingPage: React.FC = () => {
  const { analyzeResume, isAnalyzing } = useAnalysis();

  const handleQuickUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await analyzeResume(file);
      window.location.href = "/ats-analysis";
    } catch (err: any) {
      alert(`Upload failed: ${err.message || "Backend error"}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#070D12] text-[#FFFFFF] relative overflow-hidden">
      <FloatingOrbs />

      {/* Top Navbar */}
      <nav className="relative z-20 container mx-auto px-6 h-20 flex items-center justify-between border-b border-[#1E3844]/60 bg-[#070D12]/40 backdrop-blur-xl">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00F2FE] via-[#0EA5E9] to-[#0D9488] p-[1.5px] shadow-lg shadow-[#00F2FE]/25 group-hover:shadow-[#00F2FE]/50 transition-all">
            <div className="w-full h-full bg-[#070D12] rounded-[10px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-[#00F2FE]" />
            </div>
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-[#FFFFFF]">
            Resume<span className="text-[#00F2FE]">Analyser</span>
          </span>
        </Link>

        <div className="flex items-center gap-5">
          <Link
            to="/dashboard"
            className="text-sm font-semibold text-[#94A3B8] hover:text-[#00F2FE] transition-colors"
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
      <section className="relative z-10 container mx-auto px-6 pt-20 pb-28 text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00F2FE]/40 bg-[#00F2FE]/10 text-[#00F2FE] text-xs font-bold mb-8 animate-pulse-glow shadow-sm shadow-[#00F2FE]/20">
          <Sparkles className="w-4 h-4" />
          <span>Your Personal AI Career & Resume Mentor</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 font-display leading-[1.1]">
          Land Your <span className="text-gradient-cyan">Dream Job</span> With Confidence
        </h1>

        <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed mb-12">
          Get honest, recruiter-grade feedback on your resume in seconds. Discover what ATS algorithms love, which high-impact keywords you're missing, and which tech roles fit you best.
        </p>

        {/* Upload Action Area */}
        <div className="saas-card p-10 max-w-xl mx-auto text-center border-dashed border-2 border-[#00F2FE]/40 bg-[#0F1D24]/95 hover:border-[#00F2FE] transition-all mb-8 shadow-2xl shadow-[#00F2FE]/10">
          <div className="w-16 h-16 rounded-2xl bg-[#00F2FE]/10 border border-[#00F2FE]/30 mx-auto flex items-center justify-center text-[#00F2FE] mb-4 shadow-lg shadow-[#00F2FE]/20">
            <UploadCloud className="w-8 h-8" />
          </div>

          <h3 className="text-xl font-bold text-[#FFFFFF] mb-1">
            Drag & Drop Your Resume Here
          </h3>
          <p className="text-xs text-[#94A3B8] mb-6">
            Supported formats: <strong className="text-[#00F2FE]">PDF, DOCX</strong> (Up to 15MB)
          </p>

          <label className="glow-cyan-btn inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm cursor-pointer">
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              className="hidden"
              onChange={handleQuickUpload}
              disabled={isAnalyzing}
            />
            <span>{isAnalyzing ? "Analyzing Resume..." : "Browse Files"}</span>
            <ArrowRight className="w-4 h-4" />
          </label>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-[#1E3844]/60">
          <div className="saas-card p-5 text-center">
            <div className="w-10 h-10 rounded-xl bg-[#00F2FE]/10 border border-[#00F2FE]/30 mx-auto flex items-center justify-center text-[#00F2FE] mb-3">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-[#FFFFFF] mb-1">ATS Simulation</h4>
            <p className="text-xs text-[#94A3B8]">Scored against industry standard screening algorithms</p>
          </div>

          <div className="saas-card p-5 text-center">
            <div className="w-10 h-10 rounded-xl bg-[#0EA5E9]/10 border border-[#0EA5E9]/30 mx-auto flex items-center justify-center text-[#0EA5E9] mb-3">
              <Brain className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-[#FFFFFF] mb-1">Semantic NLP Embeddings</h4>
            <p className="text-xs text-[#94A3B8]">Deep context mapping using all-MiniLM-L6-v2</p>
          </div>

          <div className="saas-card p-5 text-center">
            <div className="w-10 h-10 rounded-xl bg-[#2DD4BF]/10 border border-[#2DD4BF]/30 mx-auto flex items-center justify-center text-[#2DD4BF] mb-3">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-[#FFFFFF] mb-1">Skill Gap Roadmaps</h4>
            <p className="text-xs text-[#94A3B8]">Tailored recommendations for target roles</p>
          </div>
        </div>
      </section>
    </div>
  );
};
