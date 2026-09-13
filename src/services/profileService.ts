import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, serverTimestamp, deleteDoc } from "firebase/firestore";
import type { UserProfile, UserRole } from "../types";
import { db } from "./firebase";

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

  return { ...(snap.data() as UserProfile), uid: snap.id };
}

export async function updateUserProfile(uid: string, updates: Partial<UserProfile>): Promise<void> {
  if (!db) return;

  const docRef = doc(db, "users", uid);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
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
