export interface ContactInfo {
  candidate_name?: string;
  email?: string;
  phone?: string;
  linkedin?: string | null;
  github?: string | null;
}

export interface JobMatch {
  job: string;
  semantic_score: number;
  ats_score: number;
  missing_skills: string[];
}

export interface ResultData {
  extracted_skills: string[];
  job_matches: JobMatch[];
  resume_text?: string;
  contact_info?: ContactInfo;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  targetRole: string;
}

export const DEFAULT_PROFILE: UserProfile = {
  name: "",
  email: "",
  phone: "",
  location: "",
  experience: "",
  targetRole: "Full Stack Developer",
};

export const PROFILE_STORAGE_KEY = "resume_analyser_profile";
export const RESULTS_STORAGE_KEY = "resume_analyser_results";

export function loadProfile(): UserProfile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  try {
    const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (saved) return { ...DEFAULT_PROFILE, ...JSON.parse(saved) };
  } catch (e) {
    console.error("Failed to load profile", e);
  }
  return DEFAULT_PROFILE;
}

export function saveProfile(profile: UserProfile): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error("Failed to save profile", e);
  }
}

export function loadSavedResults(): ResultData | null {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem(RESULTS_STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error("Failed to load saved results", e);
  }
  return null;
}

export function saveResults(data: ResultData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(RESULTS_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save results", e);
  }
}
