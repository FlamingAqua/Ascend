import type { ReactNode } from "react";

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-[var(--foreground)] tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-[var(--muted-foreground)] mt-0.5">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 ${className}`}>
      {children}
    </div>
  );
}

export function StatCard({
  label,
  value,
  sub,
  accent,
  icon,
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
  icon?: ReactNode;
}) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wide">{label}</p>
          <p className={`font-display text-2xl font-semibold mt-1 ${accent || "text-[var(--foreground)]"}`}>{value}</p>
          {sub && <p className="text-xs text-[var(--muted-foreground)] mt-1">{sub}</p>}
        </div>
        {icon && <div className="text-[var(--muted-foreground)]">{icon}</div>}
      </div>
    </Card>
  );
}

export function ProgressBar({ value, max = 100, color = "bg-[var(--primary)]", height = "h-1.5" }: {
  value: number; max?: number; color?: string; height?: string;
}) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className={`w-full bg-[var(--muted)] rounded-full ${height} overflow-hidden`}>
      <div
        className={`${color} ${height} rounded-full transition-all duration-500`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function Badge({ children, variant = "default" }: { children: ReactNode; variant?: "default" | "success" | "warning" | "danger" | "info" }) {
  const styles = {
    default: "bg-[var(--secondary)] text-[var(--secondary-foreground)]",
    success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    warning: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    danger: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    info: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${styles[variant]}`}>
      {children}
    </span>
  );
}

export function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
  className?: string;
}) {
  const base = "inline-flex items-center gap-2 font-medium rounded-lg transition-all duration-150 cursor-pointer";
  const sizes = { sm: "px-3 py-1.5 text-xs", md: "px-4 py-2 text-sm" };
  const variants = {
    primary: "bg-[var(--primary)] text-white hover:opacity-90 active:scale-[0.98]",
    secondary: "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--muted)]",
    ghost: "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]",
  };
  return (
    <button onClick={onClick} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}

export function PageLayout({ children }: { children: ReactNode }) {
  return <div className="p-6 lg:p-8 max-w-6xl mx-auto">{children}</div>;
}
