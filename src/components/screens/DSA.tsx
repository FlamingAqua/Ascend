import { useState } from "react";
import { PageLayout, PageHeader, Card, ProgressBar, Badge, Button } from "../ui";
import { useAuth } from "../../services/AuthContext";
import { DSA_TOPICS, getLanguagePlan } from "../../services/planningService";

export default function DSA() {
    const { profile } = useAuth();
    const plan = getLanguagePlan(profile?.preferredLanguage);
    const language = plan.language;
    const topics = DSA_TOPICS.map((topic, index) => ({ ...topic, done: 0, mastery: 0, accuracy: 0, status: index === 0 ? "active" : "upcoming" as const }));
    const arraysProblems = plan.practice;
    const resources = plan.resources;
  const [selectedTopic, setSelectedTopic] = useState("Arrays & Hashing");
  const current = topics.find((t) => t.name === selectedTopic) || topics[0];
  const totalProblems = topics.reduce((a, t) => a + t.problems, 0);

  return (
    <PageLayout>
      <PageHeader
        title={`DSA — ${language}`}
        subtitle={`0 / ${totalProblems} problems · All solutions in ${language} · Follow Striver's A2Z order`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Topic sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
              <p className="font-display font-semibold text-sm text-[var(--foreground)]">Topics</p>
              <span className="font-mono text-xs text-[var(--muted-foreground)]">{totalProblems} problems</span>
            </div>
            <div className="py-2 max-h-[600px] overflow-y-auto">
              {topics.map((t) => (
                <button
                  key={t.name}
                  onClick={() => setSelectedTopic(t.name)}
                  className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-colors ${
                    selectedTopic === t.name
                      ? "bg-[var(--secondary)] text-[var(--foreground)]"
                      : "text-[var(--muted-foreground)] hover:bg-[var(--muted)]"
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    t.status === "active" ? "bg-[var(--primary)]" : "bg-[var(--border)]"
                  }`} />
                  <span className="truncate flex-1">{t.name}</span>
                  {t.tag && (
                    <span className="text-[10px] text-[var(--primary)] font-medium flex-shrink-0">{t.tag}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main */}
        <div className="lg:col-span-3 space-y-5">
          <Card>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="font-display text-xl font-semibold text-[var(--foreground)]">{current.name}</h2>
                <div className="flex gap-2 mt-1.5">
                  <Badge variant={current.status === "active" ? "info" : "default"}>
                    {current.status === "active" ? "👉 Start Here" : "Unlock after previous topic"}
                  </Badge>
                  <span className="text-xs text-[var(--muted-foreground)] self-center">{current.problems} problems</span>
                </div>
              </div>
              {current.status === "active" && (
                <Button size="sm">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  Start in {language}
                </Button>
              )}
            </div>

            <ProgressBar value={0} max={current.problems} height="h-2" />
            <div className="flex justify-between text-xs text-[var(--muted-foreground)] mt-1.5 mb-4">
              <span>0 / {current.problems} problems solved in {language}</span>
              <span>0%</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Mastery Score", value: "—" },
                { label: "Accuracy", value: "—" },
                { label: "Remaining", value: `${current.problems}` },
              ].map((s) => (
                <div key={s.label} className="bg-[var(--muted)] rounded-lg p-3 text-center">
                  <p className="font-mono text-xl font-semibold text-[var(--muted-foreground)]">{s.value}</p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {current.status === "active" && (
              <div className="mt-4 pt-4 border-t border-[var(--border)]">
                <p className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wide mb-2">{language} Notes for this Topic</p>
                <div className="bg-[var(--muted)] rounded-lg p-3 text-sm text-[var(--foreground)] font-mono space-y-1">
                  <p>// Use a hash map for O(1) average lookup</p>
                  <p>{plan.syntaxExample}</p>
                  <p>// Track frequency before solving the pattern</p>
                  <p>// Keep the target complexity visible while coding</p>
                </div>
              </div>
            )}
          </Card>

          {/* Problems */}
          {current.name === "Arrays & Hashing" && (
            <Card>
              <div className="flex items-center justify-between mb-4">
                <p className="font-display font-semibold text-[var(--foreground)]">Problem List — Arrays & Hashing</p>
                <span className="text-xs text-[var(--muted-foreground)]">Solve in {language} · Review your approach after each</span>
              </div>
              <div className="space-y-2">
                {arraysProblems.map((p) => (
                  <div key={p.id} className="flex items-start gap-3 py-2.5 border-b border-[var(--border)] last:border-0">
                    <span className="font-mono text-xs text-[var(--muted-foreground)] w-10 text-right flex-shrink-0 mt-0.5">{p.id}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[var(--foreground)]">{p.title}</p>
                      <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{p.note}</p>
                    </div>
                    <Badge variant={p.difficulty === "Easy" ? "success" : "warning"}>{p.difficulty}</Badge>
                    <Button size="sm" variant="ghost">Solve</Button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Resources */}
          <Card>
            <p className="font-display font-semibold text-[var(--foreground)] mb-4">Best Resources — {language} DSA</p>
            <div className="space-y-3">
              {resources.map((r) => (
                <div key={r.name} className="flex items-start gap-3 py-2 border-b border-[var(--border)] last:border-0">
                  <Badge variant="default">{r.type}</Badge>
                  <div>
                    <p className="text-sm font-medium text-[var(--foreground)]">{r.name}</p>
                    <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
