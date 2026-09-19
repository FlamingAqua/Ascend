import type { PreferredLanguage, UserProfile } from "../types";

export const SUPPORTED_LANGUAGES: readonly PreferredLanguage[] = ["Java", "Python", "C++", "C", "JavaScript", "Go", "Rust"];

export interface LanguagePlan {
  language: PreferredLanguage;
  paradigm: string;
  collectionTerm: string;
  setupTask: string;
  foundations: string[];
  syntaxExample: string;
  resources: { name: string; type: string; desc: string }[];
  practice: { id: number; title: string; difficulty: "Easy" | "Medium"; note: string }[];
  skills: { name: string; why: string; currentTopic: string; subtopics: string[]; color: string }[];
  projects: { name: string; desc: string; tech: string[]; effort: string; impact: string; year: string }[];
}

export interface PlanningContext {
  preferredLanguage: PreferredLanguage;
  academicYear: number;
  semester: number;
  targetYear: number;
  dailyStudyHours: number;
}

const sharedPractice = [
  { id: 217, title: "Contains Duplicate", difficulty: "Easy" as const, note: "Use a set to detect a repeated value." },
  { id: 242, title: "Valid Anagram", difficulty: "Easy" as const, note: "Track character frequency." },
  { id: 1, title: "Two Sum", difficulty: "Easy" as const, note: "Use a complement lookup for O(n)." },
  { id: 49, title: "Group Anagrams", difficulty: "Medium" as const, note: "Build a stable frequency or sorted key." },
  { id: 347, title: "Top K Frequent Elements", difficulty: "Medium" as const, note: "Combine frequency counting with a heap or buckets." },
  { id: 238, title: "Product of Array Except Self", difficulty: "Medium" as const, note: "Solve with prefix and suffix products." },
  { id: 128, title: "Longest Consecutive Sequence", difficulty: "Medium" as const, note: "Use constant-time membership checks." },
  { id: 53, title: "Maximum Subarray", difficulty: "Medium" as const, note: "Apply the running-best subarray pattern." },
];

export const DSA_TOPICS = [
  { name: "Arrays & Hashing", problems: 30, tag: "Start here" },
  { name: "Two Pointers", problems: 20, tag: "" },
  { name: "Sliding Window", problems: 18, tag: "" },
  { name: "Stack & Queue", problems: 22, tag: "" },
  { name: "Binary Search", problems: 25, tag: "" },
  { name: "Linked List", problems: 24, tag: "" },
  { name: "Trees / BFS-DFS", problems: 20, tag: "" },
  { name: "Tries", problems: 10, tag: "" },
  { name: "Heap / Priority Queue", problems: 18, tag: "" },
  { name: "Backtracking", problems: 15, tag: "" },
  { name: "Graphs", problems: 30, tag: "Y2 goal" },
  { name: "Dynamic Programming", problems: 40, tag: "Y2 goal" },
  { name: "Greedy", problems: 15, tag: "" },
  { name: "Segment Trees", problems: 12, tag: "Advanced" },
  { name: "Math & Number Theory", problems: 20, tag: "Advanced" },
];

