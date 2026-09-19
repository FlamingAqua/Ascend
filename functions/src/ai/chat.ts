/* eslint-disable max-len, require-jsdoc */
import {initializeApp, getApps} from "firebase-admin/app";
import {onCall, HttpsError} from "firebase-functions/v2/https";
import {defineSecret} from "firebase-functions/params";
import {ASCEND_SYSTEM_PROMPT} from "./systemPrompt";
import {buildAscendMentorContext} from "./contextBuilder";
import type {MentorChatResponse, MentorGenerateOutput, AscendMentorContext} from "./types";

if (!getApps().length) {
  initializeApp();
}

const geminiApiKey = defineSecret("GEMINI_API_KEY");
const REQUEST_COOLDOWN_MS = 2500;
const lastRequestByUid = new Map<string, number>();

export const askMentor = onCall({secrets: [geminiApiKey], region: "us-central1"}, async (request) => {
  const auth = request.auth;
  if (!auth) {
    throw new HttpsError("unauthenticated", "Authentication is required.");
  }

  const uid = auth.uid;
  const now = Date.now();
  const lastSentAt = lastRequestByUid.get(uid) || 0;
  if (now - lastSentAt < REQUEST_COOLDOWN_MS) {
    throw new HttpsError("resource-exhausted", "Please wait a moment before asking another question.");
  }
  lastRequestByUid.set(uid, now);

  const rawMessage = typeof request.data?.message === "string" ? request.data.message : "";
  const message = rawMessage.trim();

  if (!message) {
    throw new HttpsError("invalid-argument", "Message must be a non-empty string.");
  }

  if (message.length > 1200) {
    throw new HttpsError("invalid-argument", "Message is too long.");
  }

  try {
    const context = await buildAscendMentorContext(uid, message);
    const generated = await generateMentorReply(context, message);

    return {
      reply: generated.reply,
      fallback: generated.fallback,
      model: generated.model,
    } satisfies MentorChatResponse;
  } catch (error) {
    throw sanitizeError(error);
  }
});

async function generateMentorReply(context: AscendMentorContext, message: string): Promise<MentorGenerateOutput> {
  const apiKey = process.env.GEMINI_API_KEY || geminiApiKey.value();
  if (!apiKey) {
    return {
      reply: buildFallbackReply(context, message),
      fallback: true,
      model: "fallback",
    };
  }

  try {
    const prompt = buildPrompt(context, message);
    const payload = {
      contents: [{
        role: "user",
        parts: [{text: prompt}],
      }],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 380,
      },
    };

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return {
        reply: buildFallbackReply(context, message),
        fallback: true,
        model: "gemini-2.0-flash",
      };
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return {
        reply: buildFallbackReply(context, message),
        fallback: true,
        model: "gemini-2.0-flash",
      };
    }

    return {
      reply: text,
      fallback: false,
      model: "gemini-2.0-flash",
    };
  } catch {
    return {
      reply: buildFallbackReply(context, message),
      fallback: true,
      model: "gemini-2.0-flash",
    };
  }
}

function buildPrompt(context: AscendMentorContext, userMessage: string): string {
  const profile = context.profile;
  const studyPlan = context.studyPlan;
  const progress = context.progress;

  return `${ASCEND_SYSTEM_PROMPT}\n\n` +
    "Learner profile:\n" +
    `- Name: ${profile.name || "Learner"}\n` +
    `- Email: ${profile.email || "unknown"}\n` +
    `- Role: ${profile.role || "user"}\n` +
    `- Preferred language: ${profile.preferredLanguage || "Java"}\n` +
    `- Level: ${profile.level || "Beginner"}\n` +
    `- Target: ${profile.target || "Placement and interview readiness"}\n` +
    `- Daily study hours: ${profile.dailyStudyHours ?? 2}\n` +
    `- Weak topics: ${profile.weakTopics?.join(", ") || "Arrays, Trees, Dynamic Programming"}\n\n` +
    "Study plan:\n" +
    `- Title: ${studyPlan?.title || "No active title"}\n` +
    `- Phase: ${studyPlan?.phase || "Not available"}\n` +
    `- Current goal: ${studyPlan?.currentGoal || "Not available"}\n` +
    `- Focus topics: ${studyPlan?.focusTopics?.join(", ") || "Not available"}\n` +
    `- Dates: ${studyPlan?.startDate || "Not available"} to ${studyPlan?.endDate || "Not available"}\n\n` +
    "Progress:\n" +
    `- Completed tasks: ${progress?.completedTasks ?? 0}/${progress?.totalTasks ?? 0}\n` +
    `- Streak: ${progress?.streakDays ?? 0} days\n` +
    `- Weekly hours: ${progress?.weeklyHours ?? 0}\n` +
    `- Latest topic: ${progress?.lastTopic || "Not available"}\n` +
    `- Latest topic progress: ${progress?.latestTopicProgress ?? 0}%\n\n` +
    `Recent mentor messages: ${context.recentMentorMessages?.length ? context.recentMentorMessages.map((m) => `${m.role}: ${m.content}`).join("\n") : "No recent history"}\n\n` +
    `User question: ${userMessage}\n\n` +
    "Return a concise answer with one strategy, one realistic one-step study plan for today, and one question.";
}

