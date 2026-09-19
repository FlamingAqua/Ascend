import { PageLayout, PageHeader, Button } from "../ui";
import { useAuth } from "../../services/AuthContext";
import { getLanguagePlan, getPlanningContext } from "../../services/planningService";

export default function Projects() {
  const plan = getLanguagePlan(getPlanningContext(useAuth().profile).preferredLanguage);

  return (
    <PageLayout>
      <PageHeader title="Projects" subtitle={`Recommended projects built around ${plan.language} and your DSA track`} action={<Button size="sm">Add Project</Button>} />
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 text-center mb-6">
        <h3 className="font-display font-semibold text-[var(--foreground)] mb-1">No projects yet</h3>
        <p className="text-sm text-[var(--muted-foreground)]">Start with the {plan.projects[0].name}. Completed projects remain separate from future language recommendations.</p>
      </div>
      <p className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wide mb-3">Recommended Projects</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {plan.projects.map((project) => (
          <div key={project.name} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
            <div className="flex items-start justify-between gap-2 mb-2"><h4 className="font-display font-semibold text-[var(--foreground)]">{project.name}</h4><span className="text-xs px-2 py-0.5 rounded-md bg-[var(--muted)] text-[var(--muted-foreground)]">{project.year}</span></div>
            <p className="text-sm text-[var(--muted-foreground)] mb-3 leading-relaxed">{project.desc}</p>
            <div className="flex gap-1.5 flex-wrap">{project.tech.map((tech) => <span key={tech} className="text-xs px-1.5 py-0.5 rounded bg-[var(--muted)] text-[var(--muted-foreground)]">{tech}</span>)}</div>
            <p className="text-xs text-[var(--muted-foreground)] mt-3">{project.effort} · {project.impact} impact</p>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
