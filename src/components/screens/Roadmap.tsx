import { useState } from "react";
import { PageLayout, PageHeader, ProgressBar, Badge } from "../ui";

const roadmap = [
  {
    year: "Year 1",
    label: "Java + DSA Foundation",
    status: "active",
    progress: 0,
    target: "Solve 150 DSA problems. Master Java OOP. Build 2 projects.",
    semesters: [
      {
        name: "Sem 1 (Now)",
        progress: 0,
        months: [
          {
            name: "Aug–Oct · Java Core",
            skills: [
              { name: "Java OOP", topics: ["Classes & Objects", "Constructors", "Inheritance", "Polymorphism", "Abstraction", "Encapsulation", "Interfaces"], done: 0 },
              { name: "DSA – Arrays & Strings", topics: ["Arrays basics", "Two Pointers", "Sliding Window", "Prefix Sum", "Kadane's Algorithm", "String manipulation"], done: 0 },
              { name: "Time & Space Complexity", topics: ["Big-O notation", "Best/Worst/Avg Case", "Amortized Analysis", "Complexity of common algos"], done: 0 },
            ],
          },
          {
            name: "Nov–Dec · Stacks, Queues, Linked Lists",
            skills: [
              { name: "Java – Collections & Generics", topics: ["ArrayList", "LinkedList", "Stack", "Queue", "HashMap", "HashSet", "TreeMap", "Iterator"], done: 0 },
              { name: "DSA – Linked Lists", topics: ["Singly LL", "Doubly LL", "Fast & Slow Pointers", "Reverse LL", "Cycle Detection", "Merge Sorted Lists"], done: 0 },
              { name: "DSA – Stack & Queue", topics: ["Monotonic Stack", "Min Stack", "LRU Cache", "Sliding Window Maximum", "Implement Queue using Stacks"], done: 0 },
            ],
          },
        ],
      },
      {
        name: "Sem 2",
        progress: 0,
        months: [
          {
            name: "Jan–Mar · Trees & Recursion",
            skills: [
              { name: "Java – Exception Handling & I/O", topics: ["try-catch-finally", "Custom Exceptions", "File I/O", "Streams API", "Lambda Expressions"], done: 0 },
              { name: "DSA – Binary Trees & BST", topics: ["Tree Traversals", "DFS & BFS", "Height/Diameter", "LCA", "BST operations", "Balanced Trees"], done: 0 },
              { name: "DSA – Recursion & Backtracking", topics: ["Recursion patterns", "Subsets", "Permutations", "N-Queens", "Sudoku Solver", "Rat in a Maze"], done: 0 },
            ],
          },
          {
            name: "Apr–May · Heaps & SQL",
            skills: [
              { name: "DSA – Heaps & Priority Queue", topics: ["Min/Max Heap", "Top-K elements", "Merge K Lists", "Median of Stream", "Task Scheduler"], done: 0 },
              { name: "SQL Fundamentals", topics: ["SELECT/WHERE/GROUP BY", "JOINs (all types)", "Subqueries", "Window Functions", "Aggregations", "Indexes"], done: 0 },
              { name: "Git & GitHub", topics: ["git init/clone/push", "Branches & PRs", "Merge vs Rebase", "GitHub profile setup", "Open Source contribution"], done: 0 },
            ],
          },
        ],
      },
    ],
  },
  {
    year: "Year 2",
    label: "Intermediate DSA + First Internship",
    status: "upcoming",
    progress: 0,
    target: "Complete 350+ LeetCode. Land first internship. Build 2 full-stack projects.",
    semesters: [
      {
        name: "Sem 1",
        progress: 0,
        months: [
          {
            name: "Aug–Dec · Graphs + DP",
            skills: [
              { name: "DSA – Graphs", topics: ["BFS / DFS", "Topological Sort", "Dijkstra", "Bellman-Ford", "Floyd-Warshall", "Union-Find", "MST (Kruskal/Prim)"], done: 0 },
              { name: "DSA – Dynamic Programming", topics: ["1D DP", "2D DP", "Knapsack variants", "LCS/LIS", "Matrix Chain", "DP on Trees/Graphs", "Bitmask DP"], done: 0 },
              { name: "Java – Multithreading", topics: ["Threads & Runnable", "Synchronization", "ExecutorService", "CompletableFuture", "Concurrent Collections"], done: 0 },
            ],
          },
        ],
      },
      {
        name: "Sem 2",
        progress: 0,
        months: [
          {
            name: "Jan–May · Spring Boot + System Design Intro",
            skills: [
              { name: "Spring Boot", topics: ["REST APIs", "Spring MVC", "JPA & Hibernate", "Security (JWT)", "Testing with JUnit", "Docker basics"], done: 0 },
              { name: "System Design Intro", topics: ["Scalability concepts", "Load Balancing", "Caching (Redis)", "Database design", "CAP Theorem", "Rate Limiting"], done: 0 },
              { name: "Web Dev (React + JS)", topics: ["HTML/CSS", "JavaScript ES6+", "React fundamentals", "REST API integration", "Hooks & State Management"], done: 0 },
            ],
          },
        ],
      },
    ],
  },
  {
    year: "Year 3",
    label: "Advanced + Internship + Open Source",
    status: "upcoming",
    progress: 0,
    target: "500+ LeetCode (100+ Hard). FAANG internship. Contribute to major OSS project.",
    semesters: [
      {
        name: "Sem 1 & 2",
        progress: 0,
        months: [
          {
            name: "Full Year",
            skills: [
              { name: "Advanced DSA", topics: ["Tries", "Segment Trees", "Fenwick Tree", "Greedy Advanced", "Math (Number Theory, Combinatorics)", "Competitive Programming"], done: 0 },
              { name: "Distributed Systems", topics: ["Microservices", "Message Queues (Kafka)", "gRPC", "Service Discovery", "Circuit Breakers", "Event-driven arch"], done: 0 },
              { name: "Cloud & DevOps", topics: ["AWS (EC2, S3, RDS, Lambda)", "Docker & Kubernetes", "CI/CD Pipelines", "Monitoring (Grafana/Prometheus)", "Terraform"], done: 0 },
              { name: "AI/ML Fundamentals", topics: ["Linear Algebra", "Probability & Stats", "ML Algorithms", "scikit-learn", "Neural Networks intro", "LLM APIs"], done: 0 },
            ],
          },
        ],
      },
    ],
  },
  {
    year: "Year 4",
    label: "Placement Ready · FAANG / ₹1Cr+",
    status: "upcoming",
    progress: 0,
    target: "Crack FAANG. ₹50–100L+ CTC. Portfolio of 5+ production projects.",
    semesters: [
      {
        name: "Sem 1 & 2",
        progress: 0,
        months: [
          {
            name: "Full Year · Final Sprint",
            skills: [
              { name: "Interview Prep – DSA", topics: ["Daily LeetCode (2–3/day)", "Mock Interviews (Pramp, Interviewing.io)", "Company-tagged problems (Google, Meta, Amazon)", "Contest practice (Codeforces, CF Rounds)"], done: 0 },
              { name: "System Design – Advanced", topics: ["Design Twitter / YouTube / Uber", "Distributed databases", "Consistent Hashing", "CQRS & Event Sourcing", "Real-time systems"], done: 0 },
              { name: "Behavioural & Soft Skills", topics: ["STAR method stories", "Leadership examples", "Conflict resolution", "Why this company?", "Salary negotiation"], done: 0 },
              { name: "Capstone Project", topics: ["Full-stack SaaS product", "Microservices architecture", "Production deployment", "30k+ lines of code", "OSS release"], done: 0 },
            ],
          },
        ],
      },
    ],
  },
];

