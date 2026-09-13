import type { Screen } from "../../App";
import { useAuth } from "../../services/AuthContext";
import { PageLayout, PageHeader, Card, StatCard, ProgressBar, Badge, Button } from "../ui";

const upcomingDeadlines = [
  { name: "Java OOP Assignment", due: "This week", priority: "warning" as const },
  { name: "LeetCode Weekly Contest #412", due: "Sep 15", priority: "info" as const },
  { name: "DSA Mock Interview #1", due: "Sep 20", priority: "danger" as const },
  { name: "Striver's A2Z Sheet – Arrays complete", due: "Sep 30", priority: "warning" as const },
];

const skills = [
  { name: "Java", progress: 0, color: "bg-orange-500" },
  { name: "DSA", progress: 0, color: "bg-indigo-500" },
  { name: "SQL", progress: 0, color: "bg-blue-500" },
  { name: "System Design", progress: 0, color: "bg-teal-500" },
  { name: "Spring Boot", progress: 0, color: "bg-emerald-500" },
];

export default function Dashboard({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const { profile } = useAuth();
  const displayName = profile?.name || profile?.email || "Ascend Learner";

  return (
    <PageLayout>
      <PageHeader
        title={`Let's get to work, ${displayName.split(" ")[0] || "Learner"} 🔥`}
        subtitle="Saturday, Sep 12 · CSE Year 1 · Target: FAANG / ₹1Cr+ by 2030"
        action={
          <Button onClick={() => onNavigate("today")} size="sm">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Open Today
          </Button>
        }
      />

      {/* Goal banner */}
      <div className="mb-5 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl px-5 py-4 text-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium opacity-70 uppercase tracking-wide mb-1">Mission 2030</p>
            <p className="font-display font-semibold text-lg">Highest-Paying SWE Role · FAANG / Top Startup</p>
            <p className="text-sm opacity-80 mt-1">Java + DSA mastery → Projects → Internships → Offers. 4 years. No shortcuts, no excuses.</p>
          </div>
          <div className="flex-shrink-0 text-right">
            <p className="font-mono text-2xl font-semibold">1,461</p>
            <p className="text-xs opacity-70">days to 2030</p>
          </div>
        </div>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Study Hours Today"
          value="0h"
          sub="Goal: 6h · 0% done"
          accent="text-[var(--primary)]"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
          }
        />
        <StatCard
          label="Current Streak"
          value="0 days"
          sub="Start today — don't break the chain"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
          }
        />
        <StatCard
          label="DSA Problems"
          value="0"
          sub="Target: 500+ by Year 2"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
            </svg>
          }
        />
        <StatCard
          label="Roadmap Progress"
          value="0%"
          sub="Year 1 · Semester 1"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 17l6-6 4 4 8-8"/>
            </svg>
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          {/* Next Best Action */}
          <Card className="border-l-4 border-l-[var(--primary)]">
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-lg bg-[var(--secondary)] flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-[var(--primary)] uppercase tracking-wide mb-1">Next Best Action</p>
                <p className="font-display font-semibold text-[var(--foreground)]">Start: Java – OOP Fundamentals (Classes, Objects, Methods)</p>
                <p className="text-sm text-[var(--muted-foreground)] mt-1">Java is your primary weapon. Master OOP first — every DSA structure you build will use it. Watch Telusko Java full course, then write 5 small programs today.</p>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" onClick={() => onNavigate("dsa")}>Start DSA</Button>
                  <Button size="sm" variant="secondary" onClick={() => onNavigate("skills")}>View Skills</Button>
                  <Button size="sm" variant="secondary" onClick={() => onNavigate("roadmap")}>See Roadmap</Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Java + DSA status */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <div className="flex items-center justify-between mb-3">
                <p className="font-display font-semibold text-[var(--foreground)]">Java</p>
                <Badge variant="info">Active</Badge>
              </div>
              <p className="text-sm text-[var(--muted-foreground)] mb-2">Current: OOP Basics</p>
              <ProgressBar value={0} height="h-2" />
              <p className="text-xs text-[var(--muted-foreground)] mt-1.5">0 / 200+ hours logged</p>
            </Card>
            <Card>
              <div className="flex items-center justify-between mb-3">
                <p className="font-display font-semibold text-[var(--foreground)]">DSA</p>
                <Badge variant="info">Active</Badge>
              </div>
              <p className="text-sm text-[var(--muted-foreground)] mb-2">Start: Arrays & Hashing</p>
              <ProgressBar value={0} height="h-2" />
              <p className="text-xs text-[var(--muted-foreground)] mt-1.5">0 / 450 problems solved</p>
            </Card>
          </div>

          {/* Skill progress */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <p className="font-display font-semibold text-[var(--foreground)]">Skill Stack</p>
              <button onClick={() => onNavigate("skills")} className="text-xs text-[var(--primary)] hover:underline">All skills →</button>
            </div>
            <div className="space-y-3">
              {skills.map((s) => (
                <div key={s.name}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-[var(--foreground)] font-medium">{s.name}</span>
                    <span className="font-mono text-xs text-[var(--muted-foreground)]">{s.progress}%</span>
                  </div>
                  <ProgressBar value={s.progress} color={s.color} />
                </div>
              ))}
            </div>
            <p className="text-xs text-[var(--muted-foreground)] mt-3">Complete your first study session to start tracking.</p>
          </Card>

          {/* Weekly summary */}
          <Card>
            <p className="font-display font-semibold text-[var(--foreground)] mb-4">This Week</p>
            <div className="grid grid-cols-7 gap-1.5">
              {["M","T","W","T","F","S","S"].map((d, i) => {
                const today = i === 5;
                return (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className="w-full h-20 bg-[var(--muted)] rounded-md" />
                    <span className={`text-xs ${today ? "text-[var(--primary)] font-semibold" : "text-[var(--muted-foreground)]"}`}>{d}</span>
                    <span className="font-mono text-[10px] text-[var(--muted-foreground)]">—</span>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between mt-3 pt-3 border-t border-[var(--border)]">
              <div className="text-center">
                <p className="font-mono font-semibold text-[var(--muted-foreground)]">0h</p>
                <p className="text-xs text-[var(--muted-foreground)]">Total hours</p>
              </div>
              <div className="text-center">
                <p className="font-mono font-semibold text-[var(--muted-foreground)]">0</p>
                <p className="text-xs text-[var(--muted-foreground)]">Problems solved</p>
              </div>
              <div className="text-center">
                <p className="font-mono font-semibold text-[var(--muted-foreground)]">0 / 7</p>
                <p className="text-xs text-[var(--muted-foreground)]">Days active</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Roadmap progress */}
          <Card>
            <div className="flex items-center justify-between mb-3">
              <p className="font-display font-semibold text-[var(--foreground)]">Roadmap to 2030</p>
              <button onClick={() => onNavigate("roadmap")} className="text-xs text-[var(--primary)] hover:underline">View →</button>
            </div>
            <div className="space-y-2.5">
              {[
                { label: "Y1 · Java + DSA Foundation", pct: 0, status: "active" },
                { label: "Y2 · Intermediate + Projects", pct: 0, status: "upcoming" },
                { label: "Y3 · Advanced + Internship", pct: 0, status: "upcoming" },
                { label: "Y4 · Placement Ready", pct: 0, status: "upcoming" },
              ].map((r) => (
                <div key={r.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className={r.status === "active" ? "text-[var(--foreground)] font-medium" : "text-[var(--muted-foreground)] text-xs"}>{r.label}</span>
                    <span className="font-mono text-xs text-[var(--muted-foreground)]">{r.pct}%</span>
                  </div>
                  <ProgressBar value={r.pct} color="bg-[var(--primary)]" />
                </div>
              ))}
            </div>
          </Card>

          {/* Upcoming deadlines */}
          <Card>
            <p className="font-display font-semibold text-[var(--foreground)] mb-3">Upcoming</p>
            <div className="space-y-2.5">
              {upcomingDeadlines.map((d) => (
                <div key={d.name} className="flex items-center gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                    d.priority === "danger" ? "bg-red-500" :
                    d.priority === "warning" ? "bg-amber-500" :
                    d.priority === "info" ? "bg-blue-500" : "bg-[var(--border)]"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[var(--foreground)] truncate">{d.name}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">{d.due}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Career target */}
          <Card>
            <p className="font-display font-semibold text-[var(--foreground)] mb-3">Career Target</p>
            <div className="space-y-2.5 text-sm">
              {[
                { k: "Target companies", v: "Google · Meta · Amazon" },
                { k: "Target role", v: "SWE / Backend Engineer" },
                { k: "Target salary", v: "₹50–100L+ CTC" },
                { k: "Target year", v: "2030 placements" },
                { k: "Must-have", v: "DSA + Java + Projects" },
              ].map((item) => (
                <div key={item.k} className="flex justify-between gap-2">
                  <span className="text-[var(--muted-foreground)] flex-shrink-0">{item.k}</span>
                  <span className="text-[var(--foreground)] text-right text-xs font-medium">{item.v}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