const languagePlans: Record<PreferredLanguage, Omit<LanguagePlan, "language" | "practice">> = {
  Java: {
    paradigm: "strongly typed, object-oriented",
    collectionTerm: "collections",
    setupTask: "Install a JDK and run your first class",
    foundations: ["Classes and objects", "Methods and constructors", "Arrays and strings", "Collections and generics"],
    syntaxExample: "Map<Integer, Integer> counts = new HashMap<>();",
    resources: [
      { name: "NeetCode 150 Java track", type: "Course", desc: "Pattern-first explanations with Java implementations." },
      { name: "Kunal Kushwaha DSA", type: "Video", desc: "Beginner-friendly Java problem solving." },
      { name: "Java Collections reference", type: "Reference", desc: "Review List, Set, Map, heaps, and their complexity." },
    ],
    skills: [{ name: "Java", why: "Your selected language for DSA and backend foundations.", currentTopic: "Classes, objects, and collections", subtopics: ["OOP", "Collections", "Generics", "Streams", "Testing"], color: "bg-orange-500" }],
    projects: [{ name: "Java DSA Progress CLI", desc: "Track solved problems, topic accuracy, and revision intervals with file persistence.", tech: ["Java", "File I/O", "CLI"], effort: "1-2 weeks", impact: "Medium", year: "Y1" }],
  },
  Python: {
    paradigm: "readable, dynamically typed",
    collectionTerm: "built-in collections",
    setupTask: "Install Python and run your first script",
    foundations: ["Functions and modules", "Lists and strings", "Dictionaries and sets", "Heaps and dequeues"],
    syntaxExample: "counts = {}",
    resources: [
      { name: "NeetCode Python track", type: "Course", desc: "Pattern-first explanations with concise Python solutions." },
      { name: "Python Tutor", type: "Tool", desc: "Visualize loops, recursion, and data structure state." },
      { name: "Python collections reference", type: "Reference", desc: "Review dict, set, heapq, and deque complexity." },
    ],
    skills: [{ name: "Python", why: "Your selected language for concise DSA practice and automation.", currentTopic: "Functions, lists, dictionaries, and sets", subtopics: ["Functions", "Lists", "Dicts", "Sets", "Testing"], color: "bg-yellow-500" }],
    projects: [{ name: "Python DSA Progress CLI", desc: "Track solved problems and generate spaced-repetition review prompts from a local data file.", tech: ["Python", "JSON", "CLI"], effort: "1-2 weeks", impact: "Medium", year: "Y1" }],
  },
  "C++": {
    paradigm: "compiled, performance-oriented",
    collectionTerm: "STL containers",
    setupTask: "Install a C++ compiler and run your first program",
    foundations: ["Functions and references", "Arrays and strings", "STL vectors and maps", "Priority queues and iterators"],
    syntaxExample: "unordered_map<int, int> counts;",
    resources: [
      { name: "NeetCode C++ track", type: "Course", desc: "Interview patterns implemented with STL." },
      { name: "cppreference containers", type: "Reference", desc: "Check STL operations and complexity guarantees." },
      { name: "Competitive programming STL guide", type: "Guide", desc: "Practice fast, reusable contest patterns." },
    ],
    skills: [{ name: "C++", why: "Your selected language for fast DSA and competitive programming practice.", currentTopic: "STL vectors, maps, and priority queues", subtopics: ["STL", "Iterators", "Templates", "Heaps", "Testing"], color: "bg-blue-500" }],
    projects: [{ name: "C++ Algorithm Workbench", desc: "Build a terminal workbench that benchmarks and compares common data-structure operations.", tech: ["C++", "STL", "CLI"], effort: "2-3 weeks", impact: "High", year: "Y1" }],
  },
  C: {
    paradigm: "low-level, memory-aware",
    collectionTerm: "arrays and custom structures",
    setupTask: "Install a C compiler and run your first program",
    foundations: ["Pointers and arrays", "Strings and memory", "Structs and linked lists", "Stacks, queues, and allocation"],
    syntaxExample: "int counts[26] = {0};",
    resources: [
      { name: "C data structures track", type: "Course", desc: "Build core structures while understanding memory." },
      { name: "C pointers reference", type: "Reference", desc: "Practice addresses, ownership, and safe traversal." },
      { name: "Algorithm design in C", type: "Guide", desc: "Translate common interview patterns into C." },
    ],
    skills: [{ name: "C", why: "Your selected language for memory-aware data-structure fundamentals.", currentTopic: "Pointers, arrays, and structs", subtopics: ["Pointers", "Arrays", "Structs", "Allocation", "Debugging"], color: "bg-slate-500" }],
    projects: [{ name: "C Data Structures Lab", desc: "Implement and test linked lists, stacks, queues, and hash tables with explicit memory management.", tech: ["C", "Pointers", "Make"], effort: "2-3 weeks", impact: "High", year: "Y1" }],
  },
  JavaScript: {
    paradigm: "dynamic, event-driven",
    collectionTerm: "built-in objects",
    setupTask: "Install Node.js and run your first script",
    foundations: ["Functions and closures", "Arrays and strings", "Map and Set", "Priority queues and recursion"],
    syntaxExample: "const counts = new Map();",
    resources: [
      { name: "NeetCode JavaScript track", type: "Course", desc: "Interview patterns using modern JavaScript." },
      { name: "MDN collections reference", type: "Reference", desc: "Review Map, Set, arrays, and iteration behavior." },
      { name: "Node.js practice runner", type: "Tool", desc: "Run and test solutions locally with JavaScript." },
    ],
    skills: [{ name: "JavaScript", why: "Your selected language for DSA plus practical web development.", currentTopic: "Functions, arrays, Map, and Set", subtopics: ["Functions", "Arrays", "Map", "Set", "Node.js"], color: "bg-cyan-500" }],
    projects: [{ name: "JavaScript DSA Visualizer", desc: "Create an interactive browser tool that steps through array, tree, and graph algorithms.", tech: ["JavaScript", "Canvas API", "Testing"], effort: "3-4 weeks", impact: "High", year: "Y1" }],
  },
  Go: {
    paradigm: "compiled, simple, concurrent-friendly",
    collectionTerm: "maps and slices",
    setupTask: "Install Go and run your first package",
    foundations: ["Functions and structs", "Slices and strings", "Maps and queues", "Heaps and interfaces"],
    syntaxExample: "counts := map[int]int{}",
    resources: [
      { name: "Go DSA patterns", type: "Course", desc: "Solve interview patterns with idiomatic Go." },
      { name: "Go standard library", type: "Reference", desc: "Review slices, maps, sorting, and container utilities." },
      { name: "Go problem-solving lab", type: "Practice", desc: "Short exercises for clean, testable solutions." },
    ],
    skills: [{ name: "Go", why: "Your selected language for simple, compiled problem-solving practice.", currentTopic: "Slices, maps, structs, and interfaces", subtopics: ["Slices", "Maps", "Structs", "Heaps", "Testing"], color: "bg-teal-500" }],
    projects: [{ name: "Go DSA Practice API", desc: "Build a small service that stores practice attempts and returns topic-based recommendations.", tech: ["Go", "HTTP", "JSON"], effort: "2-3 weeks", impact: "High", year: "Y1" }],
  },
  Rust: {
    paradigm: "compiled, ownership-driven",
    collectionTerm: "standard collections",
    setupTask: "Install Rust and run your first Cargo project",
    foundations: ["Ownership and borrowing", "Vectors and strings", "HashMap and HashSet", "Heaps and enums"],
    syntaxExample: "let mut counts = HashMap::new();",
    resources: [
      { name: "Rust DSA patterns", type: "Course", desc: "Build interview fluency with ownership-aware solutions." },
      { name: "Rust standard library", type: "Reference", desc: "Review Vec, HashMap, iterators, and BinaryHeap." },
      { name: "The Rust Book exercises", type: "Practice", desc: "Strengthen syntax and memory-safe problem solving." },
    ],
    skills: [{ name: "Rust", why: "Your selected language for safe, performance-oriented DSA practice.", currentTopic: "Ownership, vectors, and HashMap", subtopics: ["Ownership", "Borrowing", "Vec", "HashMap", "Testing"], color: "bg-red-500" }],
    projects: [{ name: "Rust Algorithm Toolkit", desc: "Implement reusable, ownership-safe data structures with benchmarks and tests.", tech: ["Rust", "Cargo", "Benchmarks"], effort: "2-3 weeks", impact: "High", year: "Y1" }],
  },
};

