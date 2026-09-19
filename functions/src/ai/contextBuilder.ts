/* eslint-disable max-len, require-jsdoc */
import {getFirestore} from "firebase-admin/firestore";
import type {AscendMentorContext, MentorProfileSnapshot, MentorStudyPlanSnapshot, MentorProgressSnapshot} from "./types";

const MAX_RECENT_CONTEXT_MESSAGES = 3;
const SUPPORTED_LANGUAGES = ["Java", "Python", "C++", "C", "JavaScript", "Go", "Rust"];

function normalizePreferredLanguage(value: unknown): string {
  if (typeof value !== "string") return "Java";
  const aliases: Record<string, string> = {"cpp": "C++", "c++": "C++", "js": "JavaScript", "javascript": "JavaScript", "golang": "Go"};
  const normalized = value.trim();
  if (SUPPORTED_LANGUAGES.includes(normalized)) return normalized;
  return aliases[normalized.toLowerCase()] || "Java";
}

export async function buildAscendMentorContext(uid: string, message: string): Promise<AscendMentorContext> {
  const db = getFirestore();

  const profileSnap = await db.collection("users").doc(uid).get();
  const profileData = profileSnap.exists ? profileSnap.data() || {} : {};

  const profile: MentorProfileSnapshot = {
    uid,
    name: profileData.name || "Learner",
    email: profileData.email || "unknown",
    role: profileData.role || "user",
    isActive: profileData.isActive,
    goals: Array.isArray(profileData.goals) ? profileData.goals : [`${normalizePreferredLanguage(profileData.preferredLanguage)} + DSA`, "FAANG preparation", "Career growth"],
    preferredLanguage: normalizePreferredLanguage(profileData.preferredLanguage),
    dailyStudyHours: typeof profileData.dailyStudyHours === "number" ? profileData.dailyStudyHours : 2,
    level: profileData.level || "Beginner",
    target: profileData.target || "Placement and interview readiness",
    weakTopics: Array.isArray(profileData.weakTopics) ? profileData.weakTopics : ["Arrays", "Trees", "Dynamic Programming"],
  };

  const studyPlanDoc = await db.collection("studyPlans").doc(uid).get();
  const studyPlanData = studyPlanDoc.exists ? studyPlanDoc.data() || {} : {};

  const studyPlan: MentorStudyPlanSnapshot = {
    title: studyPlanData.title,
    phase: studyPlanData.phase,
    currentGoal: studyPlanData.currentGoal,
    focusTopics: Array.isArray(studyPlanData.focusTopics) ? studyPlanData.focusTopics : [],
    startDate: studyPlanData.startDate,
    endDate: studyPlanData.endDate,
    tasksCompleted: typeof studyPlanData.tasksCompleted === "number" ? studyPlanData.tasksCompleted : 0,
    tasksTotal: typeof studyPlanData.tasksTotal === "number" ? studyPlanData.tasksTotal : 0,
  };

  const progressDoc = await db.collection("studyProgress").doc(uid).get();
  const progressData = progressDoc.exists ? progressDoc.data() || {} : {};

  const progress: MentorProgressSnapshot = {
    completedTasks: typeof progressData.completedTasks === "number" ? progressData.completedTasks : 0,
    totalTasks: typeof progressData.totalTasks === "number" ? progressData.totalTasks : 0,
    streakDays: typeof progressData.streakDays === "number" ? progressData.streakDays : 0,
    weeklyHours: typeof progressData.weeklyHours === "number" ? progressData.weeklyHours : 0,
    lastTopic: progressData.lastTopic,
    latestTopicProgress: typeof progressData.latestTopicProgress === "number" ? progressData.latestTopicProgress : 0,
  };

  const recentMessagesSnap = await db.collection("mentorChats")
    .where("uid", "==", uid)
    .orderBy("createdAt", "desc")
    .limit(MAX_RECENT_CONTEXT_MESSAGES)
    .get();

  const recentMentorMessages = recentMessagesSnap.docs
    .slice()
    .reverse()
    .map((docSnap) => {
      const data = docSnap.data();
      return {
        role: data.role === "assistant" ? "assistant" as const : "user" as const,
        content: typeof data.content === "string" ? data.content.slice(0, 1200) : "",
      };
    });

  return {
    messageLength: message.length,
    profile,
    studyPlan,
    progress,
    recentMentorMessages,
  };
}
