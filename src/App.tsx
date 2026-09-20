import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/screens/Dashboard";
import Today from "./components/screens/Today";
import Roadmap from "./components/screens/Roadmap";
import DSA from "./components/screens/DSA";
import Skills from "./components/screens/Skills";
import Projects from "./components/screens/Projects";
import Analytics from "./components/screens/Analytics";
import AIMentor from "./components/screens/AIMentor";
import Tasks from "./components/screens/Tasks";
import Revision from "./components/screens/Revision";
import Hackathons from "./components/screens/Hackathons";
import Settings from "./components/screens/Settings";
import AuthScreen from "./components/screens/AuthScreen";
import AdminDashboard from "./components/screens/AdminDashboard";
import UserDetail from "./components/screens/UserDetail";
import LanguageOnboarding from "./components/screens/LanguageOnboarding";
import BrandLogo from "./components/BrandLogo";
import { AuthProvider, useAuth } from "./services/AuthContext";
import { shouldShowLanguageOnboarding } from "./services/planningService";

export type Screen =
  | "dashboard"
  | "today"
  | "roadmap"
  | "skills"
  | "dsa"
  | "tasks"
  | "revision"
  | "projects"
  | "hackathons"
  | "analytics"
  | "ai-mentor"
  | "settings"
  | "admin-dashboard"
  | "admin-user-detail";

function AppContent() {
  const { loading, authenticated, profile } = useAuth();
  const [screen, setScreen] = useState<Screen>("dashboard");
  const [selectedUserUid, setSelectedUserUid] = useState<string>("");
  const [dark, setDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!authenticated) {
      setScreen("dashboard");
      setSelectedUserUid("");
      setSidebarOpen(false);
    }
  }, [authenticated]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-[var(--foreground)]">Loading Ascend...</div>;
  }

  if (!authenticated) {
    return <AuthScreen />;
  }

  if (profile?.role === "admin") {
    if (screen === "admin-user-detail") {
      return <UserDetail uid={selectedUserUid} onBack={() => setScreen("admin-dashboard")} />;
    }

    return <AdminDashboard onSelectUser={(uid) => { setSelectedUserUid(uid); setScreen("admin-user-detail"); }} />;
  }

  if (profile && shouldShowLanguageOnboarding(profile)) {
    return <LanguageOnboarding onComplete={() => setScreen("settings")} />;
  }

  return (
    <div className={dark ? "dark" : ""}>
      <div className="flex h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
        <Sidebar
          current={screen}
          onNavigate={(s) => { setScreen(s); setSidebarOpen(false); }}
          dark={dark}
          onToggleDark={() => setDark(!dark)}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="lg:hidden flex items-center justify-between px-4 h-14 border-b border-[var(--border)] bg-[var(--card)]">
            <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-md hover:bg-[var(--muted)] transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
            <BrandLogo variant="wordmark" className="w-[132px]" />
            <div className="w-8"/>
          </div>
          <main className="flex-1 overflow-y-auto">
            {screen === "dashboard" && <Dashboard onNavigate={setScreen} />}
            {screen === "today" && <Today />}
            {screen === "roadmap" && <Roadmap />}
            {screen === "dsa" && <DSA />}
            {screen === "skills" && <Skills />}
            {screen === "tasks" && <Tasks />}
            {screen === "revision" && <Revision />}
            {screen === "projects" && <Projects />}
            {screen === "hackathons" && <Hackathons />}
            {screen === "analytics" && <Analytics />}
            {screen === "ai-mentor" && <AIMentor />}
            {screen === "settings" && <Settings dark={dark} onToggleDark={() => setDark(!dark)} />}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