export function isPreferredLanguage(value: unknown): value is PreferredLanguage {
  return typeof value === "string" && SUPPORTED_LANGUAGES.includes(value as PreferredLanguage);
}

export function normalizePreferredLanguage(value: unknown): PreferredLanguage | undefined {
  if (isPreferredLanguage(value)) return value;
  if (typeof value !== "string") return undefined;
  const normalized = value.trim().toLowerCase();
  const aliases: Record<string, PreferredLanguage> = {
    java: "Java", python: "Python", "c++": "C++", cpp: "C++", c: "C",
    javascript: "JavaScript", js: "JavaScript", go: "Go", golang: "Go", rust: "Rust",
  };
  return aliases[normalized];
}

export function shouldShowLanguageOnboarding(profile?: Pick<UserProfile, "preferredLanguage"> | null): boolean {
  return !normalizePreferredLanguage(profile?.preferredLanguage);
}

export function getLanguagePlan(language: unknown): LanguagePlan {
  const preferredLanguage = normalizePreferredLanguage(language) || "Java";
  return { language: preferredLanguage, practice: sharedPractice, ...languagePlans[preferredLanguage] };
}

export function getPlanningContext(profile?: UserProfile | null): PlanningContext {
  return {
    preferredLanguage: normalizePreferredLanguage(profile?.preferredLanguage) || "Java",
    academicYear: profile?.academicYear || 1,
    semester: profile?.semester || 1,
    targetYear: profile?.targetYear || new Date().getFullYear() + 4,
    dailyStudyHours: profile?.dailyStudyHours || 2,
  };
}

