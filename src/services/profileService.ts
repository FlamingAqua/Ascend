import { collection, doc, getDoc, getDocs, query, setDoc, serverTimestamp, deleteDoc } from "firebase/firestore";
import type { UserProfile, UserRole } from "../types";
import { db } from "./firebase";
import { normalizePreferredLanguage } from "./planningService";

export async function createUserProfile(uid: string, profile: Pick<UserProfile, "name" | "email">): Promise<void> {
  if (!db) return;

  const docRef = doc(db, "users", uid);
  await setDoc(docRef, {
    uid,
    name: profile.name,
    email: profile.email,
    role: "user" as UserRole,
    isActive: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function ensureUserProfileFromFirebase(uid: string, name: string, email: string): Promise<void> {
  if (!db) return;

  const docRef = doc(db, "users", uid);
  const profile = await getDoc(docRef);
  if (!profile.exists()) {
    await setDoc(docRef, {
      uid,
      name,
      email,
      role: "user" as UserRole,
      isActive: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  if (!db) return null;

  const docRef = doc(db, "users", uid);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;

  const data = snap.data() as UserProfile;
  const preferredLanguage = normalizePreferredLanguage(data.preferredLanguage);
  const { preferredLanguage: _storedLanguage, ...profileData } = data;
  return { ...profileData, uid: snap.id, ...(preferredLanguage ? { preferredLanguage } : {}) };
}

export async function updateUserProfile(uid: string, updates: Partial<UserProfile>): Promise<void> {
  if (!db) return;

  const sanitizedUpdates = { ...updates };
  if ("preferredLanguage" in sanitizedUpdates) {
    const preferredLanguage = normalizePreferredLanguage(sanitizedUpdates.preferredLanguage);
    if (!preferredLanguage) {
      throw new Error("Unsupported programming language preference.");
    }
    sanitizedUpdates.preferredLanguage = preferredLanguage;
  }

  const docRef = doc(db, "users", uid);
  await setDoc(docRef, {
    uid,
    ...sanitizedUpdates,
    updatedAt: serverTimestamp(),
  }, { merge: true });
}

export async function getAllUsers(): Promise<UserProfile[]> {
  if (!db) return [];

  const q = query(collection(db, "users"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ ...(d.data() as UserProfile), uid: d.id }));
}

export async function deleteUserProfile(uid: string): Promise<void> {
  if (!db) return;

  await deleteDoc(doc(db, "users", uid));
}
