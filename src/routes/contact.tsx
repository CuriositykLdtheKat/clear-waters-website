import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

const title = "Contact | Clear Waters Bookkeeping";
const description =
  "Book a free discovery call with Clear Waters Bookkeeping and get a flat-rate proposal for your small business books.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const fieldClass =
  "mt-2 w-full rounded-lg border border-input bg-card px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30";

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <section className="mx-auto grid max-w-6xl gap-16 px-6 py-20 md:grid-cols-2">
      <div>
        <p className="eyebrow">Contact</p>
        <h1 className="mt-5 font-display text-5xl">Let's talk about your books</h1>
        <p className="mt-5 text-lg text-muted-foreground">
          Tell me a little about your business and I'll follow up within one business day to
          schedule a free 30-minute discovery call.
        </p>
        <dl className="mt-10 space-y-4 text-sm">
          <div>
            <dt className="font-semibold">Email</dt>
            <dd className="text-muted-foreground">hello@clearwatersbookkeeping.com</dd>
          </div>
          <div>
            <dt className="font-semibold">Hours</dt>
            <dd className="text-muted-foreground">Monday – Friday, 9am – 5pm</dd>
          </div>
          <div>
            <dt className="font-semibold">Where I work</dt>
            <dd className="text-muted-foreground">Fully remote, serving clients nationwide</dd>
          </div>
        </dl>
      </div>

      <div className="rounded-2xl border border-border bg-card p-8 shadow-soft">
        {sent ? (
          <div className="py-12 text-center">
            <h2 className="font-display text-2xl">Thank you — message received.</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              I'll be in touch within one business day.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="space-y-5"
          >
            <div>
              <label className="text-sm font-semibold" htmlFor="name">Name</label>
              <input id="name" name="name" required className={fieldClass} />
            </div>
            <div>
              <label className="text-sm font-semibold" htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required className={fieldClass} />
            </div>
            <div>
              <label className="text-sm font-semibold" htmlFor="business">Business name</label>
              <input id="business" name="business" className={fieldClass} />
            </div>
            <div>
              <label className="text-sm font-semibold" htmlFor="message">
                What do you need help with?
              </label>
              <textarea id="message" name="message" rows={5} className={fieldClass} />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Send message
            </button>
            <p className="text-xs text-muted-foreground">
              Submissions aren't stored yet — connect a backend to receive them by email.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}