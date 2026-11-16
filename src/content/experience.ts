export type ExperienceTrack = {
  label?: string;
  bullets: readonly string[];
};

export type Experience = {
  id: string;
  title: string;
  org: string;
  location: string;
  start: string;
  end: string;
  summary: string;
  tags: readonly string[];
  tracks: readonly ExperienceTrack[];
};

// Display order is intentional (positioning), not strictly chronological.
export const EXPERIENCE: readonly Experience[] = [
  {
    id: "vision-lab",
    title: "AI Undergraduate Research Assistant",
    org: "UTSA Vision & AI Lab",
    location: "San Antonio, TX",
    start: "Jan 2026",
    end: "Sep 2026",
    summary:
      "Computer vision research. I built PyTorch training pipelines with MLflow experiment tracking for the lab, then used them to run controlled ablations on dense prediction, semantic segmentation and image classification.",
    tags: [
      "PyTorch",
      "MLflow",
      "Computer Vision",
      "Dense Prediction",
      "Semantic Segmentation",
      "Quaternion NNs",
      "Ablation Studies",
    ],
    tracks: [
      {
        bullets: [
          "Reduced experiment turnaround 40% by building PyTorch training pipelines with automated hyperparameter tuning and MLflow experiment tracking for the lab's computer vision research, producing reproducible results across 50+ runs.",
          "Reduced mean angular error 5% and raised pixel-level accuracy 3.3 points on a proprietary materials dataset by designing a controlled data-composition ablation for dense prediction and semantic segmentation across fine-tuned model variants on 2 Quadro RTX 8000 GPUs.",
          "Delivered a 3x model efficiency gain at equal F1 score by implementing Quaternion Neural Networks for image classification, ablating 10+ architectural configurations.",
        ],
      },
    ],
  },
  {
    id: "mitre",
    title: "AI Intern",
    org: "MITRE Corporation",
    location: "McLean, VA",
    start: "Jun 2025",
    end: "Aug 2025",
    summary:
      "ML infrastructure. I built a multi-node training cluster, sped up distributed graph neural network training, and automated how GNN models get deployed and monitored.",
    tags: [
      "Kubernetes",
      "AWS EC2",
      "Docker",
      "Podman",
      "PyTorch Distributed",
      "PyTorch Geometric",
      "gRPC",
      "Jenkins",
    ],
    tracks: [
      {
        bullets: [
          "Cut cluster provisioning time 60% by building a multi-node Kubernetes cluster on AWS EC2 with containerized Docker/Podman workflows, enabling parallel model training runs for 3 cross-functional ML teams.",
          "Sped up distributed graph neural network (GNN) training 35% by implementing a master-worker architecture with PyTorch Distributed and PyTorch Geometric, optimizing inter-node communication via gRPC polling.",
          "Reduced system resource overhead 50% by building Jenkins CI/CD pipelines for automated GNN model deployment, adding inference monitoring across the team's cloud-native serving infrastructure.",
        ],
      },
    ],
  },
  {
    id: "acm",
    title: "Software Developer",
    org: "UTSA ACM Projects",
    location: "San Antonio, TX",
    start: "Jan 2026",
    end: "May 2026",
    summary:
      "Full-stack and DevOps work on a hackathon platform, shipped with a team of 8 engineers.",
    tags: ["Node.js", "Express", "React", "TypeScript", "Docker", "AWS", "CI/CD"],
    tracks: [
      {
        bullets: [
          "Scaled a hackathon platform to 500+ concurrent users by building a Node.js/Express service behind a React/TypeScript client, containerized with Docker and deployed on AWS.",
          "Cut release cycle time 40% by building CI/CD pipelines that automate build, test, and deploy steps within a Git branch-and-review workflow for a team of 8 engineers.",
        ],
      },
    ],
  },
  {
    id: "data-analytics-center",
    title: "Software Developer / Data Scientist",
    org: "UTSA Data Analytics Center",
    location: "San Antonio, TX",
    start: "Feb 2025",
    end: "Apr 2025",
    summary:
      "I wore two hats here: building the data pipelines and database behind the center's analytics, and building the models and dashboards that research teams used.",
    tags: [
      "Python",
      "Pandas",
      "PostgreSQL",
      "BeautifulSoup",
      "scikit-learn",
      "Tableau",
      "Matplotlib",
      "Seaborn",
    ],
    tracks: [
      {
        label: "Software Developer",
        bullets: [
          "Cut data processing time 47% by building a Python/Pandas ETL pipeline that automated ingestion of 50k+ records, replacing a manual workflow for the center's analytics team.",
          "Sped up PostgreSQL queries 40% through B-tree indexing and 3NF schema normalization, reducing dashboard load times for 30 concurrent analyst users.",
        ],
      },
      {
        label: "Data Scientist",
        bullets: [
          "Cut manual data collection 80% for 12 business and economics research teams by automating Python ETL pipelines: BeautifulSoup web scraping, Pandas missing-value imputation, and normalization.",
          "Accelerated exploratory data analysis (EDA) for faculty stakeholders by engineering 15+ features from raw records and defining the metrics behind Matplotlib, Seaborn, and Tableau dashboards.",
          "Contributed analysis to 12 research publications by developing scikit-learn regression and classification models (classifiers scored on F1, precision, and recall on held-out splits) on versioned SQL schemas.",
        ],
      },
    ],
  },
];

export function getExperience(id: string): Experience | undefined {
  return EXPERIENCE.find((e) => e.id === id);
}
