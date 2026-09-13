import { useState } from "react";
import { useAuth } from "../../services/AuthContext";
import { PageLayout, Card, Button } from "../ui";

export default function AuthScreen() {
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit() {
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    if (mode === "signup" && !name.trim()) {
      setError("Name is required for the Ascend profile.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "signup") {
        await signUp(name.trim(), email.trim(), password);
      } else {
        await signIn(email.trim(), password);
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : "Authentication failed";
      setError(message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
  }

  async function googleLogin() {
    setError("");
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (e) {
      const message = e instanceof Error ? e.message : "Google sign-in failed";
      setError(message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageLayout>
      <div className="auth-stage min-h-screen flex items-center justify-center px-4 py-8">
        <div className="auth-glow auth-glow-one" />
        <div className="auth-glow auth-glow-two" />

        <div className="w-full max-w-5xl grid lg:grid-cols-[1fr_420px] gap-8 items-center">
          <section className="auth-brand-panel hidden lg:block">
            <div className="auth-brand-top">
              <span className="auth-brand-chip">ASCEND</span>
              <span className="auth-brand-dot" />
              <span className="auth-brand-chip muted">Learning OS</span>
            </div>
            <div className="auth-brand-content">
              <div className="auth-brand-title">
                <span className="auth-brand-kicker">Your study orbit</span>
                <h1>Plan smarter. Learn faster. Rise higher.</h1>
              </div>
              <div className="auth-brand-grid">
                <div>
                  <span className="auth-stat-label">Today’s momentum</span>
                  <span className="auth-stat-value">04</span>
                  <span className="auth-stat-text">guided sessions</span>
                </div>
                <div>
                  <span className="auth-stat-label">Focus path</span>
                  <span className="auth-stat-value">DSA</span>
                  <span className="auth-stat-text">+ Java OOP</span>
                </div>
              </div>
              <div className="auth-milestones">
                <span><i className="dot" />Roadmap aligned</span>
                <span><i className="dot" />Skill streaks active</span>
                <span><i className="dot" />Interview readiness</span>
              </div>
            </div>
          </section>

          <section className="w-full max-w-md justify-self-center">
            <div className="text-center mb-8">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[2rem] bg-[var(--primary)] text-white shadow-2xl ring-4 ring-white/50">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="18 15 12 9 6 15" />
                </svg>
              </div>
              <h1 className="font-display text-4xl font-semibold tracking-tight mt-4 text-[var(--foreground)]">Ascend</h1>
              <p className="text-[var(--muted-foreground)] mt-2">Learning OS</p>
            </div>

            <Card className="auth-card shadow-xl">
              <div className="flex items-center justify-center gap-2 mb-5">
                <Button variant={mode === "login" ? "primary" : "secondary"} size="sm" onClick={() => setMode("login")}>Login</Button>
                <Button variant={mode === "signup" ? "primary" : "secondary"} size="sm" onClick={() => setMode("signup")}>Create account</Button>
              </div>

              {error && <div className="mb-4 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

              {mode === "signup" && (
                <div className="mb-4">
                  <label className="text-xs font-medium uppercase tracking-wide text-[var(--muted-foreground)]">Name</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2" placeholder="Your name" />
                </div>
              )}

              <div className="mb-4">
                <label className="text-xs font-medium uppercase tracking-wide text-[var(--muted-foreground)]">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2" placeholder="you@example.com" />
              </div>

              <div className="mb-4">
                <label className="text-xs font-medium uppercase tracking-wide text-[var(--muted-foreground)]">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2" placeholder="••••••••" />
              </div>

              <div className="space-y-3">
                <Button className="w-full justify-center" onClick={submit}>
                  {loading ? "Please wait..." : (mode === "login" ? "Login to Ascend" : "Create account")}
                </Button>
                <Button className="w-full justify-center" variant="secondary" onClick={googleLogin}>
                  Continue with Google
                </Button>
              </div>
            </Card>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
