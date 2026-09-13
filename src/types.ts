export type UserRole = "admin" | "user";

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
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
