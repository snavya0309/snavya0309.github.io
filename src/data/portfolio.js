export const meta = {
  name: "Snavya Sai Badri Prasad",
  title: "SNAVYA.DEV",
  email: "smuntimu@asu.edu",
  phone: "(623) 703-4254",
  linkedin: "linkedin.com/in/snavya-sai-m-b-0275aa203/",
  github: "github.com/snavya0309",
  resumeUrl: "/resume.pdf",
  location: "Tempe, AZ · Open to Relocation",
  degree: "M.S. Data Science · ASU · GPA 4.0 · May 2026",
  degreeBachelors: "B.Tech Computer Science · Dayananda Sagar University · GPA 8.87/10 · May 2023",
}

export const certifications = [
  { name: "AWS Educate – Introduction to Cloud 101", issuer: "AWS" },
  { name: "AWS Educate – Getting Started with Storage", issuer: "AWS" },
  { name: "AWS Educate – Machine Learning Foundations", issuer: "AWS" },
  { name: "SQL (Basic)", issuer: "HackerRank" },
  { name: "Working with the OpenAI API", issuer: "DataCamp" },
]

export const roles = [
  "DATA SCIENTIST",
  "ML ENGINEER",
  "AI / LLM ENGINEER",
  "RESPONSIBLE AI RESEARCHER",
  "SOFTWARE ENGINEER",
  "FULL-STACK ENGINEER",
]

export const roleContent = {
  all: {
    desc: "Applied AI and software engineer with production experience at Mercedes-Benz and research depth at ASU. I build end-to-end systems across modeling, backend APIs, and product delivery, with a 4.0 GPA in M.S. Data Science.",
    stats: [
      { val: "4.0", label: "GPA · ASU" },
      { val: "85%", label: "MODEL ACCURACY" },
      { val: "+35%", label: "LATENCY REDUCTION" },
      { val: "1.15M", label: "RATINGS PROCESSED" },
    ],
  },
  swe: {
    desc: "Software engineer with production delivery across frontend, backend, cloud, and CI/CD. At Mercedes-Benz, I shipped 25+ features, reduced latency by 35%, improved test coverage by 30%, and helped move delivery faster on AWS-based systems.",
    stats: [
      { val: "+35%", label: "LATENCY REDUCTION" },
      { val: "+30%", label: "TEST COVERAGE" },
      { val: "−20%", label: "DEPLOY TIME" },
      { val: "25+", label: "FEATURES SHIPPED" },
    ],
  },
  ds: {
    desc: "Data scientist with strong applied ML depth across modeling, explainability, and large-scale data work. I have built models reaching 85% accuracy, processed 1.15M+ records, and translated results into decisions that non-technical teams can use.",
    stats: [
      { val: "4.0", label: "GPA · ASU" },
      { val: "85%", label: "EXIT ACCURACY" },
      { val: "1.15M", label: "RATINGS PROCESSED" },
      { val: "+15%", label: "MODEL IMPROVEMENT" },
    ],
  },
  ai: {
    desc: "AI / LLM engineer working across applied GenAI systems, responsible AI research, and cybersecurity AI. My work includes a production GenAI chatbot at Mercedes-Benz, co-authored research on AI-reinforced honeypot systems using Random Forest and Deep RL, and machine unlearning research on Phi and Mamba.",
    stats: [
      { val: "50+", label: "USERS SERVED" },
      { val: "+20%", label: "EFFICIENCY GAIN" },
      { val: "2", label: "PAPERS CO-AUTHORED" },
      { val: "RAG", label: "PRODUCTION DEPLOYED" },
    ],
  },
}

export const skills = [
  {
    category: "ML / AI / LLM",
    items: ["PyTorch", "TensorFlow", "HuggingFace", "PEFT", "LoRA", "RAG", "XGBoost", "LightGBM", "SHAP", "FinBERT", "Transformers"],
    highlighted: ["PyTorch", "HuggingFace", "PEFT", "LoRA"],
  },
  {
    category: "AGENTIC AI & LLM TOOLING",
    items: ["LangChain", "LangGraph", "CrewAI", "OpenAI API", "Anthropic API", "GROQ", "Pinecone", "FAISS", "Claude Code", "GitHub Copilot", "Cursor", "Codex"],
    highlighted: ["LangChain", "LangGraph", "CrewAI", "GROQ"],
  },
  {
    category: "ENGINEERING & CLOUD",
    items: ["Python", "SQL", "AWS", "FastAPI", "Flask", "React.js", "Next.js", "Kafka", "Spark", "Docker", "Kubernetes"],
    highlighted: ["Python", "FastAPI", "AWS"],
  },
  {
    category: "BACKEND & DATA",
    items: ["MongoDB", "PostgreSQL", "MySQL", "Neo4j", "GitHub Actions", "Jenkins", "SonarQube", "Tableau", "Power BI"],
    highlighted: [],
  },
  {
    category: "LANGUAGES",
    items: ["Python", "JavaScript", "TypeScript", "SQL", "Java", "Kotlin", "R"],
    highlighted: ["Python", "TypeScript"],
  },
]

