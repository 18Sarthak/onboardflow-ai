import { useState } from "react";
import { Loader2, Send } from "lucide-react";

const EXAMPLES = [
  "I need my laptop and email set up before my start date next Monday.",
  "Can you walk me through the Day 1 onboarding schedule?",
  "I haven't received my NDA or emergency contact form yet.",
];

export function RequestForm({
  onSubmit,
  isSubmitting,
  disabled,
}: {
  onSubmit: (values: { employeeName: string; message: string }) => void;
  isSubmitting: boolean;
  disabled: boolean;
}) {
  const [employeeName, setName] = useState("");
  const [message, setMessage] = useState("");

  const inputClass =
    "w-full rounded-lg border border-[#1e1e2e] bg-[#0a0a0f] px-3 py-2.5 text-sm text-[#f1f0ff] placeholder:text-[#4a4a63] outline-none transition-colors focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20";

  return (
    <div className="rounded-xl border border-[#1e1e2e] bg-[#13131a] p-6">
      <h2 className="text-lg font-semibold tracking-tight text-[#f1f0ff]">
        Submit an Onboarding Request
      </h2>
      <p className="mt-1 text-sm text-[#6b6b8a]">
        Describe what you need in plain English. Our AI agent will handle the rest.
      </p>

      <form
        className="mt-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (!employeeName.trim() || !message.trim()) return;
          onSubmit({ employeeName: employeeName.trim(), message: message.trim() });
        }}
      >
        <div>
          <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-[#f1f0ff]">
            Your Name
          </label>
          <input
            id="name"
            value={employeeName}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Sarah Chen"
            className={inputClass}
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-[#f1f0ff]">
            Describe your request
          </label>
          <textarea
            id="message"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="e.g. I'm joining the engineering team on October 1st and need my laptop, email setup, and access to GitHub and Jira. Also want to know about the 30/60/90 plan."
            className={`${inputClass} resize-y`}
            required
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              aria-label={`Use example: ${ex}`}
              onClick={() => setMessage(ex)}
              className="rounded-full border border-[#1e1e2e] bg-[#0a0a0f] px-3 py-1.5 text-left text-xs text-[#6b6b8a] transition-colors hover:border-[#7c3aed]/50 hover:text-[#f1f0ff]"
            >
              {ex.length > 46 ? `${ex.slice(0, 46)}…` : ex}
            </button>
          ))}
        </div>

        <button
          type="submit"
          aria-label="Send request to AI agent"
          disabled={isSubmitting || disabled}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#a855f7] px-4 py-2.5 text-sm font-medium text-white shadow-[0_0_24px_rgba(124,58,237,0.25)] transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Processing…
            </>
          ) : (
            <>
              Send to AI Agent <Send className="h-4 w-4" />
            </>
          )}
        </button>
        {disabled && !isSubmitting && (
          <p className="text-center text-xs text-[#6b6b8a]">
            A request is already being tracked. Clear it to start over.
          </p>
        )}
      </form>
    </div>
  );
}
