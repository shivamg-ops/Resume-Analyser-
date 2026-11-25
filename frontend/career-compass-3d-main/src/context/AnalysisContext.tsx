import React, { createContext, useContext, useState, useEffect } from "react";
import type { ResultData, JobMatch } from "@/types/result";

export interface AnalysisRecord {
  id: string;
  fileName: string;
  fileSize?: string;
  targetRole: string;
  atsScore: number;
  extractedSkills: string[];
  jobMatches: JobMatch[];
  analyzedAt: string;
}

interface AnalysisContextType {
  currentAnalysis: ResultData | null;
  currentFileName: string;
  targetRole: string;
  setTargetRole: (role: string) => void;
  analysisHistory: AnalysisRecord[];
  isAnalyzing: boolean;
  analyzeResume: (file: File, selectedRole?: string) => Promise<boolean>;
  selectHistoryItem: (record: AnalysisRecord) => void;
  clearCurrentAnalysis: () => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

const STORAGE_KEY = "resume_analyser_history";

export const AnalysisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentAnalysis, setCurrentAnalysis] = useState<ResultData | null>(null);
  const [currentFileName, setCurrentFileName] = useState<string>("");
  const [targetRole, setTargetRole] = useState<string>("Full Stack Developer");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse history from local storage", e);
    }
    // Default initial mock history item so users see a populated dashboard initially
    return [
      {
        id: "hist_1",
        fileName: "Senior_FullStack_Engineer_Resume.pdf",
        fileSize: "245 KB",
        targetRole: "Full Stack Developer",
        atsScore: 88,
        extractedSkills: ["python", "django", "react", "javascript", "sql", "html", "css", "git", "api"],
        jobMatches: [
          { job: "Full Stack Developer", semantic_score: 78.4, ats_score: 87.5, missing_skills: ["docker"] },
          { job: "Backend Developer", semantic_score: 64.2, ats_score: 80.0, missing_skills: ["flask"] },
          { job: "Frontend Developer", semantic_score: 58.1, ats_score: 75.0, missing_skills: ["tailwind"] }
        ],
        analyzedAt: "Yesterday at 4:30 PM"
      },
      {
        id: "hist_2",
        fileName: "ML_AI_Researcher_CV.pdf",
        fileSize: "310 KB",
        targetRole: "Machine Learning Engineer",
        atsScore: 92,
        extractedSkills: ["python", "pytorch", "deep learning", "machine learning", "nlp", "numpy", "pandas"],
        jobMatches: [
          { job: "Machine Learning Engineer", semantic_score: 84.1, ats_score: 92.0, missing_skills: ["tensorflow"] },
          { job: "AI Research Engineer", semantic_score: 79.5, ats_score: 88.5, missing_skills: ["transformers"] }
        ],
        analyzedAt: "Nov 23, 2026"
      }
    ];
  });

  // Save history on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(analysisHistory));
    } catch (e) {
      console.error("Failed to save history", e);
    }
  }, [analysisHistory]);

  const analyzeResume = async (file: File, selectedRole?: string): Promise<boolean> => {
    setIsAnalyzing(true);
    const chosenRole = selectedRole || targetRole;
    if (selectedRole) setTargetRole(selectedRole);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
      const response = await fetch(`${apiBaseUrl}/api/analyze/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || "Backend request failed");
      }

      const data: ResultData = await response.json();
      setCurrentAnalysis(data);
      setCurrentFileName(file.name);

      // Best matched score for history
      const bestScore = data.job_matches && data.job_matches.length > 0 
        ? Math.round(data.job_matches[0].ats_score) 
        : 75;

      const newRecord: AnalysisRecord = {
        id: `analysis_${Date.now()}`,
        fileName: file.name,
        fileSize: `${Math.round(file.size / 1024)} KB`,
        targetRole: chosenRole,
        atsScore: bestScore,
        extractedSkills: data.extracted_skills || [],
        jobMatches: data.job_matches || [],
        analyzedAt: "Just now"
      };

      setAnalysisHistory((prev) => [newRecord, ...prev.slice(0, 19)]);
      return true;
    } catch (error: any) {
      console.error("Resume analysis error:", error);
      throw error;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const selectHistoryItem = (record: AnalysisRecord) => {
    setCurrentAnalysis({
      extracted_skills: record.extractedSkills,
      job_matches: record.jobMatches
    });
    setCurrentFileName(record.fileName);
    setTargetRole(record.targetRole);
  };

  const clearCurrentAnalysis = () => {
    setCurrentAnalysis(null);
    setCurrentFileName("");
  };

  return (
    <AnalysisContext.Provider
      value={{
        currentAnalysis,
        currentFileName,
        targetRole,
        setTargetRole,
        analysisHistory,
        isAnalyzing,
        analyzeResume,
        selectHistoryItem,
        clearCurrentAnalysis,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error("useAnalysis must be used within an AnalysisProvider");
  }
  return context;
};
