import { useMemo, useState } from "react";
import { Card, PageHeader, PageLayout, Button } from "../ui";
import { addDaysFromStudyStart, getStudyStartDate, getReadableStudyDate, setStudyStartDate } from "../../services/studyPlanService";

export default function StudyDateSetup() {
  const [date, setDate] = useState(getStudyStartDate());
  const visibleDate = useMemo(() => getReadableStudyDate(date), [date]);

  return (
    <PageLayout>
      <PageHeader title="Study Start Date" subtitle="Choose the first date your planning timeline starts from" />
      <Card>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-[var(--muted-foreground)]">Study start date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-2 w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)]" />
          </div>
          <div className="rounded-xl bg-[var(--muted)] p-4 text-sm text-[var(--foreground)]">
            <div className="font-medium">Selected plan date</div>
            <div className="font-display text-lg mt-1">{visibleDate}</div>
            <div className="text-[var(--muted-foreground)] mt-2">Calculated study timeline anchors are derived from this date.</div>
          </div>
          <Button onClick={() => { setStudyStartDate(date); }}>Save study start date</Button>
          <div className="text-xs text-[var(--muted-foreground)]">Timeline anchor: {addDaysFromStudyStart(7)}</div>
        </div>
      </Card>
    </PageLayout>
  );
}
