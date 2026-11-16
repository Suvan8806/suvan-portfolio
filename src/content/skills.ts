// The "cyberware" brain map. Each brain region holds one skill category.
// `core` marks the primary skills listed in the candidate profile.
// `refs` point at where the skill was actually used (projects or roles).

export type SkillRef =
  | { kind: "project"; id: string }
  | { kind: "role"; id: string }
  | { kind: "edu"; id: "hpml" };

export type Skill = {
  name: string;
  core?: boolean;
  refs?: readonly SkillRef[];
};

export type BrainRegion = {
  id: string;
  name: string;
  fn: string;
  category: string;
  side: "left" | "right";
  slot: 0 | 1 | 2 | 3;
  points: string;
  anchor: readonly [number, number];
  skills: readonly Skill[];
};

const p = (id: string): SkillRef => ({ kind: "project", id });
const r = (id: string): SkillRef => ({ kind: "role", id });
const HPML: SkillRef = { kind: "edu", id: "hpml" };

export const BRAIN_REGIONS: readonly BrainRegion[] = [
  {
    id: "motor-cortex",
    name: "Motor Cortex",
    fn: "Execution · shipping",
    category: "Cloud & DevOps",
    side: "left",
    slot: 0,
    points: "245,47 300,43 282,140 262,232 212,238 232,140",
    anchor: [252, 120],
    skills: [
      { name: "AWS (EC2, S3)", core: true, refs: [r("mitre"), r("acm")] },
      { name: "Kubernetes", core: true, refs: [r("mitre"), p("torchway")] },
      { name: "Docker", core: true, refs: [r("mitre"), r("acm"), p("torchway"), p("driftwatch")] },
      { name: "CI/CD", core: true, refs: [r("mitre"), r("acm")] },
      { name: "Podman", refs: [r("mitre")] },
      { name: "Jenkins", refs: [r("mitre")] },
      { name: "GitHub Actions", refs: [p("torchway")] },
      { name: "Vercel", refs: [p("shipyard"), p("farehunter")] },
      { name: "Git" },
      { name: "Linux" },
    ],
  },
  {
    id: "prefrontal-cortex",
    name: "Prefrontal Cortex",
    fn: "Planning · decisions",
    category: "LLMs & Agentic AI",
    side: "left",
    slot: 1,
    points:
      "245,47 200,55 160,68 130,84 105,102 85,130 74,160 70,190 78,228 92,250 115,260 140,264 212,238 232,140",
    anchor: [150, 170],
    skills: [
      { name: "RAG", core: true, refs: [p("filingagent"), p("repo-mind")] },
      { name: "LangGraph", core: true, refs: [p("filingagent")] },
      { name: "LangChain", core: true, refs: [p("repo-mind")] },
      { name: "Claude API", core: true, refs: [p("ghostthread")] },
      { name: "MCP servers", refs: [p("shipyard")] },
      { name: "Tool calling", refs: [p("shipyard"), p("filingagent")] },
      {
        name: "LLM evaluation / red-teaming",
        refs: [p("shipyard"), p("filingagent"), p("ghostthread")],
      },
      { name: "Vercel AI SDK", refs: [p("shipyard")] },
      { name: "Google Gemini", refs: [p("shipyard")] },
      { name: "Groq", refs: [p("shipyard")] },
      { name: "ChromaDB", refs: [p("filingagent"), p("repo-mind")] },
      { name: "Ollama", refs: [p("filingagent"), p("repo-mind")] },
      { name: "Prompt engineering", refs: [p("ghostthread"), p("filingagent")] },
    ],
  },
  {
    id: "temporal-lobe",
    name: "Temporal Lobe",
    fn: "Language",
    category: "Programming Languages",
    side: "left",
    slot: 2,
    points:
      "140,264 212,238 262,232 330,226 392,222 430,292 400,297 380,302 340,322 300,334 260,336 225,328 195,312 178,292 172,272 150,268",
    anchor: [290, 282],
    skills: [
      { name: "Python", core: true, refs: [p("filingagent"), p("torchway"), r("data-analytics-center")] },
      { name: "SQL", core: true, refs: [r("data-analytics-center"), p("premier-league-predictor")] },
      { name: "TypeScript", refs: [p("shipyard"), r("acm"), p("farehunter")] },
      { name: "JavaScript (ES6+)", refs: [p("studyfuze")] },
      { name: "Go", refs: [p("studyfuze")] },
      { name: "Java" },
      { name: "C" },
      { name: "C#" },
      { name: "R" },
      { name: "Bash" },
    ],
  },
  {
    id: "brainstem",
    name: "Brainstem",
    fn: "Core life support",
    category: "Backend & Data",
    side: "left",
    slot: 3,
    points: "350,318 392,306 398,340 392,380 388,440 352,440 348,390 342,350",
    anchor: [370, 400],
    skills: [
      { name: "FastAPI", core: true, refs: [p("filingagent"), p("ghostthread"), p("driftwatch")] },
      {
        name: "PostgreSQL",
        core: true,
        refs: [r("data-analytics-center"), p("ghostthread"), p("studyfuze"), p("shipyard")],
      },
      { name: "Node.js / Express", refs: [r("acm"), p("farehunter")] },
      { name: "React", refs: [r("acm"), p("ghostthread"), p("farehunter")] },
      { name: "Next.js", refs: [p("shipyard"), p("farehunter")] },
      { name: "REST / OpenAPI", refs: [p("farehunter")] },
      { name: "Microservices", refs: [p("studyfuze"), p("driftwatch")] },
      { name: "Supabase", refs: [p("shipyard")] },
      { name: "PGlite", refs: [p("shipyard")] },
      { name: "SQLite", refs: [p("filingagent"), p("driftwatch")] },
      { name: "zod", refs: [p("shipyard")] },
      { name: "Vitest", refs: [p("shipyard")] },
      { name: "Tailwind CSS / shadcn/ui", refs: [p("shipyard")] },
      { name: "Mapbox", refs: [p("farehunter")] },
      { name: "Flask" },
      { name: "MySQL" },
      { name: "pytest" },
    ],
  },
  {
    id: "neural-link",
    name: "Neural Link Port",
    fn: "AI co-pilot implant",
    category: "AI-Assisted Engineering",
    side: "right",
    slot: 0,
    points: "370,4 382,11 382,25 370,32 358,25 358,11",
    anchor: [370, 18],
    skills: [
      { name: "Claude Code (primary)", core: true, refs: [p("shipyard")] },
      { name: "Claude Skills (built several)" },
      { name: "Cursor" },
      { name: "Gemini" },
      { name: "OpenAI Codex" },
    ],
  },
  {
    id: "parietal-lobe",
    name: "Parietal Lobe",
    fn: "Numbers · reasoning",
    category: "Data Science & Statistics",
    side: "right",
    slot: 1,
    points: "300,43 350,44 400,52 440,66 470,84 430,160 392,222 330,226 262,232 282,140",
    anchor: [360, 130],
    skills: [
      { name: "Pandas", core: true, refs: [r("data-analytics-center"), p("premier-league-predictor")] },
      { name: "scikit-learn", core: true, refs: [r("data-analytics-center"), p("premier-league-predictor")] },
      {
        name: "Ablation studies & experimental design",
        refs: [r("vision-lab"), p("filingagent"), p("ghostthread")],
      },
      { name: "Hypothesis testing & confidence intervals", refs: [p("filingagent")] },
      { name: "Regression & classification", refs: [r("data-analytics-center")] },
      { name: "Random Forest", refs: [p("premier-league-predictor")] },
      { name: "Feature engineering", refs: [r("data-analytics-center"), p("premier-league-predictor")] },
      { name: "NumPy", refs: [p("driftwatch")] },
      { name: "Tableau / Matplotlib / Seaborn", refs: [r("data-analytics-center")] },
      { name: "Streamlit", refs: [p("repo-mind")] },
    ],
  },
  {
    id: "occipital-lobe",
    name: "Occipital Lobe",
    fn: "Visual cortex",
    category: "Deep Learning & Computer Vision",
    side: "right",
    slot: 2,
    points:
      "470,84 495,108 515,138 528,170 530,205 522,240 505,268 490,285 430,292 392,222 430,160",
    anchor: [478, 200],
    skills: [
      {
        name: "PyTorch",
        core: true,
        refs: [r("vision-lab"), r("mitre"), p("vehicleanomalynet"), p("fastcav")],
      },
      { name: "Computer Vision", refs: [r("vision-lab"), p("fastcav")] },
      { name: "Dense prediction & semantic segmentation", refs: [r("vision-lab")] },
      { name: "Hugging Face Transformers", refs: [p("fastcav")] },
      { name: "PyTorch Geometric (GNNs)", core: true, refs: [r("mitre")] },
      { name: "Audio ML (torchaudio, librosa)", refs: [p("vehicleanomalynet")] },
      { name: "GPU memory profiling", refs: [p("filingagent")] },
      { name: "CUDA", refs: [HPML] },
      { name: "Fine-tuning (PEFT / LoRA)" },
    ],
  },
  {
    id: "cerebellum",
    name: "Cerebellum",
    fn: "Coordination",
    category: "ML Infra & Distributed Training",
    side: "right",
    slot: 3,
    points: "420,300 470,294 505,300 528,322 530,348 512,370 478,382 440,378 412,360 400,334 404,312",
    anchor: [465, 338],
    skills: [
      { name: "PyTorch Distributed", core: true, refs: [r("mitre")] },
      { name: "Kubeflow", core: true, refs: [p("torchway")] },
      {
        name: "MLflow",
        core: true,
        refs: [r("vision-lab"), p("vehicleanomalynet"), p("fastcav"), p("torchway")],
      },
      { name: "gRPC", refs: [r("mitre")] },
      { name: "ONNX", refs: [p("vehicleanomalynet")] },
      { name: "Apache Spark", refs: [HPML] },
      { name: "HPC (SPOCK)", refs: [HPML] },
    ],
  },
];

export const TOTAL_SKILLS = BRAIN_REGIONS.reduce((n, region) => n + region.skills.length, 0);
