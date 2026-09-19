import { PageLayout, PageHeader, ProgressBar } from "../ui";
import { useAuth } from "../../services/AuthContext";
import { getLanguagePlan, getPlanningContext } from "../../services/planningService";

export default function Skills() {
  const context = getPlanningContext(useAuth().profile);
  const plan = getLanguagePlan(context.preferredLanguage);
  const skills = [
    ...plan.skills.map((skill) => ({ ...skill, progress: 0, hours: 0, year: `Y${context.academicYear}` })),
    { name: "DSA", why: `Core problem-solving practice in ${plan.language}.`, currentTopic: "Arrays & Hashing", subtopics: ["Arrays", "Linked Lists", "Trees", "Graphs", "DP"], color: "bg-indigo-500", progress: 0, hours: 0, year: "Y1-Y4" },
    { name: "SQL", why: "Use data skills to support real projects and interviews.", currentTopic: "SELECT, WHERE, GROUP BY", subtopics: ["Basics", "JOINs", "Indexes", "Optimization"], color: "bg-blue-500", progress: 0, hours: 0, year: "Y1 Sem 2" },
    { name: "Git & Open Source", why: "Turn language-specific practice into visible, reviewable work.", currentTopic: "Commit, push, and pull requests", subtopics: ["Git", "GitHub", "Branches", "Code review"], color: "bg-gray-600", progress: 0, hours: 0, year: "Y1" },
  ];

  return (
    <PageLayout>
      <PageHeader title="Skill Stack" subtitle={`${plan.language} + DSA learning path for Year ${context.academicYear}`} />
      <div className="mb-5 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-3">
        <p className="text-sm text-amber-700 dark:text-amber-400"><strong>Current focus:</strong> {plan.language} foundations, {plan.collectionTerm}, and DSA patterns. Future language-specific tasks will use this track.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div key={skill.name} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
            <div className="flex items-start justify-between mb-3"><div><p className="font-display font-semibold text-[var(--foreground)]">{skill.name}</p><p className="text-xs text-[var(--muted-foreground)] mt-0.5">{skill.hours}h logged</p></div><span className="text-xs px-2 py-0.5 rounded-md bg-[var(--muted)] text-[var(--muted-foreground)]">{skill.year}</span></div>
            <p className="text-xs text-[var(--muted-foreground)] mb-3 leading-relaxed">{skill.why}</p>
            <div className="flex justify-between text-xs mb-1.5"><span className="text-[var(--muted-foreground)]">Progress</span><span className="font-mono text-[var(--foreground)]">{skill.progress}%</span></div>
            <ProgressBar value={skill.progress} color={skill.color} height="h-1.5" />
            <div className="bg-[var(--muted)] rounded-lg px-3 py-2 mt-3 mb-3"><p className="text-xs text-[var(--muted-foreground)] mb-0.5">Current / Next topic</p><p className="text-sm font-medium text-[var(--foreground)]">{skill.currentTopic}</p></div>
            <div className="flex gap-1.5 flex-wrap">{skill.subtopics.map((topic) => <span key={topic} className="text-xs px-2 py-0.5 rounded-md bg-[var(--muted)] text-[var(--muted-foreground)]">{topic}</span>)}</div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