export const projects = [
  {
    id: 0,
    tag: "00 · CAPSTONE · AI FOR EDUCATION",
    title: "The Lillian Project — AI Dyslexia Intervention System",
    desc: "End-to-end AI pipeline for a structured literacy intervention platform built for learners with dyslexia. Three adaptive pathways (Phonemic Awareness, Symbol Imagery, Fluency) branch dynamically on live student performance. AlgoFace API drives real-time facial mesh and articulation feedback while an AI tutor avatar with TTS guides every session from start to finish.",
    chips: ["Adaptive Logic", "AlgoFace API", "TTS", "EdTech", "JavaScript", "Python"],
    highlighted: ["Adaptive Logic", "AlgoFace API"],
    github: null,
    metric: { val: "Live", label: "CAPSTONE · IN PROGRESS", small: true },
    span: 7,
    award: null,
    current: true,
  },
  {
    id: 1,
    tag: "01 · RESEARCH · RESPONSIBLE AI",
    title: "Approximate Machine Unlearning in SLMs & SSMs",
    desc: "Benchmarked PCGU and task vector methods to surgically remove social bias from Phi and Mamba without full retraining. Designed targeted forgetting evaluations that measure unlearning effectiveness against model utility — asking what it actually takes to make a deployed LLM safer without starting from scratch.",
    chips: ["PyTorch", "HuggingFace", "PEFT", "LoRA", "Mamba", "Transformers", "PCGU", "Responsible AI"],
    highlighted: ["PyTorch", "PEFT", "LoRA"],
    github: "https://github.com/sanskarsri26/UNLEARN-BENCH/tree/PCGU",
    metric: null,
    span: 7,
    award: null,
  },
  {
    id: 2,
    tag: "02 · DEEP LEARNING",
    title: "EmotiLearn",
    desc: "Multimodal DL for student engagement: 3D CNN + GRU for video, Wav2Vec for audio. 20% accuracy improvement over all baselines.",
    chips: ["PyTorch", "TensorFlow", "3D CNN", "GRU", "Wav2Vec"],
    highlighted: ["PyTorch", "TensorFlow"],
    github: "https://github.com/snavya0309",
    metric: { val: "+20%", label: "ACCURACY LIFT" },
    span: 5,
    award: null,
  },
  {
    id: 3,
    tag: "03 · AGENTIC AI",
    title: "Deep Research Investment Agent",
    desc: "Autonomous investment research pipeline that chains FinBERT sentiment analysis on financial news with real-time market data to produce structured stock research reports. An agentic mode built on LangChain orchestrates multi-step reasoning across sources — going from ticker to thesis in one run, with deterministic fallbacks for reliability.",
    chips: ["CrewAI", "FinBERT", "GROQ", "yfinance", "FastAPI", "Streamlit", "Tavily API"],
    highlighted: ["CrewAI", "FinBERT", "GROQ"],
    github: "https://github.com/snavya0309/deep-research-investment-agent",
    metric: { val: "Agentic", label: "RESEARCH PIPELINE", small: true },
    span: 5,
    award: null,
  },
  {
    id: 4,
    tag: "04 · BIG DATA · ML",
    title: "Large-Scale Book Recommender",
    desc: "Distributed Spark pipeline on 105K users, 340K books, 1.15M ratings. Generated 214K+ recommendations at 43 users/sec.",
    chips: ["Apache Spark", "Distributed ML", "Collaborative Filtering"],
    highlighted: ["Apache Spark", "Distributed ML"],
    github: null,
    span: 7,
    miniStats: [
      { label: "RATINGS", val: "1.15M" },
      { label: "THROUGHPUT", val: "43/sec" },
      { label: "RECS", val: "214K+" },
    ],
    award: null,
  },
  {
    id: 5,
    tag: "05 · GRAPH ANALYTICS",
    title: "NYC Taxi Network Pipeline",
    desc: "Real-time Kafka + ZooKeeper + Neo4j on Kubernetes. PageRank & BFS on millions of trip records.",
    chips: ["Kafka", "Neo4j", "K8s", "ZooKeeper"],
    highlighted: [],
    github: "https://github.com/snavya0309",
    span: 4,
    award: null,
  },
  {
    id: 6,
    tag: "06 · QUANTUM ML · AWARD",
    title: "Quantum Cancer Detection",
    desc: "Quantum ML & DL vs classical approaches for breast cancer detection.",
    chips: ["Quantum ML", "Qiskit", "PyTorch"],
    highlighted: ["Quantum ML"],
    github: "https://github.com/snavya0309/Breast-Cancer-Detection-using-Quantum-ML-and-Quantum-DL-and-Comparison-with-ML-and-DL",
    span: 4,
    award: "Runner-Up · Unisys Innovation Program Year 14",
  },
  {
    id: 7,
    tag: "07 · ML · HISSA",
    title: "StartupOracle",
    desc: "Built during my internship at Hissa by RuleZero — a modular ML platform predicting startup exits (IPO, M&A, or failure) at 85% classification accuracy. Engineered features from financial metrics, market signals, and founding team data. SHAP explainability makes each prediction auditable. Delivered as a production Streamlit app with CSV upload, versioned model persistence, and structured PDF reporting — cutting analyst screening time by 20%.",
    chips: ["XGBoost", "LightGBM", "SHAP", "scikit-learn", "Streamlit", "Pandas"],
    highlighted: ["XGBoost", "LightGBM", "SHAP"],
    github: "https://github.com/snavya0309/StartupOracle",
    span: 4,
    award: null,
  },
  {
    id: 9,
    tag: "08 · RESEARCH · CYBERSECURITY AI",
    title: "AI-Reinforced Honeypot Detection System",
    desc: "Co-authored research on intelligent intrusion detection using AI-reinforced honeypot infrastructure. Applied Random Forest for threat classification and Deep Reinforcement Learning for adaptive response — enabling honeypots to autonomously adjust behavior based on attacker patterns.",
    chips: ["Random Forest", "Deep RL", "Cybersecurity", "Python", "Intrusion Detection"],
    highlighted: ["Random Forest", "Deep RL"],
    github: null,
    metric: { val: "Co-authored", label: "RESEARCH PAPER", small: true },
    span: 5,
    award: null,
  },
]

