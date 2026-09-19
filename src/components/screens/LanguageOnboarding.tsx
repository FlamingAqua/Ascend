import { useState } from "react";
import { useAuth } from "../../services/AuthContext";
import type { PreferredLanguage } from "../../types";
import { Button, Card, PageLayout } from "../ui";
import { SUPPORTED_LANGUAGES } from "../../services/planningService";

const languageDescriptions: Record<PreferredLanguage, string> = {
  Java: "Strong typing, collections, and a common interview path.",
  Python: "Readable syntax with fast iteration for problem solving.",
  "C++": "STL, speed, and a popular competitive programming workflow.",
  C: "A fundamentals-first route through memory and data structures.",
  JavaScript: "Modern syntax and a practical web development pairing.",
  Go: "Simple concurrency-friendly syntax and backend fundamentals.",
  Rust: "Performance, ownership, and a rigorous systems approach.",
};

const languages = SUPPORTED_LANGUAGES.map((value) => ({ value, description: languageDescriptions[value] }));

export default function LanguageOnboarding() {
  const { profile, updateProfile } = useAuth();
  const [selected, setSelected] = useState<PreferredLanguage>(profile?.preferredLanguage || "Java");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function continueToApp() {
    setSaving(true);
    setError("");
    try {
      await updateProfile({ preferredLanguage: selected, onboardingCompleted: true });
    } catch (saveError) {
      console.error("Unable to save onboarding preferences.", saveError);
      setError("We could not save that preference. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <PageLayout>
      <div className="min-h-screen flex items-center justify-center py-8">
        <Card className="w-full max-w-2xl p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">Personalise your track</p>
          <h1 className="font-display text-3xl font-semibold text-[var(--foreground)] mt-2">Choose your DSA language</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-2">Ascend will tailor examples, practice prompts, and daily planning around this choice.</p>
          <div className="grid sm:grid-cols-2 gap-3 mt-6">
            {languages.map((language) => (
              <button key={language.value} type="button" onClick={() => setSelected(language.value)} className={`text-left rounded-xl border p-4 transition-colors ${selected === language.value ? "border-[var(--primary)] bg-[var(--secondary)]" : "border-[var(--border)] hover:bg-[var(--muted)]"}`}>
                <span className="font-display font-semibold text-[var(--foreground)]">{language.value}</span>
                <span className="block text-xs text-[var(--muted-foreground)] mt-1">{language.description}</span>
              </button>
            ))}
          </div>
          {error && <p className="text-sm text-red-600 mt-4">{error}</p>}
          <div className="flex justify-end mt-6">
            <Button onClick={continueToApp}>{saving ? "Saving..." : `Continue with ${selected}`}</Button>
          </div>
        </Card>
      </div>
    </PageLayout>
  );
}
