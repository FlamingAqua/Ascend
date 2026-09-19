import { useEffect, useState } from "react";
import { PageLayout, PageHeader, Button } from "../ui";
import { useAuth } from "../../services/AuthContext";
import { generateDailySchedule, getPlanningContext } from "../../services/planningService";

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

const priorityStyle = {
  high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  low: "bg-[var(--muted)] text-[var(--muted-foreground)]",
};

export default function Today() {
  const { profile } = useAuth();
  const context = getPlanningContext(profile);
  const language = context.preferredLanguage;
  const tasks = generateDailySchedule(context);
  const [statuses, setStatuses] = useState<Status[]>(() => tasks.map((task) => task.status));
  useEffect(() => setStatuses(tasks.map((task) => task.status)), [language, context.academicYear, context.semester, context.targetYear]);
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
              {language} + DSA day
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
