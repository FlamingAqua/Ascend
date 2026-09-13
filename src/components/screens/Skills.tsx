import { PageLayout, PageHeader, ProgressBar, Badge } from "../ui";

const skills = [
  {
    name: "Java",
    icon: "☕",
    color: "bg-orange-500",
    progress: 0,
    mastery: 0,
    hours: 0,
    why: "Primary language for DSA + backend. Every problem you solve will be in Java.",
    currentTopic: "OOP Basics — Classes, Objects",
    year: "Y1",
    subtopics: ["OOP", "Collections", "Generics", "Streams", "Concurrency", "JVM internals"],
  },
  {
    name: "DSA",
    icon: "⚙️",
    color: "bg-indigo-500",
    progress: 0,
    mastery: 0,
    hours: 0,
    why: "The single most important skill for FAANG. No shortcuts — solve 500+ problems.",
    currentTopic: "Arrays & Hashing",
    year: "Y1–Y4",
    subtopics: ["Arrays", "Linked Lists", "Trees", "Graphs", "DP", "Greedy", "Advanced"],
  },
  {
    name: "SQL",
    icon: "🗄️",
    color: "bg-blue-500",
    progress: 0,
    mastery: 0,
    hours: 0,
    why: "Asked in every backend interview. Window functions and query optimization are high-value.",
    currentTopic: "SELECT, WHERE, GROUP BY",
    year: "Y1 Sem 2",
    subtopics: ["Basics", "JOINs", "Subqueries", "Window Functions", "Indexing", "Query Optimization"],
  },
  {
    name: "System Design",
    icon: "🏗️",
    color: "bg-teal-500",
    progress: 0,
    mastery: 0,
    hours: 0,
    why: "Differentiates ₹30L offers from ₹1Cr+ offers. Start learning concepts from Y1.",
    currentTopic: "Scalability Concepts (Y2 deep dive)",
    year: "Y2–Y4",
    subtopics: ["Scalability", "Caching", "Load Balancing", "Databases", "Microservices", "Real-time systems"],
  },
  {
    name: "Spring Boot",
    icon: "🍃",
    color: "bg-emerald-500",
    progress: 0,
    mastery: 0,
    hours: 0,
    why: "Java's #1 backend framework. Industry standard for SWE backend roles.",
    currentTopic: "REST APIs (Y2 Sem 2)",
    year: "Y2 Sem 2",
    subtopics: ["REST APIs", "Spring MVC", "JPA/Hibernate", "Security (JWT)", "Testing", "Docker"],
  },
  {
    name: "React + JavaScript",
    icon: "⚛️",
    color: "bg-cyan-500",
    progress: 0,
    mastery: 0,
    hours: 0,
    why: "Frontend for full-stack projects. Makes your portfolio 10x better to recruiters.",
    currentTopic: "JavaScript Fundamentals (Y2)",
    year: "Y2",
    subtopics: ["HTML/CSS", "JavaScript ES6+", "React", "Hooks", "State Management", "API integration"],
  },
  {
    name: "Python",
    icon: "🐍",
    color: "bg-yellow-500",
    progress: 0,
    mastery: 0,
    hours: 0,
    why: "AI/ML, scripting, data work. Secondary language — don't let it distract from Java DSA in Y1.",
    currentTopic: "Start in Y2 after Java is solid",
    year: "Y2+",
    subtopics: ["Syntax basics", "Data Science libs", "ML with scikit-learn", "FastAPI", "Automation"],
  },
  {
    name: "Cloud & DevOps",
    icon: "☁️",
    color: "bg-slate-500",
    progress: 0,
    mastery: 0,
    hours: 0,
    why: "AWS/GCP + Docker/K8s = production-grade engineer. Essential for ₹50L+ roles.",
    currentTopic: "AWS basics (Y3)",
    year: "Y3",
    subtopics: ["AWS (EC2, S3, RDS)", "Docker", "Kubernetes", "CI/CD", "Terraform", "Monitoring"],
  },
  {
    name: "AI / ML",
    icon: "🤖",
    color: "bg-violet-500",
    progress: 0,
    mastery: 0,
    hours: 0,
    why: "Hottest domain in 2030 hiring. Build AI-powered projects to stand out.",
    currentTopic: "Linear Algebra + Prob (Y3)",
    year: "Y3",
    subtopics: ["Math foundations", "ML Algorithms", "Deep Learning", "LLM APIs", "MLOps", "AI products"],
  },
  {
    name: "OS & Computer Networks",
    icon: "🖥️",
    color: "bg-rose-500",
    progress: 0,
    mastery: 0,
    hours: 0,
    why: "Core CS — asked in interviews for process, thread, TCP/IP, OS scheduling questions.",
    currentTopic: "Process & Thread basics (Y2)",
    year: "Y2",
    subtopics: ["Processes & Threads", "Memory Management", "File Systems", "TCP/IP", "HTTP/DNS", "Security basics"],
  },
  {
    name: "Competitive Programming",
    icon: "🏆",
    color: "bg-amber-500",
    progress: 0,
    mastery: 0,
    hours: 0,
    why: "Codeforces + LeetCode contests build speed and pattern recognition under pressure.",
    currentTopic: "LeetCode Weekly Contests (start now)",
    year: "Y1–Y4",
    subtopics: ["LeetCode contests", "Codeforces Div 2", "AtCoder", "ICPC prep", "Speed solving", "Editorial reading"],
  },
  {
    name: "Git & Open Source",
    icon: "🐙",
    color: "bg-gray-600",
    progress: 0,
    mastery: 0,
    hours: 0,
    why: "GitHub profile is your live resume. OSS contributions signal real-world engineering ability.",
    currentTopic: "git basics — commit, push, PR",
    year: "Y1",
    subtopics: ["git fundamentals", "GitHub profile", "Branching strategy", "PRs & Code Review", "OSS contribution", "Maintain a project"],
  },
];

