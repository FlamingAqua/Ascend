import { addDoc, collection, getDocs, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import type { UserProfile } from "../types";
import { db, functions } from "./firebase";

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id?: string;
  role: ChatRole;
  content: string;
  time: string;
  uid?: string;
}

export interface MentorChatResponse {
  reply: string;
  fallback: boolean;
  model: string;
}

export interface ChatbotContext {
  name?: string;
  email?: string;
  role?: string;
  goals: string[];
  preferredLanguage: string;
  dailyStudyHours: number;
  level: string;
  target: string;
  weakTopics: string[];
}

const CHAT_HISTORY_COLLECTION = "mentorChats";

export function makeChatbotContext(profile?: UserProfile | null): ChatbotContext {
  const name = profile?.name || "Learner";
  const role = profile?.role || "user";

  return {
    name,
    email: profile?.email,
    role,
    goals: ["Java + DSA", "FAANG preparation", "Career growth"],
    preferredLanguage: "Java",
    dailyStudyHours: 2,
    level: "Beginner",
    target: "Placement and interview readiness",
    weakTopics: ["Arrays", "Trees", "Dynamic Programming"],
  };
}

function normalizeQuestion(question: string): string {
  return question.trim().toLowerCase();
}

export async function askMentor(question: string, profile?: UserProfile | null): Promise<MentorChatResponse> {
  if (!functions) {
    return {
      reply: generateMentorReply(question, profile),
      fallback: true,
      model: "fallback",
    };
  }

  try {
    const askMentorCallable = httpsCallable<{ message: string }, MentorChatResponse>(functions, "askMentor");
    const result = await askMentorCallable({ message: question.trim() });
    return result.data;
  } catch (error) {
    console.error("Unable to generate a mentor reply through Firebase Functions.", error);
    return {
      reply: generateMentorReply(question, profile),
      fallback: true,
      model: "fallback",
    };
  }
}

export async function saveChatHistory(uid: string, role: ChatRole, content: string): Promise<void> {
  if (!db) return;

  await addDoc(collection(db, CHAT_HISTORY_COLLECTION), {
    uid,
    role,
    content,
    createdAt: serverTimestamp(),
  });
}

export async function loadChatHistory(uid: string): Promise<ChatMessage[]> {
  if (!db) return [];

  const q = query(
    collection(db, CHAT_HISTORY_COLLECTION),
    where("uid", "==", uid),
    orderBy("createdAt", "asc"),
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      role: data.role,
      content: data.content,
      time: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      uid: data.uid,
    };
  });
}

export function generateMentorReply(question: string, profile?: UserProfile | null): string {
  const context = makeChatbotContext(profile);
  const q = normalizeQuestion(question);

  if (q.includes("today") || q.includes("study today") || q.includes("plan")) {
    return `Hi ${context.name}, here is your personalized study plan for today.\n\nFocus on Java fundamentals and one DSA pattern first. Spend ${Math.min(context.dailyStudyHours, 2)} hours in a deep work block: 45 minutes on Java OOP or collections, 45 minutes on DSA practice, and 30 minutes on revision.\n\nSuggested task: solve one medium-level Java + DSA problem and write a short explanation of the approach.\n\nStudy schedule: Morning — Java/OOP review, Midday — DSA problem, Evening — revise mistakes and update your task list.\n\nNext question: Do you want me to create a full week plan from your current roadmap?`;
  }

  if (q.includes("java") || q.includes("python") || q.includes("language")) {
    return `For ${context.name}, Java is the right language for your DSA and placement track. Java gives strong typing, a mature collection framework, and better alignment with backend interview patterns.\n\nUse Java for your problem solving. You can learn Python later if you need scripting or AI work.\n\nSuggested task: solve one arrays or hash map problem in Java and write the complexity analysis.\n\nSchedule: 30 minutes Java collections review, 60 minutes DSA problem practice, 30 minutes notes and mistakes review.`;
  }

  if (q.includes("dsa") || q.includes("graph") || q.includes("tree") || q.includes("problem")) {
    return `Your learning path should be topic ordered and consistent. Start with arrays, hashing, strings, stacks, queues, binary search, linked lists, trees, graphs, and then dynamic programming.\n\nRight now your weak topics are ${context.weakTopics.join(", ")}. Build a daily loop around one concept and two problems.\n\nSuggested task: solve one problem from your current weak topic and write down the pattern used.\n\nSchedule: 45 minutes explaining the concept, 60 minutes solving a problem, 30 minutes reviewing another solved example.`;
  }

  if (q.includes("roadmap") || q.includes("faang") || q.includes("career") || q.includes("hire") || q.includes("placement")) {
    return `Your roadmap should combine Java, DSA, fundamentals, project work, and interview strategy. Build a strong base in Java OOP, collections, strings, arrays, trees, graphs, SQL, and REST APIs.\n\nA realistic plan is to spend 2 hours a day on Java + DSA, keep one project moving, and revise every Sunday.\n\nSuggested task: define one project milestone this week and connect it to a job-ready backend or DSA project.\n\nSchedule: Monday to Friday practice DSA, weekend review + project work.`;
  }

  if (q.includes("project") || q.includes("portfolio") || q.includes("github")) {
    return `A strong project should demonstrate backend skills and Java depth. Choose one project that solves a real problem and shows API design, database structure, and clean code.\n\nSuggested task: pick a project that uses Java, CRUD operations, and a frontend or API interface. Write one GitHub README explaining the architecture.\n\nSchedule: 60 minutes on backend structure, 45 minutes on UI or API flow, 30 minutes on data modeling.`;
  }

  if (q.includes("revision") || q.includes("revise") || q.includes("memory")) {
    return `Revision should happen daily in a short loop. After every learning block, write 3 bullets: what you learned, what felt difficult, and what pattern you should remember.\n\nSuggested task: revise your last two solved problems and compare their approach.\n\nSchedule: 20 minutes recap, 20 minutes error analysis, 20 minutes re-solve one old problem.`;
  }

  return `That is a good question, ${context.name}. Based on your profile, your main goal is ${context.target}, and your learning direction is ${context.preferredLanguage} + DSA.\n\nI would recommend that you focus on one concept, solve one problem, and write down the pattern. Do not jump between too many topics.\n\nSuggested task: choose your weakest current topic from ${context.weakTopics.join(", ")} and create a 60-minute practice block around it.\n\nSchedule: add one focused DSA problem, one revision item, and one Java concept review.\n\nIf you want, ask for a full study plan for today or this week.`;
}
