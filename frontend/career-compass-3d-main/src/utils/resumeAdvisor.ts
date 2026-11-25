export interface ActionSuggestion {
  id: string;
  category: "critical" | "warning" | "power-words" | "formatting";
  title: string;
  problem: string;
  recommendation: string;
  exampleSnippet?: string;
  keywordsToAdd?: string[];
  impact: string;
}

export interface PowerWordRecommendation {
  roleCategory: string;
  actionVerbs: string[];
  metricsExamples: string[];
  phrasesToAvoid: { avoid: string; replaceWith: string }[];
}

export const generateResumeSuggestions = (
  extractedSkills: string[],
  missingSkills: string[],
  targetRole: string,
  atsScore: number
): ActionSuggestion[] => {
  const suggestions: ActionSuggestion[] = [];

  // 1. Missing Critical Keywords
  if (missingSkills.length > 0) {
    const topMissing = missingSkills.slice(0, 3).join(", ");
    suggestions.push({
      id: "sug_missing_keywords",
      category: "critical",
      title: `Add Mandatory ATS Keywords: ${topMissing}`,
      problem: `Your resume lacks core technical keywords (${topMissing}) frequently scanned by corporate ATS filters for ${targetRole} positions.`,
      recommendation: `Include these skills naturally inside your 'Technical Skills' inventory and reference at least one hands-on project demonstrating their application.`,
      keywordsToAdd: missingSkills,
      exampleSnippet: `• Architected scalable services using ${missingSkills[0] || "REST APIs"} and optimized performance, cutting database latency by 25%.`,
      impact: `+${Math.min(15, missingSkills.length * 5)}% ATS Score Boost`
    });
  }

  // 2. Action Verbs & Power Words
  suggestions.push({
    id: "sug_power_words",
    category: "power-words",
    title: "Replace Weak Verbs with High-Impact Power Words",
    problem: "Phrases like 'responsible for', 'worked on', or 'helped with' sound passive and score lower in recruiter ATS screening.",
    recommendation: "Begin every bullet point with strong executive action verbs (e.g., Spearheaded, Engineered, Overhauled, Orchestrated).",
    exampleSnippet: "❌ 'Responsible for developing the login API'\n✅ 'Engineered secure OAuth 2.0 authentication pipeline serving 50k+ active accounts.'",
    impact: "+10% Recruiter Impression Score"
  });

  // 3. Quantification & Metrics
  suggestions.push({
    id: "sug_metrics",
    category: "warning",
    title: "Inject Quantified Business Metrics (The X-Y-Z Formula)",
    problem: "Bullet points describing tasks without numerical metrics make it difficult for hiring systems to gauge seniority.",
    recommendation: "Apply Google's X-Y-Z formula: 'Accomplished [X] as measured by [Y], by doing [Z]'. Add percentages, scale, or dollar values.",
    exampleSnippet: "✅ 'Boosted user retention by 18% over 6 months by refactoring React client-side rendering with cached state management.'",
    impact: "Essential for Senior & Mid-Level Shortlisting"
  });

  // 4. ATS Layout & Formatting Rules
  suggestions.push({
    id: "sug_formatting",
    category: "formatting",
    title: "ATS Parser Layout Guidelines",
    problem: "Tables, text-boxes, multi-column layouts, graphics, and headers/footers often scramble automated ATS text extraction.",
    recommendation: "Use a clean single-column structure, standard section headers ('Work Experience', 'Education', 'Technical Skills'), and clean bullet points.",
    impact: "Ensures 100% Parsing Accuracy Across All Scanners"
  });

  // 5. Targeted Summary Statement
  suggestions.push({
    id: "sug_summary",
    category: "warning",
    title: `Tailor Profile Summary to '${targetRole}'`,
    problem: "Generic summary intros ('Hardworking developer looking for challenging opportunities') dilute search relevance.",
    recommendation: `Explicitly state your target title: '${targetRole} with hands-on experience in ${extractedSkills.slice(0, 3).join(", ") || "software development"}'.`,
    exampleSnippet: `Results-driven ${targetRole} experienced in scalable system design, ${extractedSkills[0] || "modern technologies"}, and cross-functional agile delivery.`,
    impact: "Increases Keyword Density in Top 30% of Document"
  });

  return suggestions;
};

export const getPowerWordsForRole = (role: string): PowerWordRecommendation => {
  const normalized = role.toLowerCase();

  if (normalized.includes("machine learning") || normalized.includes("ai") || normalized.includes("data")) {
    return {
      roleCategory: "Data Science & AI Engineering",
      actionVerbs: [
        "Architected", "Engineered", "Trained", "Fine-tuned", "Deployed",
        "Optimized", "Benchmarked", "Pipelines", "Clustered", "Synthesized"
      ],
      metricsExamples: [
        "Reduced inference latency by 45% using TensorRT quantization.",
        "Increased F1-score from 0.78 to 0.91 through hyperparameter tuning.",
        "Processed 2.5TB+ daily streaming data via PySpark pipelines."
      ],
      phrasesToAvoid: [
        { avoid: "Worked on ML models", replaceWith: "Trained and benchmarked deep neural architectures" },
        { avoid: "Helped clean data", replaceWith: "Engineered automated data preprocessing pipelines" },
        { avoid: "Good knowledge of Python", replaceWith: "Proficient in Python (NumPy, PyTorch, Pandas)" }
      ]
    };
  }

  // Default to Software / Fullstack / Backend / Frontend
  return {
    roleCategory: "Software Engineering & Full Stack",
    actionVerbs: [
      "Spearheaded", "Engineered", "Refactored", "Architected", "Automated",
      "Accelerated", "Orchestrated", "Implemented", "Revamped", "Streamlined"
    ],
    metricsExamples: [
      "Reduced API p99 response times from 800ms to 120ms with Redis caching.",
      "Decreased frontend bundle size by 38%, achieving a 98 Lighthouse score.",
      "Maintained 99.95% uptime across microservices handling 100k daily requests."
    ],
    phrasesToAvoid: [
      { avoid: "Responsible for bug fixing", replaceWith: "Diagnosed and resolved critical race conditions, cutting defect rate by 30%" },
      { avoid: "Created web pages with React", replaceWith: "Architected component-driven responsive interfaces with TypeScript & Tailwind" },
      { avoid: "Worked with APIs", replaceWith: "Engineered robust RESTful microservice contracts and pagination logic" }
    ]
  };
};