function buildFallbackReply(context: AscendMentorContext, question: string): string {
  const profile = context.profile;
  const name = profile.name || "Learner";
  const language = profile.preferredLanguage || "Java";
  const q = question.trim().toLowerCase();

  if (q.includes("today") || q.includes("study today") || q.includes("plan")) {
    return `Hi ${name}, here is your personalized study plan for today.\n\nFocus on ${language} fundamentals and one DSA pattern first. Spend ${Math.min(profile.dailyStudyHours ?? 2, 2)} hours in a deep work block: 45 minutes on ${language} syntax or collections, 45 minutes on DSA problem practice, and 30 minutes on revision.\n\nSuggested task: solve one medium-level ${language} + DSA problem and write a short explanation of the approach.\n\nStudy schedule: Morning — ${language} review, Midday — DSA problem, Evening — revise mistakes and update your task list.\n\nNext question: Do you want me to create a full week plan from your current roadmap?`;
  }

  if (q.includes("java") || q.includes("python") || q.includes("language")) {
    return `For ${name}, ${language} is your selected language for the DSA and placement track. Keep it consistent while you build fluency with syntax, collections, and common patterns.\n\nSuggested task: solve one arrays or hash map problem in ${language} and write the complexity analysis.\n\nSchedule: 30 minutes ${language} review, 60 minutes DSA problem practice, 30 minutes notes and mistakes review.`;
  }

  if (q.includes("dsa") || q.includes("graph") || q.includes("tree") || q.includes("problem")) {
    return `Your learning path should be topic ordered and consistent. Start with arrays, hashing, strings, stacks, queues, binary search, linked lists, trees, graphs, and then dynamic programming.\n\nRight now your weak topics are ${profile.weakTopics?.join(", ") || "Arrays, Trees, Dynamic Programming"}. Build a daily loop around one concept and two problems.\n\nSuggested task: solve one problem from your current weak topic and write down the pattern used.\n\nSchedule: 45 minutes explaining the concept, 60 minutes solving a problem, 30 minutes reviewing another solved example.`;
  }

  if (q.includes("roadmap") || q.includes("faang") || q.includes("career") || q.includes("hire") || q.includes("placement")) {
    return `Your roadmap should combine ${language}, DSA, fundamentals, project work, and interview strategy. Build a strong base in ${language} syntax, collections, strings, arrays, trees, graphs, SQL, and REST APIs.\n\nA realistic plan is to spend 2 hours a day on ${language} + DSA, keep one project moving, and revise every Sunday.\n\nSuggested task: define one project milestone this week and connect it to a job-ready ${language} project.\n\nSchedule: Monday to Friday practice DSA, weekend review + project work.`;
  }

  if (q.includes("project") || q.includes("portfolio") || q.includes("github")) {
    return `A strong project should demonstrate backend skills and ${language} depth. Choose one project that solves a real problem and shows API design, database structure, and clean code.\n\nSuggested task: pick a project that uses ${language}, CRUD operations, and a frontend or API interface. Write one GitHub README explaining the architecture.\n\nSchedule: 60 minutes on backend structure, 45 minutes on UI or API flow, 30 minutes on data modeling.`;
  }

  if (q.includes("revision") || q.includes("revise") || q.includes("memory")) {
    return "Revision should happen daily in a short loop. After every learning block, write 3 bullets: what you learned, what felt difficult, and what pattern you should remember.\n\nSuggested task: revise your last two solved problems and compare their approach.\n\nSchedule: 20 minutes recap, 20 minutes error analysis, 20 minutes re-solve one old problem.";
  }

  return `That is a good question, ${name}. Based on your profile, your main goal is ${profile.target || "Placement and interview readiness"}, and your learning direction is ${profile.preferredLanguage || "Java"} + DSA.\n\nI would recommend that you focus on one concept, solve one problem, and write down the pattern. Do not jump between too many topics.\n\nSuggested task: choose your weakest current topic from ${profile.weakTopics?.join(", ") || "Arrays, Trees, Dynamic Programming"} and create a 60-minute practice block around it.\n\nSchedule: add one focused DSA problem, one revision item, and one Java concept review.\n\nIf you want, ask for a full study plan for today or this week.`;
}

function sanitizeError(error: unknown): HttpsError {
  if (error instanceof HttpsError) {
    return error;
  }

  return new HttpsError("internal", "Unable to generate an AI mentor response right now.");
}
