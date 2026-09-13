export const STUDY_START_DATE_KEY = "ascend.studyStartDate";

export function getStudyStartDate(): string {
  if (typeof window === "undefined") return new Date().toISOString().slice(0, 10);
  return localStorage.getItem(STUDY_START_DATE_KEY) || new Date().toISOString().slice(0, 10);
}

export function setStudyStartDate(date: string): void {
  if (typeof window === "undefined") return;
  if (!date) return;
  localStorage.setItem(STUDY_START_DATE_KEY, date);
}

export function addDaysFromStudyStart(days: number): string {
  const base = getStudyStartDate();
  const d = new Date(base + "T00:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function getReadableStudyDate(date: string): string {
  const d = new Date(date + "T00:00:00");
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}
