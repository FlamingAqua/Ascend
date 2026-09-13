import { useState } from "react";
import { PageLayout, PageHeader, Badge, Button } from "../ui";

type Priority = "high" | "medium" | "low";
type TaskStatus = "todo" | "done";

interface Task {
  id: number;
  title: string;
  subject: string;
  priority: Priority;
  due: string;
  status: TaskStatus;
  tags: string[];
}

const initialTasks: Task[] = [
  { id: 1, title: "Install IntelliJ IDEA + JDK 21 and run first Java program", subject: "Java", priority: "high", due: "Today", status: "todo", tags: ["Setup", "Day 1"] },
  { id: 2, title: "Watch Telusko Java OOP: Classes, Objects, Constructors (Ep 10–15)", subject: "Java", priority: "high", due: "Today", status: "todo", tags: ["Video", "OOP"] },
  { id: 3, title: "Code 5 OOP programs: BankAccount, Student, Shape, Animal, Calculator", subject: "Java", priority: "high", due: "Today", status: "todo", tags: ["Coding", "OOP"] },
  { id: 4, title: "LeetCode #217 Contains Duplicate — solve in Java", subject: "DSA", priority: "high", due: "Today", status: "todo", tags: ["LeetCode", "Arrays"] },
  { id: 5, title: "LeetCode #242 Valid Anagram — solve in Java", subject: "DSA", priority: "high", due: "Today", status: "todo", tags: ["LeetCode", "Arrays"] },
  { id: 6, title: "LeetCode #1 Two Sum — solve in Java", subject: "DSA", priority: "high", due: "Today", status: "todo", tags: ["LeetCode", "Arrays"] },
  { id: 7, title: "Read Striver A2Z Sheet — Arrays section overview", subject: "DSA", priority: "high", due: "Today", status: "todo", tags: ["DSA", "Planning"] },
  { id: 8, title: "Learn Big-O notation — CS Dojo video (25 min)", subject: "DSA", priority: "medium", due: "Today", status: "todo", tags: ["Theory", "Complexity"] },
  { id: 9, title: "Set up GitHub profile + create repo: java-dsa-practice", subject: "Git", priority: "medium", due: "This week", status: "todo", tags: ["Git", "Setup"] },
  { id: 10, title: "Register for LeetCode and join Weekly Contest tracking", subject: "DSA", priority: "medium", due: "This week", status: "todo", tags: ["LeetCode", "Contest"] },
  { id: 11, title: "LeetCode #49 Group Anagrams — Java HashMap grouping", subject: "DSA", priority: "high", due: "Sep 13", status: "todo", tags: ["LeetCode", "Medium"] },
  { id: 12, title: "LeetCode #238 Product Except Self — prefix/suffix arrays", subject: "DSA", priority: "high", due: "Sep 13", status: "todo", tags: ["LeetCode", "Medium"] },
  { id: 13, title: "Java — Inheritance: extends, super keyword, method overriding (code 3 examples)", subject: "Java", priority: "high", due: "Sep 13", status: "todo", tags: ["Java", "OOP"] },
  { id: 14, title: "SQLZoo Tutorial 1 & 2 — practice 10 SELECT queries", subject: "SQL", priority: "medium", due: "Sep 14", status: "todo", tags: ["SQL", "Practice"] },
  { id: 15, title: "Watch Kunal Kushwaha — Java Collections Framework (1h)", subject: "Java", priority: "medium", due: "Sep 15", status: "todo", tags: ["Video", "Collections"] },
  { id: 16, title: "Java OOP Assignment — submit to college", subject: "College", priority: "high", due: "This week", status: "todo", tags: ["Assignment", "Deadline"] },
  { id: 17, title: "LeetCode Weekly Contest #412 — attempt at least 2 problems", subject: "DSA", priority: "medium", due: "Sep 15", status: "todo", tags: ["Contest", "LeetCode"] },
  { id: 18, title: "Mock Interview Prep — write BankAccount class from memory in 10 min", subject: "Java", priority: "high", due: "Sep 20", status: "todo", tags: ["Interview", "OOP"] },
];

const priorityLabel: Record<Priority, { variant: "danger" | "warning" | "default"; label: string }> = {
  high: { variant: "danger", label: "High" },
  medium: { variant: "warning", label: "Medium" },
  low: { variant: "default", label: "Low" },
};

export default function Tasks() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState<"all" | "todo" | "done">("all");
  const [subject, setSubject] = useState("All");

  const subjects = ["All", ...Array.from(new Set(initialTasks.map((t) => t.subject)))];

  const visible = tasks
    .filter((t) => filter === "all" || t.status === filter)
    .filter((t) => subject === "All" || t.subject === subject)
    .sort((a, b) => {
      const p = { high: 0, medium: 1, low: 2 };
      if (a.status !== b.status) return a.status === "todo" ? -1 : 1;
      return p[a.priority] - p[b.priority];
    });

  const toggle = (id: number) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: t.status === "done" ? "todo" : "done" } : t)));

  const done = tasks.filter((t) => t.status === "done").length;

  return (
    <PageLayout>
      <PageHeader
        title="Tasks"
        subtitle={`${done} / ${tasks.length} complete · Java + DSA focused`}
        action={
          <Button size="sm">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Task
          </Button>
        }
      />

      <div className="flex gap-3 mb-5 flex-wrap items-center">
        <div className="flex gap-1 bg-[var(--muted)] p-1 rounded-lg">
          {(["all", "todo", "done"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors ${
                filter === f
                  ? "bg-[var(--card)] text-[var(--foreground)] shadow-sm"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {subjects.map((s) => (
            <button
              key={s}
              onClick={() => setSubject(s)}
              className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
                subject === s
                  ? "bg-[var(--secondary)] text-[var(--secondary-foreground)] font-medium"
                  : "text-[var(--muted-foreground)] hover:bg-[var(--muted)]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
        {visible.map((task, i) => (
          <div
            key={task.id}
            className={`flex items-start gap-4 px-5 py-4 transition-colors hover:bg-[var(--muted)]/30 ${
              i < visible.length - 1 ? "border-b border-[var(--border)]" : ""
            } ${task.status === "done" ? "opacity-60" : ""}`}
          >
            <button
              onClick={() => toggle(task.id)}
              className={`w-5 h-5 mt-0.5 rounded flex-shrink-0 border-2 flex items-center justify-center transition-colors ${
                task.status === "done"
                  ? "bg-[var(--primary)] border-[var(--primary)]"
                  : "border-[var(--border)] hover:border-[var(--primary)]"
              }`}
            >
              {task.status === "done" && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
            </button>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${task.status === "done" ? "line-through text-[var(--muted-foreground)]" : "text-[var(--foreground)]"}`}>
                {task.title}
              </p>
              <div className="flex gap-2 mt-1.5 flex-wrap items-center">
                <span className="text-xs text-[var(--muted-foreground)] font-mono">{task.due}</span>
                <span className="text-[var(--border)]">·</span>
                <span className="text-xs text-[var(--muted-foreground)]">{task.subject}</span>
                <span className="text-[var(--border)]">·</span>
                <Badge variant={priorityLabel[task.priority].variant}>{priorityLabel[task.priority].label}</Badge>
              </div>
            </div>
            <div className="hidden sm:flex gap-1.5 flex-shrink-0">
              {task.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded-md bg-[var(--muted)] text-[var(--muted-foreground)]">{tag}</span>
              ))}
            </div>
          </div>
        ))}
        {visible.length === 0 && (
          <div className="text-center py-12 text-[var(--muted-foreground)] text-sm">No tasks found.</div>
        )}
      </div>
    </PageLayout>
  );
}
