import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AnalysisProvider } from "@/context/AnalysisContext";
import { LandingPage } from "@/pages/LandingPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { ResumeUploadPage } from "@/pages/ResumeUploadPage";
import { ATSAnalysisPage } from "@/pages/ATSAnalysisPage";
import { SkillGapPage } from "@/pages/SkillGapPage";
import { JobRecommendationsPage } from "@/pages/JobRecommendationsPage";
import { HistoryPage } from "@/pages/HistoryPage";
import { SettingsPage } from "@/pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AnalysisProvider>
        <BrowserRouter>
          <Routes>
            {/* Landing / Marketing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* SaaS Platform Workspaces */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/upload" element={<ResumeUploadPage />} />
            <Route path="/ats-analysis" element={<ATSAnalysisPage />} />
            <Route path="/skill-gap" element={<SkillGapPage />} />
            <Route path="/jobs" element={<JobRecommendationsPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/settings" element={<SettingsPage />} />

            {/* 404 Catch-All */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AnalysisProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
