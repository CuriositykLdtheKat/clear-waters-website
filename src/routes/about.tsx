import { createFileRoute, Link } from "@tanstack/react-router";

const title = "About | Clear Waters Bookkeeping";
const description =
  "Clear Waters Bookkeeping is a small-business bookkeeping practice built on accuracy, clarity, and steady communication.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: AboutPage,
});

const values = [
  ["Clarity first", "Reports you can actually read, and answers without accounting jargon."],
  ["Accuracy always", "Reconciled to the penny, with a documented monthly close process."],
  ["Steady communication", "You'll never wonder where things stand or wait days for a reply."],
];

function AboutPage() {
  return (
    <>
      <section className="surface-mist border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <p className="eyebrow">About</p>
          <h1 className="mt-5 font-display text-5xl">A steady hand on your books</h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20">
        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            Clear Waters Bookkeeping was founded on a simple observation: most small business
            owners aren't afraid of their numbers — they just never get them on time, in a form
            that makes sense.
          </p>
          <p>
            We work with service businesses, contractors, creatives, and shops who want to stop
            guessing. That means a clean ledger, a close that happens on schedule, and a monthly
            summary written in plain language, not spreadsheet shorthand.
          </p>
          <p>
            As a newly launching practice, we're intentionally taking on a limited roster of
            clients so every set of books gets real attention.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {values.map(([name, copy]) => (
            <div key={name} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h2 className="font-display text-xl">{name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{copy}</p>
            </div>
          ))}
        </div>

        <p className="mt-16 border-l-2 border-primary pl-6 font-display text-2xl italic">
          Navigating your finances so you can sail your business forward.
        </p>

        <Link
          to="/contact"
          className="mt-12 inline-flex rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground shadow-soft transition-opacity hover:opacity-90"
        >
          Start the conversation
        </Link>
      </section>
    </>
  );
}