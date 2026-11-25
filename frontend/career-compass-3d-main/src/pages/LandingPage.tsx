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
  Bot
} from "lucide-react";
import FloatingOrbs from "@/components/FloatingOrbs";
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
    <div className="min-h-screen bg-[#0B151B] text-[#F1F5F9] relative overflow-hidden">
      <FloatingOrbs />

      {/* Top Navbar */}
      <nav className="relative z-20 container mx-auto px-6 h-20 flex items-center justify-between border-b border-[#263B43]/50">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#22C1C3] to-[#0D9488] p-[1.5px] shadow-lg shadow-[#22C1C3]/20">
            <div className="w-full h-full bg-[#0B151B] rounded-[10px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-[#22C1C3]" />
            </div>
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-[#F1F5F9]">
            Resume<span className="text-[#22C1C3]">Analyser</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/dashboard"
            className="text-sm font-semibold text-[#94A3B8] hover:text-[#F1F5F9] transition-colors"
          >
            Dashboard
          </Link>
          <Link
            to="/upload"
            className="glow-cyan-btn px-5 py-2.5 rounded-xl font-semibold text-xs text-[#0B151B] transition-all"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-6 pt-20 pb-28 text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#22C1C3]/30 bg-[#22C1C3]/10 text-[#22C1C3] text-xs font-semibold mb-8 animate-pulse-glow">
          <Sparkles className="w-4 h-4" />
          <span>Next-Generation Neural Career Matcher</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 font-display leading-[1.1]">
          Find Your <span className="text-gradient-cyan">Perfect Career</span> with AI
        </h1>

        <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed mb-12">
          Intelligently parse resumes, calculate deep ATS compatibility scores, detect critical skill gaps, and match with high-growth tech positions.
        </p>

        {/* Upload Action Area */}
        <div className="saas-card p-8 max-w-xl mx-auto text-center border-dashed border-2 border-[#22C1C3]/40 bg-[#14232B]/90 hover:border-[#22C1C3] transition-all mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[#22C1C3]/10 border border-[#22C1C3]/30 mx-auto flex items-center justify-center text-[#22C1C3] mb-4">
            <UploadCloud className="w-8 h-8" />
          </div>

          <h3 className="text-lg font-bold text-[#F1F5F9] mb-1">
            Drag & Drop Your Resume Here
          </h3>
          <p className="text-xs text-[#94A3B8] mb-6">
            Supported formats: <strong className="text-[#F1F5F9]">PDF, DOCX</strong> (Up to 15MB)
          </p>

          <label className="glow-cyan-btn inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-[#0B151B] cursor-pointer">
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-[#263B43]/50">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-xl bg-[#14232B] border border-[#263B43] flex items-center justify-center text-[#22C1C3] mb-3">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-[#F1F5F9] mb-1">ATS Simulation</h4>
            <p className="text-xs text-[#94A3B8]">Scored against industry standard screening algorithms</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-xl bg-[#14232B] border border-[#263B43] flex items-center justify-center text-[#0D9488] mb-3">
              <Brain className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-[#F1F5F9] mb-1">Semantic NLP Embeddings</h4>
            <p className="text-xs text-[#94A3B8]">Deep context mapping using all-MiniLM-L6-v2</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-xl bg-[#14232B] border border-[#263B43] flex items-center justify-center text-emerald-400 mb-3">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-[#F1F5F9] mb-1">Skill Gap Roadmaps</h4>
            <p className="text-xs text-[#94A3B8]">Tailored recommendations for target roles</p>
          </div>
        </div>
      </section>
    </div>
  );
};

