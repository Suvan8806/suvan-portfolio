export type ProjectCategory =
  | "Agents & LLMs"
  | "ML Infrastructure"
  | "Deep Learning & CV"
  | "Data Science"
  | "Full-Stack";

export const PROJECT_CATEGORIES: readonly ProjectCategory[] = [
  "Agents & LLMs",
  "ML Infrastructure",
  "Deep Learning & CV",
  "Data Science",
  "Full-Stack",
];

export type DeepDive = { label: string; text: string };

export type Project = {
  slug: string;
  name: string;
  subtitle: string;
  date: string;
  flagship: boolean;
  categories: readonly ProjectCategory[];
  pitch: string;
  heroStat: { value: string; label: string };
  award?: string;
  stack: readonly string[];
  links: readonly { label: string; href: string }[];
  highlights: readonly string[];
  deepDive?: readonly DeepDive[];
  alsoShipped?: readonly string[];
  note?: string;
};

export const PROJECTS: readonly Project[] = [
  {
    slug: "shipyard",
    name: "Shipyard",
    subtitle: "Enterprise AI Agent Platform",
    date: "Oct 2026",
    flagship: true,
    categories: ["Agents & LLMs", "ML Infrastructure", "Full-Stack"],
    pitch:
      "A full-lifecycle platform to build, test, deploy, govern and roll back AI agents. I built it solo in about 24 hours at HackTX 2026.",
    heroStat: { value: "46 tests · ~90s · $0.28", label: "per deploy gate" },
    award: "1st Place, NMC2 track, HackTX 2026 (built solo)",
    stack: [
      "Next.js 16",
      "TypeScript",
      "Vercel AI SDK",
      "Google Gemini (Flash / Flash-Lite)",
      "Groq (fallback)",
      "Supabase Postgres",
      "PGlite",
      "MCP (mcp-handler)",
      "zod",
      "Vitest",
      "Tailwind / shadcn",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/Suvan8806/shipyard" },
      { label: "Live demo", href: "https://shipyard-silk-beta.vercel.app" },
    ],
    note: "Agents on Shipyard run on Google Gemini with a Groq fallback, not the Claude API. I used Claude Code as my build tool and as the MCP client that drives the platform.",
    highlights: [
      "Caught 3 of 4 critical agent failures that reply-only LLM evals passed, including a $0 balance driven to -$25, by gating every deploy behind 46 deterministic SQL end-state tests run on isolated PGlite Postgres copies.",
      "Ran 46 agent tests per deploy in about 90 seconds for $0.28 by fanning out one Vercel function per test, coordinated by a Postgres advisory-lock work queue with a Gemini-to-Groq fallback on 429/503 errors.",
      "Shipped a hosted 18-tool MCP server that let Claude Code build, test and roll back agents end to end; it read its own failed gate (18/20), fixed its instructions and passed 20/20 in about 2 minutes for under $0.01.",
    ],
    deepDive: [
      {
        label: "Governance & security",
        text: "Enforced agent guardrails in code rather than prompts, checking a $25 credit cap, human approval for payment changes, 5-role RBAC with separation of duties and per-team budgets before every tool call, with all allowed and denied actions in an audit log.",
      },
      {
        label: "Reliable parallel workers",
        text: "Made parallel test workers finish reliably under retries and failures with a Postgres advisory-lock work queue, an idempotent finalizer and a stale-work sweeper, promoting passing agent versions automatically while blocked versions never serve traffic.",
      },
      {
        label: "Performance",
        text: "Cut per-test database memory about 95% (220 MB to 10 MB) and spin-up to about 0.4 s by cloning one pre-migrated PGlite (Postgres in WebAssembly) base instead of migrating a fresh database for every test.",
      },
      {
        label: "LLM evaluation & red-teaming",
        text: "Generated 10-60 adversarial red-team attacks and paraphrase variants per run with Gemini, and benchmarked models on pass rate, cost and speed against the same test suite, alongside a structured-output LLM judge kept informational, never deciding the verdict.",
      },
      {
        label: "Reliability testing",
        text: "Measured 95% reliability with zero flaky tests on a production agent by running 40 test attempts in about 40 seconds in a Stress Lab with flakiness scoring, plus tool-coverage reports that flagged an untested approval tool.",
      },
      {
        label: "Platform design",
        text: 'Reduced a new agent to a 17-line declarative YAML spec composing shared tools, policies, model profiles and test packs, where one line adds 39 adversarial tests, validated by zod with "did you mean" suggestions for typo\'d keys.',
      },
      {
        label: "Dev tooling & CI",
        text: "Gated pull requests on agent test results with a CLI (live terminal gate board, CI exit codes, JSON output) and a GitHub Action, plus a REST API so any front end (Slack, web, internal tools) can use verified agents.",
      },
      {
        label: "Safety of the eval itself",
        text: "Prevented injection and false greens by building an allowlisted assertion engine (count, sum, threshold, reply-contains) with no eval, before/after row snapshots of each test, and infrastructure errors that never count as passes.",
      },
      {
        label: "Full stack",
        text: "Built a Next.js 16 + TypeScript dashboard with a live-streaming test gate board, run traces (model calls, tool calls, tokens, cost, latency, DB changes), version diffs, approvals, teams and audit pages over a Supabase Postgres data model.",
      },
      {
        label: "AI-assisted engineering",
        text: "Built the platform solo in about 24 hours by orchestrating parallel Claude Code subagents in isolated git worktrees against shared typed contracts (contract-first TypeScript types, schema and stubbed API), and ran the whole hackathon for under $2 in model spend.",
      },
    ],
    alsoShipped: [
      "One-click rollback to the last verified version",
      "Majority-vote verdicts with minimum pass rates and critical-failure blocking",
      "LLM provider swappable via one env var (Groq to Gemini mid-hackathon, zero code changes)",
      '"Fast" / "careful" model profiles',
      "Deterministic replay keyed on spec hashes",
      "Fail-closed bearer-token admin auth",
      "Per-IP rate limiting",
      "Traffic simulator across 8 agents",
      'Split-flap "Departures" UI with light/dark themes',
    ],
  },
  {
    slug: "ghostthread",
    name: "GhostThread",
    subtitle: "Agentic Complaint-to-Fix Pipeline",
    date: "Jul 2026",
    flagship: true,
    categories: ["Agents & LLMs"],
    pitch:
      "An agent that finds customer complaints that never became tracked work, by joining Slack and Gmail to Linear and GitHub.",
    heroStat: { value: "F1 0.00 → 0.80", label: "source-scope ablation" },
    award: "1st Place Overall & Best Use of HydraDB, Frontier Tower Hackathon SF",
    stack: [
      "Claude API (Haiku + Opus)",
      "HydraDB",
      "InsForge",
      "FastAPI",
      "React",
      "PostgreSQL",
    ],
    links: [],
    highlights: [
      "Built an agent that finds complaints that never became tracked work by joining Slack/Gmail to Linear/GitHub via a HydraDB context graph and entity resolution, flagging 6 of 12 seeded complaints as dropped.",
      "Proved all 4 sources were load-bearing with a source-scope ablation, lifting answerable rate from 0% to 100% and F1 vs. the full-source answer from 0.00 to 0.80, exposing 2 false leaks when GitHub was out of scope.",
      "Routed complaints with 13-way classification under a JSON-schema constrained decode on Claude Haiku, gating whether Claude Opus drafts a fix by extracted severity and model confidence against a live policy threshold.",
      "Cut duplicate filings from 3 tickets and 3 draft PRs per Slack message to 1 by keying actions on a SHA-256 content hash against a UNIQUE constraint in Postgres, making retried webhooks idempotent.",
    ],
    deepDive: [
      {
        label: "Pipeline validation",
        text: "Fixed 31 schema violations in the RocketRide agent pipeline by validating its node graph against the live 138-provider service catalogue, so unknown config keys fail the check instead of silently doing nothing.",
      },
      {
        label: "Config-driven behavior",
        text: "Changed agent behavior with zero deploys by reading every threshold from a policy profile in InsForge at call time, enforced by an AST scan and mutation test that fail if a threshold is inlined or verdicts do not flip.",
      },
      {
        label: "Honest demos",
        text: "Kept the demo honest under missing credentials with per-integration fallbacks (local TF-IDF index, heuristic classifier) and a 10-check evaluation harness with 3 negative controls asserting empty answers, not guesses.",
      },
    ],
  },
  {
    slug: "filingagent",
    name: "FilingAgent",
    subtitle: "Agentic RAG over SEC Filings",
    date: "Sep 2026",
    flagship: true,
    categories: ["Agents & LLMs", "Data Science"],
    pitch:
      "A fully local agentic RAG system that answers questions over SEC 10-K filings, built around a controlled experiment on whether agency actually helps.",
    heroStat: { value: "17% → 92%", label: "numeric answer accuracy" },
    stack: ["Python", "LangGraph", "ChromaDB", "Ollama (qwen3)", "FastAPI", "SQLite"],
    links: [],
    highlights: [
      "Isolated multi-turn agency from mere tool access by designing a controlled 4-arm ablation (no-tool RAG, single-call tools, custom agent loop, LangGraph StateGraph) over SEC 10-K filings, lifting multi-hop accuracy from 0/4 to 3/4 and refusal rate on unanswerable questions from 0% to 100%.",
      "Raised numeric answer accuracy from 17% to 92% with a 3-tool retrieval surface: semantic search over 469 ChromaDB chunks, exact XBRL fact lookup in SQLite, and AST-whitelisted (sandboxed) arithmetic, served via FastAPI with per-turn trace capture.",
      "Caught 5 silent scoring bugs by testing the offline eval harness itself to 95% coverage across 429 tests, asserting numeric answers deterministically against XBRL ground truth and reporting McNemar's paired tests with Wilson CIs on a 25-item golden set authored before implementation.",
      "Cut agent latency 13x (65.1s to 5.0s per turn) and eliminated mid-run OOM failures on a 6GB RTX 3050 by disabling reasoning traces and capping qwen3 KV-cache context from 40,960 to 12,288 tokens (11.0GB to 7.2GB), enabling a fully local ~400-call evaluation run.",
    ],
  },
  {
    slug: "torchway",
    name: "TorchWay",
    subtitle: "Distributed PyTorch Training CLI",
    date: "Aug 2026",
    flagship: true,
    categories: ["ML Infrastructure"],
    pitch:
      "A pip-installable CLI that turns distributed PyTorch training on Kubernetes into a single command, and tells you why a multi-node run died.",
    heroStat: { value: "1 command", label: "from code to PyTorchJob" },
    stack: ["Python", "Kubernetes", "Kubeflow", "Typer", "MLflow", "Docker", "GitHub Actions"],
    links: [],
    highlights: [
      "Collapsed distributed training setup from manual manifest authoring to a single command with a pip-installable Typer CLI that generates Kubeflow PyTorchJob manifests and injects code via init-container/ConfigMap, eliminating Docker image rebuilds between runs.",
      "Automated diagnosis of 3 multi-node failure classes (OOM, pod eviction, NCCL) with remediation output and cloud profiles for EKS/GKE/on-prem, hardened by 61 unit tests across a GitHub Actions CI matrix.",
    ],
  },
  {
    slug: "vehicleanomalynet",
    name: "VehicleAnomalyNet",
    subtitle: "Acoustic Fault Diagnostics",
    date: "Mar 2026",
    flagship: false,
    categories: ["Deep Learning & CV"],
    pitch:
      "A dual-task CNN+BiGRU that diagnoses machine faults from audio within a ~6 ms CPU latency budget, exported to ONNX for the edge.",
    heroStat: { value: "0.85 AUC-ROC", label: "at ~6 ms CPU latency" },
    stack: ["PyTorch", "torchaudio", "librosa", "Pandas", "MLflow", "ONNX"],
    links: [],
    highlights: [
      "Reached 0.85 AUC-ROC within a ~6 ms CPU latency budget with a dual-task CNN+BiGRU acoustic fault classifier on torchaudio and librosa spectral features (from ~3,000 raw audio samples), exported to ONNX for edge deployment.",
      "Improved validation AUC-ROC 12% via a ~200-run hyperparameter sweep, enabled by migrating to an MLflow SQLite tracking backend with unified metric, artifact, and model registry logging; configurations compared on a fixed held-out split so each gain was attributable to the tested change.",
      "Eliminated manual labeling overhead across ~3,000 augmented audio samples by engineering an RMS-based SNR-controlled noise mixing pipeline with stratified machine-ID splits, enforcing cross-device generalization.",
    ],
  },
  {
    slug: "repo-mind",
    name: "Repo-Mind",
    subtitle: "Local-First AI GitHub Forensic Auditor",
    date: "Dec 2025",
    flagship: false,
    categories: ["Agents & LLMs"],
    pitch:
      "A local-first auditor that cross-references Git history with live source code to catch architectural drift and security regressions, without data leaving the machine.",
    heroStat: { value: "31.5 tok/s", label: "quantized SLM on an RTX 3050" },
    stack: ["ChromaDB", "Ollama", "LangChain", "Streamlit", "Qwen-2.5-Coder"],
    links: [],
    highlights: [
      "Engineered a dual-stream RAG pipeline and agentic workflow that cross-references ~5k Git commits with active source code to detect architectural drift and security regressions with 100% local data privacy.",
      "Mitigated vector crowding with a metadata-aware filtering strategy (hash: LATEST), achieving 31.5 tokens/sec inference using quantized Qwen-2.5-Coder SLMs on an NVIDIA RTX 3050.",
      "Developed a real-time Streamlit telemetry dashboard monitoring vector retrieval accuracy, model inference latency, and system behavior.",
    ],
  },
  {
    slug: "fastcav",
    name: "FastCAV",
    subtitle: "Foundation Model Interpretability",
    date: "Aug 2025 – Feb 2026",
    flagship: false,
    categories: ["Deep Learning & CV"],
    pitch:
      "Interpretability for vision transformers: extracting Concept Activation Vectors from Hugging Face latent spaces.",
    heroStat: { value: "+45%", label: "probe classifier accuracy" },
    stack: ["PyTorch", "Hugging Face Transformers", "Hydra", "MLflow"],
    links: [],
    highlights: [
      "Improved probe classifier accuracy 45% on vision transformers by implementing the FastCAV architecture to extract Concept Activation Vectors from Hugging Face latent spaces, delivering interpretable diagnostics for safety-critical model evaluation.",
      "Cut benchmarking turnaround 25% by automating FastCAV evaluation pipelines with MLflow experiment tracking, enabling reproducible statistical comparisons across transformer model variants.",
    ],
  },
  {
    slug: "driftwatch",
    name: "DriftWatch",
    subtitle: "Microservices Monitoring Platform",
    date: "Jan 2026",
    flagship: false,
    categories: ["ML Infrastructure", "Data Science"],
    pitch:
      "An observability platform for payment microservices with Z-score anomaly detection and automatic rollback.",
    heroStat: { value: "5,000 req/s", label: "at 99.9% uptime under load" },
    stack: ["FastAPI", "NumPy", "SQLite", "Docker", "Locust"],
    links: [],
    highlights: [
      "Engineered a distributed observability platform sustaining 5,000 req/sec across payment microservices at 99.9% uptime under Locust load-tested traffic surges, with a language-agnostic REST API (Python, Java, Node.js clients) and PCI DSS-compliant audit trails.",
      "Reduced fraud detection by 15 minutes with Z-score anomaly detection on SMOTE synthetic payment data, achieving 98% precision on imbalanced evaluation with auto rollback on threshold breaches.",
    ],
  },
  {
    slug: "farehunter",
    name: "FareHunter",
    subtitle: "Rideshare Cost Optimizer",
    date: "Nov 2025",
    flagship: false,
    categories: ["Full-Stack"],
    pitch:
      "A consumer app that finds cheaper rideshare pickup points from live pricing and real-time routing.",
    heroStat: { value: "up to 25%", label: "lower ride costs" },
    stack: ["Next.js", "React", "TypeScript", "Node.js", "Express", "Mapbox", "Vercel"],
    links: [],
    highlights: [
      "Engineered a consumer-facing React/TypeScript app bridging live rideshare pricing APIs to an intuitive UI, computing optimal pickup points via Haversine distance across 50 daily queries.",
      "Reduced user ride costs by up to 25% by integrating Mapbox and OpenStreetMap APIs for real-time route visualization with dynamic surge-pricing logic.",
      "Built a Node.js/Express backend with RESTful endpoints and OpenAPI documentation, deployed on Vercel serverless functions.",
    ],
  },
  {
    slug: "studyfuze",
    name: "StudyFuze",
    subtitle: "Resource Sharing Platform",
    date: "Nov 2024",
    flagship: false,
    categories: ["Full-Stack"],
    pitch: "A Go microservices platform for sharing study resources, with role-based access control.",
    heroStat: { value: "<200 ms", label: "response times at 99.5% uptime" },
    stack: ["Go", "Microservices", "PostgreSQL", "JavaScript"],
    links: [],
    highlights: [
      "Deployed a secure microservices-based CRUD platform in Go with role-based access control (RBAC) supporting 100+ concurrent users at 99.5% uptime across peak usage.",
      "Reduced server load 30% while maintaining sub-200ms response times by optimizing PostgreSQL query patterns and adding client-side validation to eliminate redundant round-trips.",
    ],
  },
  {
    slug: "premier-league-predictor",
    name: "Premier League Match Predictor",
    subtitle: "Sports Analytics Pipeline",
    date: "Feb 2025",
    flagship: false,
    categories: ["Data Science"],
    pitch:
      "A Random Forest match predictor built on 2,000+ scraped Premier League matches and controlled feature experiments.",
    heroStat: { value: "67%", label: "precision on held-out matches" },
    stack: ["Python", "scikit-learn", "Pandas", "SQL", "Random Forest"],
    links: [],
    highlights: [
      "Achieved 67% precision on a held-out test set with a Random Forest classifier by scraping and cleaning 2,000+ match records into a SQL schema and engineering 15+ match and form features with Pandas.",
      "Improved precision 11% through controlled (A/B-style) feature experiments on rolling-average windows, venue encodings, and opponent-strength indices, isolating the top 8 predictors by Gini importance.",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
