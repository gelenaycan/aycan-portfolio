import { useEffect, useRef, useState } from "react";
export default function Chat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [pending, setPending] = useState(false);
  const field = useRef(null);
  const end = useRef(null);
  const launcher = useRef(null);
  useEffect(() => {
    if (open) field.current?.focus();
  }, [open]);
  useEffect(() => {
    end.current?.scrollIntoView({ block: "nearest" });
  }, [messages, pending]);
  function close() {
    setOpen(false);
    launcher.current?.focus();
  }
  async function send(event) {
    event.preventDefault();
    const message = input.trim();
    if (!message || pending) return;
    setMessages((previous) => [...previous, { role: "user", text: message }]);
    setInput("");
    setPending(true);
    try {
      const response = await fetch("/.netlify/functions/aycan-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
        signal: AbortSignal.timeout(25000),
      });
      const data = await response.json();
      if (!response.ok || typeof data.reply !== "string")
        throw new Error("Unavailable");
      setMessages((previous) => [
        ...previous,
        { role: "assistant", text: data.reply },
      ]);
    } catch {
      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text: "The assistant is unavailable right now. You can explore my experience above or email gelenaycan@gmail.com.",
        },
      ]);
    } finally {
      setPending(false);
    }
  }
  return (
    <div className="chat-widget">
      {open && (
        <section
          className="chat-panel"
          id="assistant"
          aria-label="Aycan AI assistant"
          onKeyDown={(e) => {
            if (e.key === "Escape") close();
          }}
        >
          <header>
            <div>
              <strong>Aycan AI</strong>
              <span>Portfolio assistant</span>
            </div>
            <button onClick={close} aria-label="Close assistant">
              ×
            </button>
          </header>
          <div className="chat-messages" role="log" aria-live="polite">
            <p className="chat-welcome">
              Ask about my experience, projects, or skills. AI answers may
              contain mistakes; my résumé is the source of truth.
            </p>
            {messages.map((m, i) => (
              <p className={`message ${m.role}`} key={i}>
                {m.text}
              </p>
            ))}
            {pending && <p role="status">Thinking…</p>}
            <div ref={end} />
          </div>
          <form onSubmit={send}>
            <label htmlFor="chat-input">Your question</label>
            <div>
              <input
                id="chat-input"
                ref={field}
                value={input}
                maxLength={1500}
                onChange={(e) => setInput(e.target.value)}
                placeholder="What has Aycan built?"
                required
              />
              <button disabled={pending || !input.trim()} type="submit">
                Send
              </button>
            </div>
            <small>
              Your question is sent to OpenAI to generate a reply. Please avoid
              sharing sensitive information.
            </small>
          </form>
        </section>
      )}
      <button
        className="chat-launcher"
        ref={launcher}
        aria-expanded={open}
        aria-controls={open ? "assistant" : undefined}
        onClick={() => (open ? close() : setOpen(true))}
      >
        <span aria-hidden="true">✳</span> Ask Aycan AI
      </button>
    </div>
  );
}