export interface GeneratedRoadmapYear {
  year: string;
  label: string;
  status: "active" | "upcoming";
  progress: number;
  target: string;
  semesters: { name: string; progress: number; months: { name: string; skills: { name: string; topics: string[]; done: number }[] }[] }[];
}

export function generateRoadmap(context: PlanningContext): GeneratedRoadmapYear[] {
  const plan = getLanguagePlan(context.preferredLanguage);
  const dsaTopics = ["Arrays & Hashing", "Two Pointers", "Sliding Window", "Stacks & Queues", "Binary Search", "Linked Lists", "Trees", "Graphs", "Dynamic Programming"];
  return [
    { year: "Year 1", label: `${plan.language} + DSA Foundation`, status: "active", progress: 0, target: `Solve 150 DSA problems. Master ${plan.language} ${plan.foundations[0].toLowerCase()} and build 2 projects.`, semesters: [
      { name: "Sem 1 (Now)", progress: 0, months: [{ name: `Foundations · ${plan.language}`, skills: [{ name: `${plan.language} Foundations`, topics: plan.foundations, done: 0 }, { name: "DSA Core Patterns", topics: dsaTopics.slice(0, 5), done: 0 }, { name: "Complexity and Testing", topics: ["Big-O notation", "Edge cases", "Test design", "Debugging workflow"], done: 0 }] }] },
      { name: "Sem 2", progress: 0, months: [{ name: `Structures · ${plan.language}`, skills: [{ name: `${plan.language} ${plan.collectionTerm}`, topics: ["Lists", "Sets", "Maps", "Stacks", "Queues", "Heaps"], done: 0 }, { name: "DSA Structures", topics: dsaTopics.slice(5), done: 0 }, { name: "SQL and Git", topics: ["Queries", "Joins", "Indexes", "Branches", "Pull requests"], done: 0 }] }] },
    ] },
    { year: "Year 2", label: "Intermediate DSA + First Internship", status: "upcoming", progress: 0, target: "Complete 350+ practice problems, land an internship, and ship 2 full-stack projects.", semesters: [{ name: "Sem 1", progress: 0, months: [{ name: "Graphs + Dynamic Programming", skills: [{ name: "Advanced DSA", topics: ["Graph traversal", "Shortest paths", "Union-Find", "1D DP", "2D DP", "Knapsack"], done: 0 }, { name: `${plan.language} Projects`, topics: ["API design", "Persistence", "Testing", "Deployment"], done: 0 }] }] }, { name: "Sem 2", progress: 0, months: [{ name: "Systems + Interview Practice", skills: [{ name: "System Design", topics: ["Scalability", "Caching", "Queues", "Database design"], done: 0 }, { name: "Interview Practice", topics: ["Timed sets", "Mock interviews", "Behavioral stories", "Portfolio review"], done: 0 }] }] }] },
    { year: "Year 3", label: "Advanced DSA + Internship", status: "upcoming", progress: 0, target: "Master advanced patterns, contribute to open source, and deepen production engineering skills.", semesters: [{ name: "Full Year", progress: 0, months: [{ name: "Advanced Track", skills: [{ name: "Advanced DSA", topics: ["Tries", "Segment trees", "Greedy", "Math", "Competitive programming"], done: 0 }, { name: "Production Engineering", topics: ["Distributed systems", "Cloud", "Observability", "CI/CD"], done: 0 }] }] }] },
    { year: "Year 4", label: "Placement Ready", status: "upcoming", progress: 0, target: `Reach placement readiness by ${context.targetYear} with a strong ${plan.language} DSA portfolio.`, semesters: [{ name: "Full Year", progress: 0, months: [{ name: "Final Sprint", skills: [{ name: "Interview Readiness", topics: ["Company-tagged problems", "Mock interviews", "System design", "Negotiation"], done: 0 }, { name: "Capstone", topics: ["Architecture", "Production deployment", "Documentation", "Open-source release"], done: 0 }] }] }] },
  ];
}

export interface GeneratedTask { id: number; title: string; subject: string; priority: "high" | "medium"; due: string; status: "todo" | "done"; tags: string[] }