export const experience = [
  {
    date: "DEC 2024 – MAY 2026",
    title: "Alt. Format Text Editor & QA Engineer",
    company: "ARIZONA STATE UNIVERSITY · TEMPE, AZ",
    current: false,
    chips: ["Equidox", "OCR", "TTS", "JAWS", "Accessibility", "QA"],
    bullets: [
      "Processed <b>100+ document chapters</b> using <b>Equidox</b> — converting scanned and unstructured course materials into tagged PDFs with correct reading order, heading structure, and alt text for full screen reader compatibility",
      "Applied <b>OCR workflows</b> to digitize printed content, enabling TTS platforms to accurately parse equations, tables, and multi-column layouts that previously failed automated tools",
      "QA'd converted documents against <b>WCAG accessibility standards</b> using JAWS — identifying and resolving tagging errors to ensure consistent, accurate access for students with disabilities",
    ],
  },
  {
    date: "JUN 2025 – JUL 2025",
    title: "Data Science Intern",
    company: "HISSA BY RULEZERO · BENGALURU, IN",
    current: false,
    chips: ["Python", "scikit-learn", "SHAP", "Streamlit"],
    bullets: [
      "Engineered a modular ML platform using Python and scikit-learn to predict startup exits, valuations, and timelines — <b>85% exit classification accuracy</b>",
      "Delivered a <b>production Streamlit analytics app</b> with CSV upload, SHAP explainability, versioned model persistence, and structured reporting — reducing screening time <b>by 20%</b>",
      "Partnered with finance and strategy teams to translate business requirements into statistical models for startup evaluation",
    ],
  },
  {
    date: "JAN 2025 – MAY 2025",
    title: "Data Science Research Assistant",
    company: "ARIZONA STATE UNIVERSITY · TEMPE, AZ",
    current: false,
    chips: ["Python", "XGBoost", "CatBoost", "SQL", "Tableau"],
    bullets: [
      "Built <b>ETL pipelines</b> to clean and aggregate 3+ heterogeneous eviction datasets using Python and SQL; produced <b>Tableau dashboards</b> covering hundreds of Maricopa County census tracts to identify high-risk eviction zones",
      "Trained eviction risk models using <b>XGBoost and CatBoost</b> on socio-economic indicators — <b>15% improvement</b> over baseline, informing equitable housing policy interventions",
    ],
  },
  {
    date: "FEB 2023 – JUL 2024",
    title: "Software Engineer – Full Stack",
    company: "MERCEDES-BENZ R&D · BENGALURU, IN",
    current: false,
    chips: ["Python", "RAG", "AWS", "React.js", "Kotlin", "MongoDB", "GitHub Actions"],
    bullets: [
      "Developed a <b>Python GenAI chatbot on AWS</b> enabling 50+ vehicle technicians to retrieve repair procedures via RAG — improving workflow efficiency <b>by 20%</b>",
      "Architected <b>RESTful MongoDB backend</b> with async request handling — reducing response latency and data access efficiency <b>by 25%</b>",
      "Implemented <b>25+ features</b> using React.js (TypeScript) and Kotlin — reducing end-to-end latency <b>by 35%</b>",
      "Increased automated test coverage <b>by 30%</b> through unit testing and SonarQube quality gates",
      "Migrated CI/CD from Jenkins → GitHub Actions on AWS — reducing deployment time <b>by 20%</b>",
    ],
  },
]

