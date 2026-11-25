import React, { useState, useCallback, useEffect } from "react";
import { Compass, Edit2, Save } from "lucide-react";
import UploadZone from "@/components/UploadZone";
import LoadingScreen from "@/components/LoadingScreen";
import ResultsDashboard from "@/components/ResultsDashboard";
import FloatingOrbs from "@/components/FloatingOrbs";
import logo from "@/assets/logo.png";
import type { ResultData, UserProfile, DEFAULT_PROFILE, loadProfile, saveProfile, loadSavedResults, saveResults } from "@/types/result";


type Screen = "landing" | "loading" | "results";

interface LoadingStep {
  message: string;
  completed: boolean;
}



const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("landing");
  const [loadingSteps, setLoadingSteps] = useState<LoadingStep[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [results, setResults] = useState<ResultData | null>(null);
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [showProfileEdit, setShowProfileEdit] = useState(false);

  // Load profile + saved results from localStorage on mount
  useEffect(() => {
    setProfile(loadProfile());
    const saved = loadSavedResults();
    if (saved) {
      setResults(saved);
      setCurrentScreen("results");
    }
  }, []);

  // Persist profile to localStorage whenever it changes
  useEffect(() => {
    saveProfile(profile);
  }, [profile]);

  const updateProfileField = useCallback(
    (key: keyof UserProfile, value: string) => {
      setProfile((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  // 🔥 REAL BACKEND CALL (FIXED)
  const simulateProcessing = useCallback(async (file: File) => {
    setCurrentScreen("loading");
    setLoadingSteps([]);

    const steps = [
      "🔍 Parsing resume...",
      "🧠 Analyzing skills & experience...",
      "📊 Calculating ATS compatibility...",
      "📌 Finding best job matches...",
    ];

    for (const step of steps) {
      setCurrentMessage(step);
      await new Promise((res) => setTimeout(res, 500));
      setLoadingSteps((prev) => [...prev, { message: step, completed: true }]);
    }

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
        throw new Error(errorData?.error || "Backend returned error");
      }

      const data = await response.json();
      setResults(data);
      saveResults(data);
      setCurrentScreen("results");
    } catch (error: any) {
      console.error(error);
      alert(`❌ Failed to analyze resume: ${error.message || "Backend unreachable"}`);
      setCurrentScreen("landing");
    }
  }, []);

  const handleFileSelect = useCallback(
    (file: File) => {
      simulateProcessing(file);
    },
    [simulateProcessing]
  );

  return (
    <div className="min-h-screen relative">
      <FloatingOrbs />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        <header className="flex items-center justify-between pb-8 border-b border-border/50 mb-12">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Career Compass" className="h-10" />
            <span className="font-bold text-xl tracking-tight">Career Compass</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowProfileEdit((prev) => !prev)}
              className="p-2 rounded-lg hover:bg-primary/5 transition-colors"
              title="Edit Profile"
            >
              <Edit2 className="w-5 h-5" />
            </button>
            {profile.name && (
              <span className="text-sm text-muted-foreground hidden sm:block">
                {profile.name}
              </span>
            )}
          </div>
        </header>

        {/* Profile Editor */}
        {showProfileEdit && (
          <div className="bg-card border border-border rounded-2xl p-6 mb-8 animate-fade-in">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Edit2 className="w-5 h-5" /> Edit Your Profile
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => updateProfileField("name", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => updateProfileField("email", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => updateProfileField("phone", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="+1 234 567 8900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => updateProfileField("location", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="City, Country"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Experience</label>
                <input
                  type="text"
                  value={profile.experience}
                  onChange={(e) => updateProfileField("experience", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="3+ years"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Target Role</label>
                <input
                  type="text"
                  value={profile.targetRole}
                  onChange={(e) => updateProfileField("targetRole", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Full Stack Developer"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowProfileEdit(false)}
                className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                <Save className="w-4 h-4 mr-2" /> Save Profile
              </button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Profile saved locally on your device (no account needed).
            </p>
          </div>
        )}

        {currentScreen === "landing" && (
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Compass className="w-4 h-4" />
                AI-Powered Career Analysis
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
                Find Your <span className="text-gradient">Perfect Career</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Upload your resume and let AI calculate ATS score and best career
                matches.
              </p>
            </div>

            <UploadZone onFileSelect={handleFileSelect} />
          </div>
        )}

        {currentScreen === "loading" && (
          <LoadingScreen
            steps={loadingSteps}
            currentMessage={currentMessage}
          />
        )}

        {currentScreen === "results" && results && (
          <ResultsDashboard data={results} />
        )}
      </div>
    </div>
  );
};

export default Index;
