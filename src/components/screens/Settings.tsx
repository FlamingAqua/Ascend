import { useEffect, useState } from "react";
import { PageLayout, PageHeader, Card, Button } from "../ui";
import { useAuth } from "../../services/AuthContext";
import { getStudyStartDate, setStudyStartDate } from "../../services/studyPlanService";
import type { PreferredLanguage } from "../../types";
import { SUPPORTED_LANGUAGES } from "../../services/planningService";

export default function Settings({ dark, onToggleDark }: { dark: boolean; onToggleDark: () => void }) {
  const { profile, updateProfile } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [revisionReminders, setRevisionReminders] = useState(true);
  const [dailyGoal, setDailyGoal] = useState(6);
  const [weeklyDSA, setWeeklyDSA] = useState(10);
  const [name, setName] = useState(profile?.name || "Ascend Learner");
  const [academicYear, setAcademicYear] = useState(profile?.academicYear || 1);
  const [semester, setSemester] = useState(profile?.semester || 1);
  const [targetYear, setTargetYear] = useState(profile?.targetYear || new Date().getFullYear() + 4);
  const [preferredLanguage, setPreferredLanguage] = useState<PreferredLanguage>(profile?.preferredLanguage || "Java");
  const [studyStart, setStudyStart] = useState(getStudyStartDate());
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    if (!profile) return;
    setName(profile.name || "Ascend Learner");
    setAcademicYear(profile.academicYear || 1);
    setSemester(profile.semester || 1);
    setTargetYear(profile.targetYear || new Date().getFullYear() + 4);
    setPreferredLanguage(profile.preferredLanguage || "Java");
  }, [profile]);

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <button onClick={onChange} className={`relative w-10 h-5 rounded-full transition-colors ${value ? "bg-[var(--primary)]" : "bg-[var(--muted)]"}`}>
      <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${value ? "translate-x-5" : ""}`} />
    </button>
  );

  return (
    <PageLayout>
      <PageHeader title="Settings" subtitle="Configure your Ascend workspace" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          {/* Profile */}
          <Card>
            <p className="font-display font-semibold text-[var(--foreground)] mb-4">Profile</p>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-xl font-semibold">{(name || "A").split(/\s+/).slice(0,2).map((part) => part[0]?.toUpperCase()).join("") || "A"}</div>
              <div>
                <p className="font-semibold text-[var(--foreground)]">{name}</p>
                <p className="text-sm text-[var(--muted-foreground)]">Year {academicYear} · Semester {semester} · Target: {targetYear}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wide block mb-1.5">Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm outline-none focus:border-[var(--primary)] transition-colors" />
              </div>
              <div>
                <label className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wide block mb-1.5">Study start date</label>
                <input type="date" value={studyStart} onChange={(e) => setStudyStart(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm outline-none focus:border-[var(--primary)] transition-colors" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wide block mb-1.5">Year</label>
                  <select value={academicYear} onChange={(e) => setAcademicYear(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm outline-none focus:border-[var(--primary)]">
                    {[1, 2, 3, 4].map((year) => <option key={year} value={year}>Year {year}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wide block mb-1.5">Semester</label>
                  <select value={semester} onChange={(e) => setSemester(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm outline-none focus:border-[var(--primary)]">
                    <option value={1}>Semester 1</option><option value={2}>Semester 2</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wide block mb-1.5">Target Year</label>
                  <select value={targetYear} onChange={(e) => setTargetYear(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm outline-none">
                    {[...Array(7)].map((_, index) => {
                      const year = new Date().getFullYear() + index;
                      return <option key={year} value={year}>{year}</option>;
                    })}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wide block mb-1.5">DSA language</label>
                <select value={preferredLanguage} onChange={(e) => setPreferredLanguage(e.target.value as PreferredLanguage)} className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm outline-none focus:border-[var(--primary)]">
                  {SUPPORTED_LANGUAGES.map((language) => <option key={language} value={language}>{language}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-3">
                <Button size="sm" onClick={async () => {
                  setSaveState("saving");
                  try {
                    await updateProfile({ name: name.trim() || profile?.name || "Ascend Learner", academicYear, semester, targetYear, preferredLanguage });
                    setStudyStartDate(studyStart);
                    setSaveState("saved");
                  } catch (error) {
                    console.error("Unable to save profile.", error);
                    setSaveState("error");
                  }
                }}>{saveState === "saving" ? "Saving..." : "Save Profile"}</Button>
                {saveState === "saved" && <span className="text-xs text-emerald-600">Profile saved</span>}
                {saveState === "error" && <span className="text-xs text-red-600">Could not save profile</span>}
              </div>
            </div>
          </Card>

          {/* Goals */}
          <Card>
            <p className="font-display font-semibold text-[var(--foreground)] mb-4">Study Goals</p>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wide">Daily Study Goal</label>
                  <span className="font-mono text-sm text-[var(--foreground)]">{dailyGoal}h / day</span>
                </div>
                <input type="range" min={2} max={12} value={dailyGoal} onChange={(e) => setDailyGoal(Number(e.target.value))} className="w-full accent-indigo-600" />
                <p className="text-xs text-[var(--muted-foreground)] mt-1">{dailyGoal >= 6 ? "🔥 Serious grind mode — FAANG-track pace" : dailyGoal >= 4 ? "Good — sustainable long-term" : "Low — increase gradually"}</p>
              </div>
              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wide">Weekly LeetCode Target</label>
                  <span className="font-mono text-sm text-[var(--foreground)]">{weeklyDSA} problems</span>
                </div>
                <input type="range" min={3} max={30} value={weeklyDSA} onChange={(e) => setWeeklyDSA(Number(e.target.value))} className="w-full accent-indigo-600" />
                <p className="text-xs text-[var(--muted-foreground)] mt-1">{weeklyDSA >= 14 ? "🔥 2+/day — FAANG pace" : weeklyDSA >= 7 ? "1/day — solid for Year 1" : "< 1/day — too slow, increase"}</p>
              </div>
            </div>
          </Card>

          {/* Notifications */}
          <Card>
            <p className="font-display font-semibold text-[var(--foreground)] mb-4">Notifications</p>
            <div className="space-y-4">
              {[
                { label: "Daily study reminders", sub: "Notify at your study start time", value: notifications, onChange: () => setNotifications(!notifications) },
                { label: "Revision due alerts", sub: "Spaced repetition items due today", value: revisionReminders, onChange: () => setRevisionReminders(!revisionReminders) },
                { label: "Streak alerts", sub: "Warn if no session logged by 8 PM", value: true, onChange: () => {} },
                { label: "Contest reminders", sub: "LeetCode Weekly Contest every Sunday", value: true, onChange: () => {} },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[var(--foreground)]">{item.label}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">{item.sub}</p>
                  </div>
                  <Toggle value={item.value} onChange={item.onChange} />
                </div>
              ))}
            </div>
          </Card>

          {/* Appearance */}
          <Card>
            <p className="font-display font-semibold text-[var(--foreground)] mb-4">Appearance</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--foreground)]">Dark mode</p>
                <p className="text-xs text-[var(--muted-foreground)]">Toggle dark/light theme</p>
              </div>
              <Toggle value={dark} onChange={onToggleDark} />
            </div>
          </Card>
        </div>

        <div className="space-y-5">
          <Card>
            <p className="font-display font-semibold text-[var(--foreground)] mb-3">Mission 2030</p>
            <div className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg p-4 text-white mb-3">
              <p className="text-xs opacity-80 mb-1">Target</p>
              <p className="font-display font-semibold">FAANG / ₹1Cr+ CTC</p>
              <p className="text-xs opacity-70 mt-1">1,461 days remaining</p>
            </div>
            <div className="space-y-2 text-sm">
              {[
                { k: "Primary skill", v: `${preferredLanguage} + DSA` },
                { k: "Secondary", v: preferredLanguage === "Java" ? "Spring Boot, SQL, React" : `${preferredLanguage} tooling, SQL, React` },
                { k: "Placement year", v: "2030" },
                { k: "LeetCode target", v: "600+ (100 Hard)" },
              ].map((item) => (
                <div key={item.k} className="flex justify-between">
                  <span className="text-[var(--muted-foreground)]">{item.k}</span>
                  <span className="text-[var(--foreground)] text-xs font-medium text-right">{item.v}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <p className="font-display font-semibold text-[var(--foreground)] mb-3">Your Stats</p>
            <div className="space-y-2 text-sm">
              {[
                { k: "Study hours", v: "0h" },
                { k: "LeetCode solved", v: "0" },
                { k: "Streak", v: "0 days" },
                { k: "Member since", v: "Sep 2026" },
              ].map((item) => (
                <div key={item.k} className="flex justify-between">
                  <span className="text-[var(--muted-foreground)]">{item.k}</span>
                  <span className="font-mono text-[var(--foreground)]">{item.v}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