const yearColors: Record<string, string> = {
  "Y1": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "Y1–Y4": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  "Y1 Sem 2": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "Y2–Y4": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "Y2 Sem 2": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "Y2": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "Y2+": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "Y3": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  "Y1–Y4 ": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
};

export default function Skills() {
  return (
    <PageLayout>
      <PageHeader
        title="Skill Stack"
        subtitle={`${skills.length} skills mapped · Java + DSA are the priority — everything else follows`}
      />

      {/* Priority note */}
      <div className="mb-5 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-3 flex gap-3">
        <svg className="text-amber-600 flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <p className="text-sm text-amber-700 dark:text-amber-400">
          <strong>Year 1 focus:</strong> Java + DSA + SQL + Git. Don't spread yourself thin. Stack everything else on top once these are solid.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div key={skill.name} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 hover:shadow-sm transition-shadow flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg ${skill.color} flex items-center justify-center text-lg flex-shrink-0`}>
                  {skill.icon}
                </div>
                <div>
                  <p className="font-display font-semibold text-[var(--foreground)] text-sm leading-tight">{skill.name}</p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{skill.hours}h logged</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-md font-medium flex-shrink-0 ${yearColors[skill.year] || "bg-[var(--muted)] text-[var(--muted-foreground)]"}`}>
                {skill.year}
              </span>
            </div>

            {/* Why */}
            <p className="text-xs text-[var(--muted-foreground)] mb-3 leading-relaxed italic">{skill.why}</p>

            {/* Progress */}
            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-[var(--muted-foreground)]">Progress</span>
                <span className="font-mono text-[var(--foreground)]">{skill.progress}%</span>
              </div>
              <ProgressBar value={skill.progress} color={skill.color} height="h-1.5" />
            </div>

            {/* Mastery dots */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="h-1 w-3 rounded-sm bg-[var(--muted)]" />
                ))}
              </div>
              <span className="font-mono text-xs text-[var(--muted-foreground)]">0/10</span>
            </div>

            {/* Current topic */}
            <div className="bg-[var(--muted)] rounded-lg px-3 py-2 mb-3">
              <p className="text-xs text-[var(--muted-foreground)] mb-0.5">Current / Next topic</p>
              <p className="text-sm font-medium text-[var(--foreground)]">{skill.currentTopic}</p>
            </div>

            {/* Subtopics */}
            <div className="flex gap-1.5 flex-wrap">
              {skill.subtopics.map((st) => (
                <span key={st} className="text-xs px-2 py-0.5 rounded-md bg-[var(--muted)] text-[var(--muted-foreground)]">
                  {st}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
