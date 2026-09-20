import { useEffect, useState } from "react";
import { Card, PageHeader, PageLayout, Badge, ProgressBar, Button } from "../ui";
import { getAdminUser } from "../../services/adminService";
import { useAuth } from "../../services/AuthContext";
import type { UserProfile } from "../../types";

export default function UserDetail({ uid, onBack }: { uid: string; onBack?: () => void }) {
  const { logOut } = useAuth();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [logoutError, setLogoutError] = useState("");

  async function handleLogout() {
    setLogoutError("");
    try {
      await logOut();
    } catch (error) {
      console.error("Unable to sign out.", error);
      setLogoutError("Sign out failed. Please try again.");
    }
  }

  useEffect(() => {
    if (!uid) return;
    getAdminUser(uid).then((next) => {
      setUser(next);
      setLoading(false);
    });
  }, [uid]);

  if (loading) return <PageLayout><PageHeader title="Loading user" subtitle="Fetching activity and profile" /></PageLayout>;
  if (!user) return <PageLayout><PageHeader title="User not found" subtitle="The requested profile does not exist" /></PageLayout>;

  return (
    <PageLayout>
      <PageHeader
        title={user.name}
        subtitle="User details and progress"
        action={
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={onBack}>Back to admin</Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>Log out</Button>
          </div>
        }
      />
      {logoutError && <p role="alert" className="mb-4 text-sm text-red-600 dark:text-red-400">{logoutError}</p>}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <span className="font-display font-semibold text-[var(--foreground)]">User information</span>
            <Badge variant={user.role === "admin" ? "info" : "default"}>{user.role}</Badge>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Name</span><span>{user.name}</span></div>
            <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Email</span><span>{user.email}</span></div>
            <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Status</span><span>{user.isActive ? "active" : "inactive"}</span></div>
            <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Role</span><span>{user.role}</span></div>
          </div>
        </Card>

        <Card>
          <div className="mb-4 font-display font-semibold text-[var(--foreground)]">Progress</div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm"><span className="text-[var(--muted-foreground)]">Overall progress</span><span>0%</span></div>
              <ProgressBar value={0} height="h-2" />
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-[var(--muted)] rounded-lg p-3">Completed tasks: 0</div>
              <div className="bg-[var(--muted)] rounded-lg p-3">Pending tasks: 0</div>
            </div>
            <div className="text-xs text-[var(--muted-foreground)]">Recent activity: No activity yet.</div>
          </div>
        </Card>
      </div>
    </PageLayout>
  );
}
