import { useState } from "react";
import { PageLayout, PageHeader, Button } from "../ui";

type Status = "done" | "active" | "upcoming" | "skipped";

interface Task {
  time: string;
  task: string;
  topic: string;
  duration: string;
  resource: string;
  priority: "high" | "medium" | "low";
  status: Status;
}

const tasks: Task[] = [
  { time: "6:00 AM", task: "Java Theory", topic: "OOP – Classes, Objects, Constructors, 'this' keyword", duration: "1h", resource: "Telusko Java Full Course – Ep 10–15", priority: "high", status: "upcoming" },
  { time: "7:00 AM", task: "Java Coding", topic: "Write 5 OOP programs: BankAccount, Student, Animal, Shape, Calculator", duration: "1h", resource: "IntelliJ IDEA / VS Code", priority: "high", status: "upcoming" },
  { time: "8:00 AM", task: "Break + Breakfast", topic: "—", duration: "30 min", resource: "—", priority: "low", status: "upcoming" },
  { time: "8:30 AM", task: "DSA – Concept", topic: "Arrays: declaration, traversal, insertion, deletion in Java", duration: "45 min", resource: "Striver's A2Z Sheet – Arrays section + notes", priority: "high", status: "upcoming" },
  { time: "9:15 AM", task: "DSA – LeetCode", topic: "Arrays Easy: #1 Two Sum, #217 Contains Duplicate, #242 Valid Anagram", duration: "1h 15m", resource: "LeetCode.com – Java solutions", priority: "high", status: "upcoming" },
  { time: "10:30 AM", task: "Break", topic: "—", duration: "30 min", resource: "—", priority: "low", status: "upcoming" },
  { time: "11:00 AM", task: "Java – Deep Dive", topic: "Inheritance: extends, super keyword, method overriding", duration: "1h", resource: "Kunal Kushwaha Java playlist – OOP Part 2", priority: "high", status: "upcoming" },
  { time: "12:00 PM", task: "Lunch", topic: "—", duration: "1h", resource: "—", priority: "low", status: "upcoming" },
  { time: "1:00 PM", task: "DSA – Problem Solving", topic: "Arrays Medium: #238 Product Except Self, #53 Maximum Subarray", duration: "1h 30m", resource: "LeetCode – aim for brute first, then optimize", priority: "high", status: "upcoming" },
  { time: "2:30 PM", task: "Java + DSA Revision", topic: "Re-read today's notes, re-trace solutions without help", duration: "30 min", resource: "Your own notes", priority: "high", status: "upcoming" },
  { time: "3:00 PM", task: "CS Fundamentals", topic: "Time & Space Complexity – Big-O intuition for all array ops", duration: "45 min", resource: "CS Dojo Big-O video + Abdul Bari playlist", priority: "medium", status: "upcoming" },
  { time: "3:45 PM", task: "Break", topic: "—", duration: "30 min", resource: "—", priority: "low", status: "upcoming" },
  { time: "4:15 PM", task: "SQL Basics", topic: "SELECT, WHERE, ORDER BY, GROUP BY – write 10 queries", duration: "45 min", resource: "SQLZoo.net – Tutorial 1 & 2", priority: "medium", status: "upcoming" },
  { time: "5:00 PM", task: "Evening Solve", topic: "1 more DSA problem: any array Easy you haven't touched", duration: "30 min", resource: "LeetCode – try without hints", priority: "medium", status: "upcoming" },
  { time: "5:30 PM", task: "Day Wrap-up", topic: "Write what you learned, what was hard, what you'll revise tomorrow", duration: "15 min", resource: "Notion / paper journal", priority: "high", status: "upcoming" },
];

const priorityStyle = {
  high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  low: "bg-[var(--muted)] text-[var(--muted-foreground)]",
};