export const pipelineStages = [
  { num: "01", name: "Data Ingestion", tech: "Kafka · Spark · SQL · ETL", desc: "Stream or batch ingest from APIs, databases, and files. Schema validation, deduplication, partitioning at scale. Used for NYC taxi pipeline (43K records/sec) and eviction dataset ETL.", m1: "Records/sec", v1: "43K", m2: "Sources merged", v2: "3+" },
  { num: "02", name: "Feature Eng", tech: "Pandas · NumPy · scikit-learn", desc: "Clean, transform, encode raw features. Handle nulls, outliers, normalization. Temporal leakage prevention. 120+ features extracted for startup exit models.", m1: "Features built", v1: "120+", m2: "Data coverage", v2: "99.8%" },
  { num: "03", name: "Model Training", tech: "PyTorch · XGBoost · HuggingFace · SHAP", desc: "Train, cross-validate, tune. SHAP explainability. RAG for LLM tasks. 85–91% accuracy across projects. Machine unlearning on Phi and Mamba.", m1: "Best accuracy", v1: "85–91%", m2: "Framework", v2: "PyTorch" },
  { num: "04", name: "API / Backend", tech: "FastAPI · Flask · MongoDB · AWS · React.js", desc: "Serve predictions via REST API. MongoDB backend, async request handling, SonarQube quality gates. Reduced latency 35% at Mercedes-Benz.", m1: "Latency reduced", v1: "35%", m2: "Cloud", v2: "AWS" },
  { num: "05", name: "CI/CD · Deploy", tech: "Docker · Kubernetes · GitHub Actions", desc: "Containerize and orchestrate on Kubernetes. GitHub Actions for automated build, test, deploy. Migrated Jenkins to GitHub Actions, reducing deployment time 20%.", m1: "Deploy time", v1: "−20%", m2: "Test coverage", v2: "+30%" },
]

export const chatPersona = `You are the portfolio assistant for Snavya Sai Badri Prasad. Answer in plain prose, no asterisks, no markdown bold, no bullet points.

Background: M.S. Data Science ASU GPA 4.0 graduating May 2026. B.Tech Computer Science Dayananda Sagar University. Open to relocation from Tempe AZ. Targeting Data Scientist, ML Engineer, AI/LLM Engineer, Software Engineer, Full-Stack Engineer.

Experience: ASU 2025-present Alt Format Text Editor QA, TTS workflows JAWS QA. ASU Research Jan-May 2025, ETL pipelines 3+ eviction datasets Python SQL, Tableau dashboards Maricopa County, XGBoost CatBoost 15% improvement equitable housing policy. Hissa RuleZero Jun-Jul 2025 DS Intern, modular ML platform scikit-learn 85% startup exit accuracy, production Streamlit app SHAP explainability versioned persistence 20% screening reduction. Mercedes-Benz R&D Feb 2023-Jul 2024 SWE Full Stack, Python GenAI chatbot AWS serving 50+ technicians RAG 20% efficiency, RESTful MongoDB 25% latency, 25+ React TypeScript Kotlin features 35% latency reduction, 30% test coverage SonarQube, Jenkins to GitHub Actions 20% deploy time.

Projects: 1.Machine Unlearning SLMs SSMs PCGU task vectors Phi Mamba social bias frontier Responsible AI. 2.AI-Reinforced Honeypot Detection co-authored research Random Forest Deep RL intrusion detection adaptive response. 3.EmotiLearn multimodal DL 3D CNN GRU Wav2Vec 20% accuracy. 4.Deep Research Investment Agent FinBERT agentic pipeline. 5.Book Recommender Spark 1.15M ratings 214K recs 43 users/sec. 6.NYC Taxi Kafka ZooKeeper Neo4j Kubernetes PageRank BFS. 7.Quantum Cancer Detection runner-up Unisys Innovation Program Year 14. 8.StartupOracle 85% accuracy SHAP Streamlit.

Award: Runner-Up Unisys Innovation Program Year 14 for Quantum Cancer Detection.

Standout: rare blend of frontier AI research and proven industry delivery, perfect 4.0 GPA, full ML lifecycle research to Kubernetes production, strong full-stack SWE background.

2-4 sentences plain prose only. No markdown. Unknown: smuntimu@asu.edu`
