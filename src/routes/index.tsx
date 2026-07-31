import { createFileRoute, Link } from "@tanstack/react-router";
import heroWater from "@/assets/hero-water.jpg";

const title = "Clear Waters Bookkeeping | Small Business Bookkeeping";
const description =
  "Navigating your finances so you can sail your business forward. Monthly bookkeeping, clean-ups, and clear reporting for small businesses.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Clear Waters Bookkeeping",
          description,
          slogan: "Navigating your finances so you can sail your business forward.",
          email: "hello@clearwatersbookkeeping.com",
          areaServed: "US",
          url: "/",
        }),
      },
    ],
  }),
  component: Index,
});

const services = [
  {
    name: "Monthly bookkeeping",
    copy: "Transactions categorized, accounts reconciled, and books closed on a predictable schedule.",
  },
  {
    name: "Catch-up & clean-up",
    copy: "Behind or inherited a mess? We rebuild your ledger and get you current, tax-ready, and calm.",
  },
  {
    name: "Reporting & insight",
    copy: "Plain-English monthly reports so you know your margins, runway, and what to do next.",
  },
];

function Index() {
  return (
    <>
      <section className="relative overflow-hidden">
        <img
          src={heroWater}
          alt="Calm sunlit water"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/80" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-6 py-28 text-center sm:py-36">
          <p className="eyebrow">Bookkeeping for small business</p>
          <h1 className="mt-4 font-flowing text-4xl leading-[1.2] sm:text-5xl">
            Navigating your finances so you can sail your business forward.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Clear Waters Bookkeeping keeps your numbers accurate, current, and easy to
            understand — so you can spend your time running the business, not reconciling it.
          </p>
          <div className="mt-10">
            <Link
              to="/contact"
              className="inline-flex rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground shadow-soft transition-opacity hover:opacity-90"
            >
              Schedule a free consultation
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="max-w-xl font-display text-4xl">What we take off your plate</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.name}
              className="rounded-2xl border border-border bg-card p-8 shadow-soft"
            >
              <h3 className="font-display text-2xl">{s.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
            </article>
          ))}
        </div>
        <Link to="/services" className="mt-10 inline-block text-sm font-semibold text-primary hover:underline">
          See all services →
        </Link>
      </section>

      <section className="surface-mist border-y border-border">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2">
          <div>
            <p className="eyebrow">How it works</p>
            <h2 className="mt-4 font-display text-4xl">Three steps to clear water</h2>
          </div>
          <ol className="space-y-8">
            {[
              ["Discovery call", "A free 30-minute conversation about your business, systems, and where things stand."],
              ["Custom proposal", "A flat monthly rate scoped to your volume — no surprise invoices, ever."],
              ["Steady bookkeeping", "Monthly closes, reconciliations, and reports delivered on time, every time."],
            ].map(([step, copy], i) => (
              <li key={step} className="flex gap-5">
                <span className="font-display text-3xl text-primary">0{i + 1}</span>
                <div>
                  <h3 className="text-lg font-semibold">{step}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h2 className="font-display text-4xl">Ready for books you can trust?</h2>
        <p className="mt-4 text-muted-foreground">
          New clients welcome — we're taking on a limited number of businesses as we launch.
        </p>
        <Link
          to="/contact"
          className="mt-8 inline-flex rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground shadow-soft transition-opacity hover:opacity-90"
        >
          Get in touch
        </Link>
      </section>
    </>
  );
}
