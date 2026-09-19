import { useState } from "react";
import { PageLayout, PageHeader, ProgressBar, Badge } from "../ui";
import { useAuth } from "../../services/AuthContext";
import { generateRoadmap, getPlanningContext } from "../../services/planningService";

export default function Roadmap() {
  const { profile } = useAuth();
  const context = getPlanningContext(profile);
  const roadmap = generateRoadmap(context);
  const [openYear, setOpenYear] = useState("Year 1");
  const [openSem, setOpenSem] = useState("Sem 1 (Now)");
  const year = roadmap.find((item) => item.year === openYear) || roadmap[0];
  const semester = year.semesters.find((item) => item.name === openSem) || year.semesters[0];

  return (
    <PageLayout>
      <PageHeader title={`Roadmap to ${context.targetYear}`} subtitle={`${context.preferredLanguage} + DSA -> FAANG / top SWE roles`} />
      <div className="flex gap-3 mb-6 flex-wrap">
        {roadmap.map((item) => (
          <button key={item.year} onClick={() => { setOpenYear(item.year); setOpenSem(item.semesters[0].name); }} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all text-left ${openYear === item.year ? "bg-[var(--primary)] text-white" : "bg-[var(--card)] border border-[var(--border)] text-[var(--muted-foreground)]"}`}>
            <span>{item.year}</span>
            <span className="block text-xs mt-0.5 opacity-75">{item.label}</span>
          </button>
        ))}
      </div>
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 mb-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-3 mb-1"><h2 className="font-display text-xl font-semibold text-[var(--foreground)]">{year.year} - {year.label}</h2><Badge variant={year.status === "active" ? "info" : "default"}>{year.status === "active" ? "Current" : "Upcoming"}</Badge></div>
            <p className="text-sm text-[var(--muted-foreground)]">Target: {year.target}</p>
          </div>
          <span className="font-mono text-sm text-[var(--muted-foreground)]">{year.progress}%</span>
        </div>
        <ProgressBar value={year.progress} height="h-2" />
      </div>
      <div className="flex gap-2 mb-4 flex-wrap">
        {year.semesters.map((item) => <button key={item.name} onClick={() => setOpenSem(item.name)} className={`px-3 py-1.5 rounded-lg text-sm ${semester.name === item.name ? "bg-[var(--secondary)] text-[var(--secondary-foreground)] font-medium" : "text-[var(--muted-foreground)]"}`}>{item.name}</button>)}
      </div>
      <div className="space-y-4">
        {semester.months.map((month) => (
          <div key={month.name} className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-[var(--border)] bg-[var(--muted)]/40"><p className="font-display font-semibold text-sm text-[var(--foreground)]">{month.name}</p></div>
            <div className="p-5 space-y-5">
              {month.skills.map((skill) => <div key={skill.name}>
                <div className="flex items-center justify-between mb-2"><span className="font-display font-semibold text-[var(--foreground)]">{skill.name}</span><span className="font-mono text-xs text-[var(--muted-foreground)]">{skill.done}/{skill.topics.length} topics</span></div>
                <div className="flex gap-2 flex-wrap">{skill.topics.map((topic, index) => <div key={topic} className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${index === skill.done && year.status === "active" ? "bg-[var(--secondary)] border-[var(--primary)]/40 text-[var(--primary)]" : "bg-[var(--muted)] border-[var(--border)] text-[var(--muted-foreground)]"}`}>{topic}</div>)}</div>
              </div>)}
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
