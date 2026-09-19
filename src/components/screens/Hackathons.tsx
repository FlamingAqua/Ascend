import { PageLayout, PageHeader, Badge, Button } from "../ui";
import { useAuth } from "../../services/AuthContext";
import { generateHackathonIdea, getPlanningContext } from "../../services/planningService";

const hackathons = [
  {
    name: "Hack the Mountains 4.0",
    organizer: "HTM Community",
    date: "Oct 4–6, 2026",
    deadline: "Sep 18, 2026",
    mode: "Online",
    status: "Registering",
    statusVariant: "warning" as const,
    prize: "₹1,50,000",
    theme: "AI/ML, Web3, Sustainability",
  },
  {
    name: "DevHacks 2026",
    organizer: "MLH",
    date: "Sep 20–21, 2026",
    deadline: "Sep 17, 2026",
    mode: "Online",
    status: "Registering",
    statusVariant: "warning" as const,
    prize: "$2,000",
    theme: "Open Innovation",
  },
  {
    name: "Smart India Hackathon 2026",
    organizer: "Ministry of Education",
    date: "Nov 28–30, 2026",
    deadline: "Oct 10, 2026",
    mode: "Offline",
    status: "Upcoming",
    statusVariant: "default" as const,
    prize: "₹1,00,000",
    theme: "National Problem Statements",
  },
  {
    name: "HackWithInfy 2026",
    organizer: "Infosys",
    date: "Dec 14–15, 2026",
    deadline: "Nov 1, 2026",
    mode: "Hybrid",
    status: "Upcoming",
    statusVariant: "default" as const,
    prize: "₹2,00,000 + PPO",
    theme: "Enterprise Tech",
  },
  {
    name: "Kavach Cybersecurity",
    organizer: "MHA India",
    date: "Jan 2027",
    deadline: "Dec 2026",
    mode: "Offline",
    status: "Upcoming",
    statusVariant: "default" as const,
    prize: "₹25,00,000",
    theme: "Cybersecurity",
  },
];

const tips = [
  "Pick one idea in the first 2 hours and don't change it",
  "Build a working demo first — polish only if you have 4+ hours left",
  "Make your GitHub repo clean and your README excellent",
  "Tell a story in the pitch: problem → solution → demo → impact",
  "Hackathons are how you build your first real project to show recruiters",
];

export default function Hackathons() {
  const { profile } = useAuth();
  return (
    <PageLayout>
      <PageHeader
        title="Hackathons"
        subtitle="0 participated · Every hackathon is a project + a story + a network"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {hackathons.map((h, index) => (
            <div key={h.name} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-display font-semibold text-[var(--foreground)]">{h.name}</h3>
                  <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{h.organizer}</p>
                </div>
                <Badge variant={h.statusVariant}>{h.status}</Badge>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                {[
                  { label: "Date", value: h.date },
                  { label: "Deadline", value: h.deadline },
                  { label: "Mode", value: h.mode },
                  { label: "Prize", value: h.prize },
                ].map((d) => (
                  <div key={d.label} className="bg-[var(--muted)] rounded-lg px-3 py-2">
                    <p className="text-xs text-[var(--muted-foreground)]">{d.label}</p>
                    <p className="text-xs font-medium text-[var(--foreground)] mt-0.5">{d.value}</p>
                  </div>
                ))}
              </div>
              <div className="bg-[var(--secondary)] rounded-lg px-3 py-2 mb-3 flex gap-2">
                <svg className="text-[var(--primary)] flex-shrink-0 mt-0.5" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
                <p className="text-xs text-[var(--foreground)]"><strong>Idea for you:</strong> {generateHackathonIdea(getPlanningContext(profile), index)}</p>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs text-[var(--muted-foreground)]">Theme: <span className="text-[var(--foreground)]">{h.theme}</span></span>
                {h.status === "Registering" && (
                  <Button size="sm" className="ml-auto">Register Now</Button>
                )}
                {h.status === "Upcoming" && (
                  <Button size="sm" variant="secondary" className="ml-auto">Set Reminder</Button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-5">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
            <p className="font-display font-semibold text-[var(--foreground)] mb-4">Your Record</p>
            <div className="space-y-3">
              {[
                { k: "Participated", v: "0" },
                { k: "Won / Placed", v: "0" },
                { k: "Projects built", v: "0" },
                { k: "Upcoming", v: "2" },
              ].map((item) => (
                <div key={item.k} className="flex justify-between">
                  <span className="text-sm text-[var(--muted-foreground)]">{item.k}</span>
                  <span className="font-mono font-semibold text-[var(--foreground)]">{item.v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
            <p className="font-display font-semibold text-[var(--foreground)] mb-3">Winning Strategy</p>
            <div className="space-y-2.5">
              {tips.map((tip, i) => (
                <div key={i} className="flex gap-2.5">
                  <span className="font-mono text-xs text-[var(--primary)] mt-0.5 flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-xs text-[var(--muted-foreground)] leading-snug">{tip}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
            <div className="flex gap-2 mb-2">
              <svg className="text-amber-600 flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <p className="text-sm font-medium text-amber-700 dark:text-amber-400">Register this week</p>
            </div>
            <p className="text-xs text-amber-600 dark:text-amber-500">
              DevHacks deadline is Sep 17 and HTM is Sep 18. Both are beginner-friendly and online. Register now — worst case you don't go.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
