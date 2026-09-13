import { PageLayout, PageHeader, Button } from "../ui";

export default function Revision() {
  return (
    <PageLayout>
      <PageHeader
        title="Revision"
        subtitle="Spaced repetition — nothing due yet"
      />

      {/* Empty state */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl flex flex-col items-center justify-center py-20 text-center">
        <div className="w-14 h-14 rounded-xl bg-[var(--muted)] flex items-center justify-center mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.5">
            <path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>
          </svg>
        </div>
        <h3 className="font-display font-semibold text-[var(--foreground)] mb-2">No revision due</h3>
        <p className="text-sm text-[var(--muted-foreground)] max-w-sm leading-relaxed mb-6">
          Your revision queue is empty. As you study topics and solve problems, Ascend will schedule spaced repetition reviews automatically — so you never forget what you've learned.
        </p>
        <div className="text-xs text-[var(--muted-foreground)] bg-[var(--muted)] rounded-lg px-4 py-3 max-w-sm text-left">
          <p className="font-medium text-[var(--foreground)] mb-1">How spaced repetition works</p>
          <p>Each time you study a topic, it's added here with a review interval (1 day → 3 days → 7 days → 14 days...). You rate how well you remembered it, and the interval adjusts. Over time, you keep things in long-term memory with minimal effort.</p>
        </div>
      </div>

      {/* What will appear here */}
      <div className="mt-6">
        <p className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wide mb-3">What will appear here</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Overdue items", desc: "Topics past their scheduled review date — flagged in red.", icon: "🔴" },
            { title: "Due today", desc: "Your daily revision cards — estimated 20–30 min per session.", icon: "🟡" },
            { title: "Upcoming", desc: "Scheduled future reviews so you can plan ahead.", icon: "⚪" },
          ].map((item) => (
            <div key={item.title} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
              <div className="text-xl mb-2">{item.icon}</div>
              <p className="font-display font-semibold text-sm text-[var(--foreground)] mb-1">{item.title}</p>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
