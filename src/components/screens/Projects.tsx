import { PageLayout, PageHeader, Button, Badge } from "../ui";

const ideas = [
  {
    name: "DSA Visualizer",
    desc: "Animate sorting algorithms, tree traversals, and graph BFS/DFS step-by-step in a browser. Shows interviewers you understand the algorithms deeply.",
    tech: ["Java", "JavaScript", "Canvas API"],
    effort: "3–4 weeks",
    impact: "High",
    year: "Y1",
  },
  {
    name: "LeetCode Progress Tracker CLI",
    desc: "Terminal app that logs your DSA problems, tracks topic-wise accuracy, shows streaks, and exports to JSON. Build it in Java with file I/O.",
    tech: ["Java", "File I/O", "CLI"],
    effort: "1–2 weeks",
    impact: "Medium",
    year: "Y1",
  },
  {
    name: "Bank Management System",
    desc: "OOP capstone — model Account, Customer, Transaction, Loan. Implement CRUD with Java Collections. Demonstrate every OOP principle you learned.",
    tech: ["Java", "OOP", "Collections"],
    effort: "2 weeks",
    impact: "Medium",
    year: "Y1",
  },
  {
    name: "Student Result Manager (SQL)",
    desc: "Full CRUD app with SQL backend. Practice all JOINs, aggregation, window functions in a real schema. Connect to MySQL from Java (JDBC).",
    tech: ["Java", "MySQL", "JDBC", "SQL"],
    effort: "2–3 weeks",
    impact: "Medium",
    year: "Y1 Sem 2",
  },
  {
    name: "REST API — Task Manager",
    desc: "Spring Boot REST API with user auth (JWT), task CRUD, and PostgreSQL. Your first production-grade backend. Deploy to Railway or Render free tier.",
    tech: ["Spring Boot", "JWT", "PostgreSQL", "Docker"],
    effort: "4–5 weeks",
    impact: "Very High",
    year: "Y2",
  },
  {
    name: "Full-Stack Dev Portfolio",
    desc: "React + Spring Boot portfolio with real projects, GitHub stats, DSA progress badge, and a blog. Your #1 recruiter touchpoint — keep it live.",
    tech: ["React", "Spring Boot", "Vercel", "Railway"],
    effort: "3 weeks",
    impact: "Very High",
    year: "Y2",
  },
  {
    name: "URL Shortener (System Design Practice)",
    desc: "Build Bit.ly. Key decisions: ID generation (base62), DB choice, caching layer (Redis), analytics. Teaches you real system design tradeoffs hands-on.",
    tech: ["Spring Boot", "Redis", "PostgreSQL", "Docker"],
    effort: "3–4 weeks",
    impact: "High",
    year: "Y2–Y3",
  },
  {
    name: "AI-Powered Study Assistant",
    desc: "Integrate Claude or GPT-4 API to build a smart quiz generator and spaced repetition app. Full-stack: React + Spring Boot + LLM API. Killer portfolio piece.",
    tech: ["Spring Boot", "React", "OpenAI/Claude API", "PostgreSQL"],
    effort: "5–6 weeks",
    impact: "Very High",
    year: "Y3",
  },
  {
    name: "Distributed Job Scheduler",
    desc: "Cron-like distributed task scheduler with worker nodes, queue (Kafka), retry logic, and monitoring. Demonstrates distributed systems knowledge interviewers love.",
    tech: ["Java", "Kafka", "Spring Boot", "Docker", "K8s"],
    effort: "6–8 weeks",
    impact: "Very High",
    year: "Y3–Y4",
  },
];

const impactColor: Record<string, string> = {
  "Very High": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  "High": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "Medium": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

const yearBadge: Record<string, string> = {
  "Y1": "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400",
  "Y1 Sem 2": "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400",
  "Y2": "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400",
  "Y2–Y3": "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400",
  "Y3": "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400",
  "Y3–Y4": "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400",
};

export default function Projects() {
  return (
    <PageLayout>
      <PageHeader
        title="Projects"
        subtitle="0 built · Your projects are your live resume — build things people can use"
        action={
          <Button size="sm">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Project
          </Button>
        }
      />

      {/* Empty state */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl flex flex-col items-center justify-center py-12 text-center mb-6">
        <div className="w-12 h-12 rounded-xl bg-[var(--muted)] flex items-center justify-center mb-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.5">
            <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
          </svg>
        </div>
        <h3 className="font-display font-semibold text-[var(--foreground)] mb-1">No projects yet</h3>
        <p className="text-sm text-[var(--muted-foreground)] max-w-md leading-relaxed">
          Start with the DSA Visualizer or LeetCode Tracker — small but impactful. Every shipped project is a story you can tell in interviews.
        </p>
      </div>

      {/* Project ideas */}
      <div>
        <p className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wide mb-3">Recommended Projects — 4 Year Plan</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {ideas.map((p) => (
            <div key={p.name} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 hover:border-[var(--primary)]/40 transition-colors">
              <div className="flex items-start justify-between mb-2 gap-2">
                <h4 className="font-display font-semibold text-[var(--foreground)]">{p.name}</h4>
                <div className="flex gap-2 flex-shrink-0">
                  <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${yearBadge[p.year] || "bg-[var(--muted)] text-[var(--muted-foreground)]"}`}>{p.year}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${impactColor[p.impact] || ""}`}>{p.impact} impact</span>
                </div>
              </div>
              <p className="text-sm text-[var(--muted-foreground)] mb-3 leading-relaxed">{p.desc}</p>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex gap-1.5 flex-wrap">
                  {p.tech.map((t) => (
                    <span key={t} className="text-xs px-1.5 py-0.5 rounded bg-[var(--muted)] text-[var(--muted-foreground)]">{t}</span>
                  ))}
                </div>
                <span className="text-xs text-[var(--muted-foreground)]">⏱ {p.effort}</span>
              </div>
              <button className="mt-3 text-xs text-[var(--primary)] hover:underline">Add to my projects →</button>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