export default function Today() {
  const [statuses, setStatuses] = useState<Status[]>(tasks.map((t) => t.status));
  const mark = (i: number, s: Status) => setStatuses((prev) => prev.map((v, j) => (j === i ? s : v)));

  const done = statuses.filter((s) => s === "done").length;
  const skipped = statuses.filter((s) => s === "skipped").length;
  const studyTasks = tasks.filter((t) => t.topic !== "—");
  const studyDone = studyTasks.filter((_, i) => statuses[tasks.indexOf(studyTasks[i])] === "done").length;

  return (
    <PageLayout>
      <PageHeader
        title="Today"
        subtitle={`Sep 12 · ${done} / ${tasks.length} complete · 6h study goal`}
        action={
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[var(--muted-foreground)] bg-[var(--muted)] px-2 py-1 rounded">
              Java + DSA day
            </span>
          </div>
        }
      />

      <div className="mb-6 bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium text-[var(--foreground)]">Daily Progress</span>
          <span className="text-[var(--muted-foreground)]">{done} done · {skipped} skipped · {tasks.length - done - skipped} remaining</span>
        </div>
        <div className="flex gap-0.5 h-2 rounded-full overflow-hidden">
          {statuses.map((s, i) => (
            <div key={i} className={`flex-1 transition-colors ${
              s === "done" ? "bg-[var(--primary)]" :
              s === "skipped" ? "bg-[var(--muted-foreground)]/30" :
              "bg-[var(--muted)]"
            }`} />
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-[88px] top-0 bottom-0 w-px bg-[var(--border)]" />
        <div className="space-y-2">
          {tasks.map((task, i) => {
            const status = statuses[i];
            const isBreak = task.topic === "—";
            return (
              <div key={i} className={`flex gap-4 ${isBreak ? "opacity-40" : ""}`}>
                <div className="w-20 flex-shrink-0 text-right pt-3.5">
                  <span className="font-mono text-xs text-[var(--muted-foreground)]">{task.time}</span>
                </div>
                <div className="flex-shrink-0 w-4 flex items-start justify-center pt-4">
                  <div className={`w-3 h-3 rounded-full border-2 transition-colors ${
                    status === "done" ? "bg-[var(--primary)] border-[var(--primary)]" :
                    status === "skipped" ? "bg-[var(--muted)] border-[var(--muted-foreground)]/40" :
                    "bg-[var(--card)] border-[var(--border)]"
                  }`} />
                </div>
                <div className={`flex-1 mb-2 rounded-xl border transition-all ${
                  status === "done" ? "border-[var(--border)] bg-[var(--muted)]/40" :
                  status === "skipped" ? "border-[var(--border)] bg-[var(--muted)]/20 opacity-50" :
                  "border-[var(--border)] bg-[var(--card)]"
                }`}>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <span className={`font-display font-semibold text-sm ${status === "done" ? "line-through text-[var(--muted-foreground)]" : "text-[var(--foreground)]"}`}>
                            {task.task}
                          </span>
                          {!isBreak && (
                            <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${priorityStyle[task.priority]}`}>
                              {task.priority}
                            </span>
                          )}
                        </div>
                        {!isBreak && (
                          <>
                            <p className="text-sm text-[var(--foreground)]">{task.topic}</p>
                            <div className="flex gap-4 mt-1.5 flex-wrap">
                              <span className="text-xs text-[var(--muted-foreground)] flex items-center gap-1">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                {task.duration}
                              </span>
                              <span className="text-xs text-[var(--muted-foreground)] flex items-center gap-1">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>
                                {task.resource}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                      {!isBreak && status !== "done" && status !== "skipped" && (
                        <div className="flex gap-2 flex-shrink-0">
                          <Button size="sm" onClick={() => mark(i, "done")}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                            Done
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => mark(i, "skipped")}>Skip</Button>
                        </div>
                      )}
                      {status === "done" && (
                        <div className="w-5 h-5 rounded-full bg-[var(--primary)] flex items-center justify-center flex-shrink-0">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageLayout>
  );
}
