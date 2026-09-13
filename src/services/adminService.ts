import { collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, serverTimestamp, where } from "firebase/firestore";
import { db } from "./firebase";
import type { UserProfile, UserRole } from "../types";

export async function listUsers(): Promise<UserProfile[]> {
  if (!db) return [];
  const q = query(collection(db, "users"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ ...(d.data() as UserProfile), uid: d.id }));
}

export async function getAdminUser(uid: string): Promise<UserProfile | null> {
  if (!db) return null;
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { ...(snap.data() as UserProfile), uid: snap.id };
}

export async function updateAdminUser(uid: string, updates: Partial<UserProfile>) {
  if (!db) return;
  const ref = doc(db, "users", uid);
  await updateDoc(ref, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

export async function deactivateUser(uid: string) {
  if (!db) return;
  await updateAdminUser(uid, { isActive: false });
}

export async function deleteUserAndProfile(uid: string) {
  if (!db) return;
  await deleteDoc(doc(db, "users", uid));
}

export function summarizeUsers(users: UserProfile[]) {
  return {
    total: users.length,
    active: users.filter((u) => u.isActive).length,
    inactive: users.filter((u) => !u.isActive).length,
    admins: users.filter((u) => u.role === "admin").length,
    usersOnly: users.filter((u) => u.role === "user").length,
  };
}
