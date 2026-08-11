import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

const title = "Sign in | Clear Waters Bookkeeping";
const description = "Sign in to Clear Waters Bookkeeping to manage bookings and connected apps.";

function safeNext(value: unknown): string {
  if (typeof value !== "string") return "/";
  if (!value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}

export const Route = createFileRoute("/auth")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({ next: safeNext(s['next']) }),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

const fieldClass =
  "mt-2 w-full rounded-lg border border-input bg-card px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30";

function AuthPage() {
  const { next } = Route.useSearch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const returnUrl = `${typeof window !== "undefined" ? window.location.origin : ""}${next}`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setNotice(null);
    if (mode === "signin") {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (err) return setError(err.message);
      window.location.href = next;
      return;
    }
    const { error: err } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: returnUrl },
    });
    setBusy(false);
    if (err) return setError(err.message);
    setNotice("Check your email to confirm your account, then sign in.");
  }

  async function handleGoogle() {
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: returnUrl });
    if (result.error) return setError(String(result.error));
    if (result.redirected) return;
    navigate({ to: next });
  }

  return (
    <section className="mx-auto flex max-w-md flex-col px-6 py-20">
      <h1 className="font-display text-4xl">Sign in</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Sign in to manage bookings and authorize connected apps.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label className="text-sm font-semibold" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label className="text-sm font-semibold" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={fieldClass}
          />
        </div>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        {notice ? <p className="text-sm text-muted-foreground">{notice}</p> : null}
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {mode === "signin" ? "Sign in" : "Create account"}
        </button>
      </form>

      <button
        type="button"
        onClick={handleGoogle}
        className="mt-4 w-full rounded-full border border-border px-6 py-3 font-semibold transition-colors hover:bg-muted"
      >
        Continue with Google
      </button>

      <button
        type="button"
        onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
        className="mt-6 text-sm text-muted-foreground underline"
      >
        {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
      </button>
    </section>
  );
}