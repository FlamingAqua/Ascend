import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { auth, db, googleProvider } from "./firebase";
import { createUserProfile, ensureUserProfileFromFirebase, getUserProfile, updateUserProfile } from "./profileService";
import type { UserProfile, UserRole } from "../types";

interface AuthContextValue {
  loading: boolean;
  authenticated: boolean;
  firebaseUser: User | null;
  profile: UserProfile | null;
  role: UserRole | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        let nextProfile = await getUserProfile(user.uid);
        if (!nextProfile) {
          await ensureUserProfileFromFirebase(user.uid, user.displayName || "Ascend User", user.email || "");
          nextProfile = await getUserProfile(user.uid);
        }
        setProfile(nextProfile);
      } catch (error) {
        setProfile(null);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!auth) throw new Error("Firebase authentication is not configured.");
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (name: string, email: string, password: string) => {
    if (!auth) throw new Error("Firebase authentication is not configured.");
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await createUserProfile(result.user.uid, { name, email });
    const nextProfile = await getUserProfile(result.user.uid);
    setProfile(nextProfile);
  };

  const signInWithGoogle = async () => {
    if (!auth || !googleProvider) throw new Error("Firebase authentication is not configured.");
    const result = await signInWithPopup(auth, googleProvider);
    await ensureUserProfileFromFirebase(result.user.uid, result.user.displayName || "Ascend User", result.user.email || "");
    const userProfile = await getUserProfile(result.user.uid);
    setProfile(userProfile);
  };

  const logOut = async () => {
    if (!auth) return;
    await firebaseSignOut(auth);
    setProfile(null);
    setFirebaseUser(null);
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!firebaseUser) return;
    if (db) {
      await updateUserProfile(firebaseUser.uid, updates);
      const next = await getUserProfile(firebaseUser.uid);
      setProfile(next);
      return;
    }
    setProfile((current) => current ? { ...current, ...updates } : current);
  };

  const value = useMemo<AuthContextValue>(() => ({
    loading,
    authenticated: Boolean(firebaseUser),
    firebaseUser,
    profile,
    role: profile?.role ?? null,
    signIn,
    signUp,
    signInWithGoogle,
    logOut,
    updateProfile,
  }), [firebaseUser, profile, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
