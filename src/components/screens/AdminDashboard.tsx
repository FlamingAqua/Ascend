import { useEffect, useMemo, useState } from "react";
import { Card, PageHeader, PageLayout, Badge, Button, StatCard } from "../ui";
import { listUsers, summarizeUsers } from "../../services/adminService";
import { useAuth } from "../../services/AuthContext";
import type { UserProfile } from "../../types";

export default function AdminDashboard({ onSelectUser }: { onSelectUser?: (uid: string) => void }) {
  const { logOut } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listUsers().then((items) => {
      setUsers(items);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => users.filter((u) => {
    const haystack = `${u.name} ${u.email} ${u.role}`.toLowerCase();
    return haystack.includes(search.toLowerCase());
  }), [users, search]);

  const summary = summarizeUsers(users);

  return (
    <PageLayout>
      <section className="admin-hero mb-6">
        <div className="admin-hero-content">
          <div>
            <span className="admin-kicker">Ascend control room</span>
            <PageHeader
              title="Admin Dashboard"
              subtitle="User operations, profiles, role management, and Ascend activity overview"
              action={
                <div className="flex items-center gap-2">
                  <Button variant="secondary" size="sm">Export</Button>
                  <Button variant="ghost" size="sm" onClick={() => logOut()}>Log out</Button>
                </div>
              }
            />
          </div>
          <div className="admin-hero-score">
            <span className="admin-live-dot" />
            <span className="admin-live-text">Live</span>
            <span className="admin-score-value">{summary.total}</span>
            <span className="admin-score-label">users</span>
          </div>
        </div>
      </section>

      {loading ? <div className="text-sm text-[var(--muted-foreground)]">Loading admin data...</div> : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <StatCard label="Total users" value={summary.total} sub="All accounts" accent="text-[var(--foreground)]" />
            <StatCard label="Active" value={summary.active} sub="Enabled" accent="text-emerald-500" />
            <StatCard label="Inactive" value={summary.inactive} sub="Disabled" accent="text-amber-500" />
            <StatCard label="Admins" value={summary.admins} sub="Role holders" accent="text-indigo-500" />
          </div>

          <Card className="mb-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <div>
                <h3 className="font-display text-xl font-semibold">User Management</h3>
                <p className="text-sm text-[var(--muted-foreground)]">Search by name, email, or role.</p>
              </div>
              <input value={search} onChange={(e) => setSearch(e.target.value)} className="w-full md:w-80 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2" placeholder="Search users" />
            </div>
          </Card>

          <Card>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left border-b border-[var(--border)]">
                    <th className="py-3 px-3 text-xs uppercase tracking-wide text-[var(--muted-foreground)]">Name</th>
                    <th className="py-3 px-3 text-xs uppercase tracking-wide text-[var(--muted-foreground)]">Email</th>
                    <th className="py-3 px-3 text-xs uppercase tracking-wide text-[var(--muted-foreground)]">Role</th>
                    <th className="py-3 px-3 text-xs uppercase tracking-wide text-[var(--muted-foreground)]">Status</th>
                    <th className="py-3 px-3 text-xs uppercase tracking-wide text-[var(--muted-foreground)]">Progress</th>
                    <th className="py-3 px-3 text-xs uppercase tracking-wide text-[var(--muted-foreground)]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((user) => (
                    <tr key={user.uid} className="border-b border-[var(--border)]">
                      <td className="py-3 px-3 font-medium">{user.name}</td>
                      <td className="py-3 px-3 text-[var(--muted-foreground)]">{user.email}</td>
                      <td className="py-3 px-3"><Badge variant={user.role === "admin" ? "info" : "default"}>{user.role}</Badge></td>
                      <td className="py-3 px-3"><Badge variant={user.isActive ? "success" : "danger"}>{user.isActive ? "active" : "inactive"}</Badge></td>
                      <td className="py-3 px-3">0%</td>
                      <td className="py-3 px-3">
                        <Button variant="ghost" size="sm" onClick={() => onSelectUser?.(user.uid)}>View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </PageLayout>
  );
}
