// Every fact here comes from the candidate profile in ai-job-search.
// Do not add metrics, roles, dates or skills that are not in those files.

export const PROFILE = {
  name: "Suvan Kasina",
  role: "ML / AI Engineer",
  location: "San Antonio, TX",
  email: "suvan.kasina8@gmail.com",
  linkedin: "https://linkedin.com/in/suvan-kasina",
  github: "https://github.com/Suvan8806",
  resumeHref: "/resume.pdf",
  // Set to "/photo.jpg" (or similar, in /public) once the photo arrives.
  photoSrc: "/photo.jpg" as string | null,
  tagline:
    "I build AI agents and the evals that keep them honest, the infrastructure that trains models across many machines, and computer vision research.",
} as const;

export const FOCUS_AREAS = [
  {
    code: "01",
    title: "Agentic AI & LLM Evaluation",
    blurb:
      "Agents that act on real systems, gated by deterministic tests, ablations and red-team runs instead of vibes.",
  },
  {
    code: "02",
    title: "ML Infrastructure & Distributed Training",
    blurb:
      "Kubernetes clusters, PyTorch Distributed, Kubeflow and the CI/CD that ships models.",
  },
  {
    code: "03",
    title: "Computer Vision Research",
    blurb:
      "Dense prediction and semantic segmentation ablations, Quaternion Neural Networks, and interpretability for vision transformers.",
  },
] as const;

export const BIO = [
  "Hey, I'm Suvan. I study computer science at UTSA's Honors College. I graduate with my B.S. in May 2027, and I'm looking for full-time new-grad roles.",
  "I build machine learning systems, and three kinds of work pull me in the most: agentic AI and the evaluations that keep agents honest, the infrastructure that trains models across many machines, and computer vision research.",
  "I like proving that something works instead of just claiming it. Almost everything I build ships with an ablation or a test suite behind it. FilingAgent's evaluation harness has 429 tests of its own, and Shipyard refuses to deploy an agent until it passes deterministic database checks.",
  "I've done that work in a computer vision lab, as an AI Intern at MITRE, and at hackathons, where I'm a 3x Hackathon Prize Winner. I built Shipyard solo in about 24 hours at HackTX 2026.",
  "Away from the keyboard, I love talking with and meeting new people. I do my best work on close-knit teams that feel almost like family.",
] as const;

export const EDUCATION = [
  {
    school: "The University of Texas at San Antonio (UTSA)",
    degree: "B.S. Computer Science, Honors College",
    date: "Expected May 2027",
    detail: "GPA 3.97 · Dean's List",
  },
] as const;

export const COURSEWORK = [
  "Machine Learning",
  "Artificial Intelligence",
  "NLP",
  "Data Science",
  "High-Performance ML (CUDA, Spark, HPC)",
  "Data Structures & Algorithms",
  "Operating Systems",
  "Cloud Computing",
  "Database Systems",
  "Statistics",
  "Linear Algebra",
  "Discrete Math",
  "Calculus",
] as const;

export const HPML_RESEARCH =
  "I implement ML research papers weekly on distributed computing platforms (Apache Spark, SPOCK HPC), analyzing and optimizing foundational and recent model architectures for parallelism and compute efficiency.";

export const PRIZE_SUMMARY = "3x Hackathon Prize Winner";
export const PRIZE_FOOTNOTE = "3 prizes across 2 hackathons";

export type Award = {
  title: string;
  event: string;
  date: string;
  detail: string;
  projectSlug?: string;
};

export const AWARDS: readonly Award[] = [
  {
    title: "1st Place, NMC2 track, HackTX 2026",
    event: "HackTX 2026",
    date: "Oct 2026",
    detail:
      'Shipyard, built solo in about 24 hours for the NMC2 "Build the Platform Behind the Agent" track.',
    projectSlug: "shipyard",
  },
  {
    title: "1st Place Overall & Best Use of HydraDB, Frontier Tower Hackathon SF",
    event: "Frontier Tower Hackathon, San Francisco",
    date: "Jul 2026",
    detail: "GhostThread, an agentic complaint-to-fix pipeline.",
    projectSlug: "ghostthread",
  },
  {
    title: "Y Combinator Startup School",
    event: "Y Combinator",
    date: "Jul 2026",
    detail: "Selected at a <5% acceptance rate, with $20K+ in startup credits.",
  },
  {
    title: "Dean's List",
    event: "UTSA Honors College",
    date: "",
    detail: "B.S. Computer Science, GPA 3.97.",
  },
];

export const AVAILABILITY = [
  { term: "New grad", detail: "Looking for full-time new-grad roles" },
  { term: "Graduating", detail: "B.S. Computer Science, May 2027" },
] as const;
