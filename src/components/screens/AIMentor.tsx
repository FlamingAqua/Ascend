import { useState, useRef, useEffect } from "react";
import { PageHeader, Button } from "../ui";
import { useAuth } from "../../services/AuthContext";
import { askMentor, loadChatHistory, saveChatHistory, type ChatMessage } from "../../services/chatbotService";
import { getPlanningContext } from "../../services/planningService";

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

function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function AIMentor() {
  const { profile, firebaseUser } = useAuth();
  const language = getPlanningContext(profile).preferredLanguage;
  const welcomeMessage: ChatMessage = {
    role: "assistant",
    content: `Hey ${profile?.name || "Learner"}! I'm your AI Study & Career Mentor.\n\nYour current track is **${language} + DSA**. Ask me about today's plan, coding patterns, resources, projects, or interview preparation.`,
    time: now(),
  };
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!firebaseUser?.uid) return;

    loadChatHistory(firebaseUser.uid)
      .then((history) => {
        if (history.length > 0) {
          setMessages(history);
        }
      })
      .catch((error) => {
        console.error("Unable to load chat history", error);
      });
  }, [firebaseUser?.uid]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMessage = { role: "user" as const, content: text, time: now() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    if (firebaseUser?.uid) {
      await saveChatHistory(firebaseUser.uid, "user", text);
    }

    await new Promise((r) => setTimeout(r, 450 + Math.random() * 250));

    const response = await askMentor(text, profile);
    const assistantMessage = { role: "assistant" as const, content: response.reply, time: now() };
    setMessages((prev) => [...prev, assistantMessage]);

    if (firebaseUser?.uid) {
      await saveChatHistory(firebaseUser.uid, "assistant", response.reply);
    }

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
        <PageHeader title="AI Mentor" subtitle={`${language} + DSA · FAANG Strategy · Career Advisor`} />
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
            placeholder={`Ask about ${language}, DSA, FAANG strategy, projects...`}
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
