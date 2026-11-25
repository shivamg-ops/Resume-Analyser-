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
