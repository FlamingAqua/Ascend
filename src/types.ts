export type UserRole = "admin" | "user";
export type PreferredLanguage = "Java" | "Python" | "C++" | "C" | "JavaScript" | "Go" | "Rust";

export interface UserProfile {
  uid: string;
  name: string;
  username?: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  academicYear?: number;
  semester?: number;
  targetYear?: number;
  dailyStudyHours?: number;
  weeklyDsaProblems?: number;
  preferredLanguage?: PreferredLanguage;
  onboardingCompleted?: boolean;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface AuthState {
  loading: boolean;
  authenticated: boolean;
  profile?: UserProfile | null;
  firebaseUser?: import("firebase/auth").User | null;
  role?: UserRole;
}
