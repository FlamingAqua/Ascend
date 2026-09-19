export interface MentorAskRequest {
  message: string;
}

export interface MentorProfileSnapshot {
  uid?: string;
  name?: string;
  email?: string;
  role?: string;
  isActive?: boolean;
  goals?: string[];
  preferredLanguage?: string;
  dailyStudyHours?: number;
  level?: string;
  target?: string;
  weakTopics?: string[];
}

export interface MentorStudyPlanSnapshot {
  title?: string;
  phase?: string;
  currentGoal?: string;
  focusTopics?: string[];
  startDate?: string;
  endDate?: string;
  tasksCompleted?: number;
  tasksTotal?: number;
}

export interface MentorProgressSnapshot {
  completedTasks?: number;
  totalTasks?: number;
  streakDays?: number;
  weeklyHours?: number;
  lastTopic?: string;
  latestTopicProgress?: number;
}

export interface AscendMentorContext {
  messageLength: number;
  profile: MentorProfileSnapshot;
  studyPlan?: MentorStudyPlanSnapshot;
  progress?: MentorProgressSnapshot;
  recentMentorMessages?: Array<{ role: "user" | "assistant"; content: string }>;
}

export interface MentorGenerateOutput {
  reply: string;
  fallback: boolean;
  model: string;
}

export interface MentorChatResponse {
  reply: string;
  fallback: boolean;
  model: string;
}