export function generateTasks(context: PlanningContext): GeneratedTask[] {
  const plan = getLanguagePlan(context.preferredLanguage);
  return [
    { id: 1, title: plan.setupTask, subject: plan.language, priority: "high", due: "Today", status: "todo", tags: ["Setup", "Day 1"] },
    { id: 2, title: `Practice ${plan.foundations[0]} with 3 short exercises`, subject: plan.language, priority: "high", due: "Today", status: "todo", tags: ["Coding", "Foundations"] },
    { id: 3, title: `Solve Two Sum and Contains Duplicate in ${plan.language}`, subject: "DSA", priority: "high", due: "Today", status: "todo", tags: ["Practice", "Arrays"] },
    { id: 4, title: `Implement a frequency counter using ${plan.collectionTerm}`, subject: "DSA", priority: "high", due: "Today", status: "todo", tags: ["Coding", plan.language] },
    { id: 5, title: "Review Big-O and write complexity notes for each solution", subject: "DSA", priority: "medium", due: "Today", status: "todo", tags: ["Theory", "Complexity"] },
    { id: 6, title: `Complete one ${plan.language} DSA problem without hints`, subject: "DSA", priority: "high", due: "This week", status: "todo", tags: ["Practice", "Interview"] },
    { id: 7, title: `Build a small ${plan.language} project using the current topic`, subject: "Projects", priority: "medium", due: "This week", status: "todo", tags: ["Project", plan.language] },
  ];
}

export interface GeneratedScheduleItem { time: string; task: string; topic: string; duration: string; resource: string; priority: "high" | "medium" | "low"; status: "upcoming" }

export interface UpcomingPlanItem {
  name: string;
  due: string;
  priority: "warning" | "info" | "danger";
}

export function generateUpcomingPlan(context: PlanningContext): UpcomingPlanItem[] {
  const plan = getLanguagePlan(context.preferredLanguage);
  return [
    { name: `${plan.language} foundations checkpoint`, due: "This week", priority: "warning" },
    { name: `${plan.language} DSA practice set`, due: "Sep 15", priority: "info" },
    { name: `${plan.language} DSA mock interview`, due: "Sep 20", priority: "danger" },
    { name: `${plan.resources[0].name} - Arrays complete`, due: "Sep 30", priority: "warning" },
  ];
}

export function generateHackathonIdea(context: PlanningContext, index = 0): string {
  const plan = getLanguagePlan(context.preferredLanguage);
  const ideas = [
    `Build a ${plan.language} DSA problem recommender using a topic-based practice API and a small web interface.`,
    `Create a browser-based DSA visualizer with ${plan.language} examples for arrays, trees, and graphs.`,
    `Build an education-domain solution with a ${plan.language} backend and SQL persistence.`,
    `Create a ${plan.language} productivity or data-management tool with a clean API and dashboard.`,
    `Build a cybersecurity data pipeline with a ${plan.language} implementation and secure storage.`,
  ];
  return ideas[index % ideas.length];
}

export function generateDailySchedule(context: PlanningContext): GeneratedScheduleItem[] {
  const plan = getLanguagePlan(context.preferredLanguage);
  return [
    { time: "8:00 AM", task: `${plan.language} foundations`, topic: plan.foundations[0], duration: "45 min", resource: plan.resources[0].name, priority: "high", status: "upcoming" },
    { time: "9:00 AM", task: "DSA concept", topic: "Arrays and hashing", duration: "45 min", resource: plan.resources[2].name, priority: "high", status: "upcoming" },
    { time: "10:00 AM", task: "DSA practice", topic: `Solve one problem in ${plan.language}`, duration: "60 min", resource: "Practice set", priority: "high", status: "upcoming" },
    { time: "12:00 PM", task: "Break", topic: "—", duration: "30 min", resource: "—", priority: "low", status: "upcoming" },
    { time: "2:00 PM", task: `${plan.language} coding exercise`, topic: `Implement a solution using ${plan.collectionTerm}`, duration: "60 min", resource: plan.resources[1].name, priority: "high", status: "upcoming" },
    { time: "4:00 PM", task: "Revision", topic: "Re-solve one missed problem and record the pattern", duration: "30 min", resource: "Your notes", priority: "medium", status: "upcoming" },
    { time: "5:00 PM", task: "Day wrap-up", topic: `Plan tomorrow's ${plan.language} + DSA block`, duration: "15 min", resource: "Study journal", priority: "medium", status: "upcoming" },
  ];
}