export default function Roadmap() {
  const [openYear, setOpenYear] = useState("Year 1");
  const [openSem, setOpenSem] = useState("Sem 1 (Now)");

  return (
    <PageLayout>
      <PageHeader title="Roadmap to 2030" subtitle="Java + DSA → FAANG / ₹1Cr+ CTC" />

      {/* Year tabs */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {roadmap.map((y) => (
          <button
            key={y.year}
            onClick={() => { setOpenYear(y.year); setOpenSem(y.semesters[0].name); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all text-left ${
              openYear === y.year
                ? "bg-[var(--primary)] text-white"
                : "bg-[var(--card)] border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            }`}
          >
            <span>{y.year}</span>
            <span className={`block text-xs mt-0.5 ${openYear === y.year ? "text-white/70" : "text-[var(--muted-foreground)]"}`}>{y.label}</span>
          </button>
        ))}
      </div>

      {roadmap.filter((y) => y.year === openYear).map((year) => (
        <div key={year.year}>
          {/* Year header */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 mb-5">
            <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="font-display text-xl font-semibold text-[var(--foreground)]">{year.year} — {year.label}</h2>
                  <Badge variant={year.status === "active" ? "info" : "default"}>
                    {year.status === "active" ? "Current" : "Upcoming"}
                  </Badge>
                </div>
                <p className="text-sm text-[var(--muted-foreground)]">🎯 {year.target}</p>
              </div>
              <span className="font-mono text-sm text-[var(--muted-foreground)]">{year.progress}%</span>
            </div>
            <ProgressBar value={year.progress} height="h-2" />
          </div>

          {/* Sem tabs */}
          <div className="flex gap-2 mb-4 flex-wrap">
            {year.semesters.map((s) => (
              <button
                key={s.name}
                onClick={() => setOpenSem(s.name)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                  openSem === s.name
                    ? "bg-[var(--secondary)] text-[var(--secondary-foreground)] font-medium"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>

          {year.semesters.filter((s) => s.name === openSem).map((sem) => (
            <div key={sem.name} className="space-y-4">
              {sem.months.map((month) => (
                <div key={month.name} className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
                  <div className="px-5 py-3 border-b border-[var(--border)] bg-[var(--muted)]/40">
                    <p className="font-display font-semibold text-sm text-[var(--foreground)]">{month.name}</p>
                  </div>
                  <div className="p-5 space-y-5">
                    {month.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-display font-semibold text-[var(--foreground)]">{skill.name}</span>
                          <span className="font-mono text-xs text-[var(--muted-foreground)]">{skill.done}/{skill.topics.length} topics</span>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          {skill.topics.map((topic, ti) => (
                            <div
                              key={topic}
                              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${
                                ti < skill.done
                                  ? "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-400"
                                  : ti === skill.done && year.status === "active"
                                  ? "bg-[var(--secondary)] border-[var(--primary)]/40 text-[var(--primary)]"
                                  : "bg-[var(--muted)] border-[var(--border)] text-[var(--muted-foreground)]"
                              }`}
                            >
                              {ti < skill.done && (
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                              )}
                              {ti === skill.done && year.status === "active" && (
                                <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                              )}
                              {topic}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </PageLayout>
  );
}
