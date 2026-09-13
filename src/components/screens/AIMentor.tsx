import { useState, useRef, useEffect } from "react";
import { PageLayout, PageHeader, Button } from "../ui";

interface Message {
  role: "user" | "assistant";
  content: string;
  time: string;
}

const suggestions = [
  "What should I study today?",
  "Java vs Python for DSA — which is better?",
  "How do I crack FAANG by 2030?",
  "What's the best order to learn DSA topics?",
  "How many problems should I solve per day?",
  "What projects will get me hired?",
  "How do I prepare for system design?",
  "Am I on track for ₹1Cr+ by 2030?",
];

const canned: Record<string, string> = {
  "What should I study today?": `Today's optimal plan for your Java + DSA grind:

**Morning (2h) — Java OOP:**
Focus: Inheritance, Polymorphism, method overriding. Write a class hierarchy — Animal → Dog/Cat — then make it work with runtime polymorphism. Don't just watch videos: code it.

**Midday (2h) — DSA – Arrays:**
Solve LeetCode #49 (Group Anagrams) and #238 (Product Except Self). Both are HashMap-based and appear constantly in interviews. Code in Java. After solving, read the top Java solution and compare.

**Afternoon (1h) — Big-O:**
Calculate time complexity for every solution you wrote today. This habit, done daily, makes you fast in interviews.

**Evening (30 min) — Review:**
Re-read your notes. Commit your Java code to GitHub. Write one sentence about what was hard.

**Total: ~5.5h.** If you do this 5 days a week, you'll have 200+ LeetCode problems solved and solid Java by end of Year 1. That's the path.`,

  "Java vs Python for DSA — which is better?": `**Java. No debate.**

Here's why this matters for your 2030 goal:

**Java advantages for DSA:**
- Verbose but explicit — you understand exactly what's happening in memory
- Strongly typed — fewer bugs, better IDE support (IntelliJ)
- Collections framework is the most complete: ArrayList, HashMap, PriorityQueue, TreeMap — all built-in
- Java is the primary language at Google, Amazon, and most Indian product companies
- Spring Boot (Java backend framework) is the #1 backend skill hiring managers look for

**Python is faster to write** — but that's the trap. Easy syntax means you don't understand what's happening. In an interview, you need to explain your code, not just type it.

**The rule:** Solve every DSA problem in Java. Once you're strong in Java, picking up Python for ML or scripting takes 2 weeks — not 2 months.

Stick with Java. You're already on the right track.`,

  "How do I crack FAANG by 2030?": `This is achievable. Here's the honest roadmap:

**Year 1 (Now) — Foundation:**
- Java OOP mastery (Collections, Generics, Streams)
- 150+ LeetCode (80% Easy, 20% Medium) — all in Java
- 1–2 Java projects on GitHub (DSA Visualizer, CLI tool)
- Git + GitHub profile — push code daily

**Year 2 — Intermediate:**
- 350+ LeetCode (mix of Medium + some Hard)
- DSA: Graphs, DP, Backtracking
- Spring Boot backend project (REST API + DB)
- First internship — even a tier-2 company is fine
- SQL advanced: window functions, indexing

**Year 3 — Advanced:**
- 500+ LeetCode (start doing Hard consistently)
- System Design: learn to design Twitter, YouTube, Uber
- FAANG internship attempt (Google STEP / Amazon SDE intern)
- Contribute to open source — shows real engineering ability

**Year 4 — Placement:**
- 600+ LeetCode including company-tagged (Google, Meta, Amazon)
- Mock interviews: Pramp, Interviewing.io — 3/week minimum
- Strong system design portfolio — explain 3 real systems cold

**The math:** If you solve 2 problems/day from Year 2 onwards, you'll have 700+ by Year 4. That's FAANG territory.

One habit that separates placed students: **daily consistency over 4 years.** Not cramming in Year 4.`,

  "What's the best order to learn DSA topics?": `Follow Striver's A2Z Sheet exactly. It's the most battle-tested order:

**Phase 1 — Foundation (Y1 Sem 1):**
1. Arrays & Hashing → Two Pointers → Sliding Window
2. Binary Search (on arrays + on answers)
3. Linked Lists (singly, doubly, fast/slow pointers)
4. Stack & Queue (including Monotonic Stack)

**Phase 2 — Trees & Recursion (Y1 Sem 2):**
5. Recursion & Backtracking (Subsets, Permutations, N-Queens)
6. Binary Trees + BST (traversals, LCA, diameter)
7. Heaps / Priority Queue (Top-K, Median of Stream)

**Phase 3 — Graphs & DP (Y2):**
8. Graphs (BFS, DFS, Topological Sort, Dijkstra, Union-Find)
9. Dynamic Programming (1D → 2D → Knapsack → DP on Trees)
10. Tries (word problems, prefix matching)
11. Greedy algorithms

**Phase 4 — Advanced (Y3+):**
12. Segment Trees, Fenwick Tree
13. Math (Number Theory, Combinatorics)
14. Competitive Programming patterns

**Critical rule:** Don't jump to Graphs before Trees. Don't touch DP before Recursion. The order exists for a reason.`,

  "How many problems should I solve per day?": `Here's the honest breakdown by year:

**Year 1 (Now):** 1–2 problems/day
Quality > quantity. You're still building Java fundamentals. It's okay to spend 2 hours on a single Medium problem. Read solutions, understand the pattern, rewrite from memory.

**Year 2:** 2–3 problems/day
You should be able to solve Easy in 15–20 min and Medium in 30–45 min. Start doing LeetCode Weekly Contests every Sunday.

**Year 3:** 3–4 problems/day
Mix: 1 new problem + 1 Hard + 1 revision of an old problem. Company-tagged problems (Google/Amazon/Meta).

**Year 4 (Placement):** 4–5 problems/day
Sprint mode. Daily contest participation. Mock interviews 3x/week.

**The number that matters most:** not problems/day, but **problems solved consistently without hints**. 1 clean solution beats 5 copy-pasted solutions.

At 1–2/day from Year 1, you'll hit 500+ by the end of Year 3. That's the threshold where FAANG interviews become winnable.`,
};

