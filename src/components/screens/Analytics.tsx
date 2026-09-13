import { PageLayout, PageHeader, Card } from "../ui";

export default function Analytics() {
  return (
    <PageLayout>
      <PageHeader
        title="Analytics"
        subtitle="Track your growth and consistency"
      />

      {/* Stats row — all zero */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Study Hours (Week)", value: "0h" },
          { label: "Problems Solved (Week)", value: "0" },
          { label: "Avg Daily Hours", value: "0h" },
          { label: "Streak", value: "0 days" },
        ].map((s) => (
          <div key={s.label} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
            <p className="text-xs text-[var(--muted-foreground)] mb-1">{s.label}</p>
            <p className="font-display text-2xl font-semibold text-[var(--muted-foreground)]">{s.value}</p>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">No data yet</p>
          </div>
        ))}
      </div>

      {/* Empty state */}
      <Card className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-14 h-14 rounded-xl bg-[var(--muted)] flex items-center justify-center mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.5">
            <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
            <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
          </svg>
        </div>
        <h3 className="font-display font-semibold text-[var(--foreground)] mb-2">No data to show yet</h3>
        <p className="text-sm text-[var(--muted-foreground)] max-w-sm leading-relaxed">
          Complete your first study sessions and mark tasks as done. Your charts — study hours, DSA progress, skill growth, and consistency — will appear here automatically.
        </p>
      </Card>

      {/* Consistency calendar — all empty */}
      <div className="mt-5">
        <Card>
          <p className="font-display font-semibold text-[var(--foreground)] mb-4">Consistency — September 2026</p>
          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: 30 }, (_, i) => {
              const day = i + 1;
              const isFuture = day > 12;
              return (
                <div
                  key={i}
                  title={`Sep ${day}`}
                  className="aspect-square rounded-md flex items-center justify-center text-[10px] font-mono bg-[var(--muted)] text-[var(--border)]"
                >
                  {day}
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-3 text-xs text-[var(--muted-foreground)]">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-[var(--primary)]" /> Studied
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-red-100 dark:bg-red-900/30" /> Missed
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-[var(--muted)]" /> Not recorded
            </div>
          </div>
        </Card>
      </div>
    </PageLayout>
  );
}