const defaultResponse = `That's exactly the right question to be asking at your stage.

Here's my honest take as your mentor:

You have 4 years and a clear goal — ₹1Cr+ at a top company by 2030. That's not just achievable, it's *well within reach* for someone who stays consistent.

**What actually matters:**
1. Java + DSA is the core — every other skill is additive
2. Projects signal real-world ability — ship things, not just solve problems
3. Internships in Year 2–3 are non-negotiable for top placements
4. System Design separates ₹30L offers from ₹1Cr+ offers — start learning the concepts early

**The trap to avoid:** spreading too thin in Year 1. Every YouTube rabbit hole about React, AI, cloud — save it. Right now, the only thing that compounds is Java + DSA daily.

Want me to build a specific study plan for this week, or dig deeper into any topic?`;

function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

const initialMessages: Message[] = [
  {
    role: "assistant",
    content: `Hey Manesh! 🔥 I'm your AI Study & Career Mentor.

Your goal is clear: **Java + DSA → FAANG / ₹1Cr+ by 2030.** I respect that. Let's make sure every week of the next 4 years counts.

Here's where you stand: **Day 1. Year 1. Zero problems solved.** That's actually the best position to be in — nothing to unlearn, everything to build.

I have full context of your roadmap, skills, and targets. Ask me anything:
- **What to study** (daily plans, topic order, resources)
- **How to crack FAANG** (what interviewers actually look for)
- **Project ideas** (what gets you hired vs. what's just busy work)
- **Career strategy** (internships, contests, open source)

What do you want to work on first?`,
    time: now(),
  },
];

export default function AIMentor() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    setMessages((prev) => [...prev, { role: "user", content: text, time: now() }]);
    setInput("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900 + Math.random() * 600));
    const reply = canned[text] || defaultResponse;
    setMessages((prev) => [...prev, { role: "assistant", content: reply, time: now() }]);
    setLoading(false);
  };

  const formatContent = (text: string) =>
    text.split("\n").map((line, i) => {
      const bold = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      if (line.match(/^\d+\.\s/)) return <p key={i} className="ml-3 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: bold }} />;
      if (line.startsWith("- ")) return <p key={i} className="ml-3 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: "· " + bold.slice(2) }} />;
      if (line === "") return <br key={i} />;
      return <p key={i} className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: bold }} />;
    });

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 lg:px-8 pt-6 pb-4 border-b border-[var(--border)]">
        <PageHeader title="AI Mentor" subtitle="Java + DSA · FAANG Strategy · Career Advisor" />
      </div>

      <div className="px-6 lg:px-8 py-3 border-b border-[var(--border)] bg-[var(--muted)]/30 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--primary)]/50 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 lg:px-8 py-5 space-y-5">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-semibold ${
              msg.role === "assistant"
                ? "bg-gradient-to-br from-indigo-500 to-violet-600 text-white"
                : "bg-gradient-to-br from-indigo-400 to-violet-500 text-white"
            }`}>
              {msg.role === "assistant" ? "AI" : "RM"}
            </div>
            <div className={`flex-1 max-w-2xl ${msg.role === "user" ? "text-right" : ""}`}>
              <div className={`inline-block text-left px-4 py-3 rounded-xl text-sm ${
                msg.role === "user"
                  ? "bg-[var(--primary)] text-white rounded-tr-sm"
                  : "bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] rounded-tl-sm"
              }`}>
                {msg.role === "user"
                  ? <p>{msg.content}</p>
                  : <div className="space-y-0.5">{formatContent(msg.content)}</div>}
              </div>
              <p className="text-[10px] text-[var(--muted-foreground)] mt-1 px-1">{msg.time}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-xs font-semibold text-white flex-shrink-0">AI</div>
            <div className="bg-[var(--card)] border border-[var(--border)] px-4 py-3 rounded-xl rounded-tl-sm">
              <div className="flex gap-1 items-center h-4">
                {[0, 150, 300].map((d) => (
                  <div key={d} className="w-1.5 h-1.5 rounded-full bg-[var(--muted-foreground)] animate-bounce" style={{ animationDelay: `${d}ms` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="px-6 lg:px-8 py-4 border-t border-[var(--border)] bg-[var(--card)]">
        <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Java, DSA, FAANG strategy, projects..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm outline-none focus:border-[var(--primary)] transition-colors placeholder:text-[var(--muted-foreground)]"
          />
          <Button onClick={() => send(input)} className={loading || !input.trim() ? "opacity-50" : ""}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}
