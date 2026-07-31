import { createFileRoute, Link } from "@tanstack/react-router";

const title = "Services | Clear Waters Bookkeeping";
const description =
  "Monthly bookkeeping, catch-up and clean-up work, payroll coordination, and clear financial reporting for small businesses.";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/services" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

const services = [
  {
    name: "Monthly bookkeeping",
    copy: "Categorized transactions, reconciled bank and credit card accounts, and a closed set of books every month.",
    items: ["Bank & card reconciliation", "Expense categorization", "Monthly close checklist"],
  },
  {
    name: "Catch-up & clean-up",
    copy: "For books that are months behind or were never set up properly. We rebuild your history so it's accurate and tax-ready.",
    items: ["Prior-period rebuilds", "Chart of accounts repair", "Tax-prep handoff package"],
  },
  {
    name: "Financial reporting",
    copy: "Profit & loss, balance sheet, and cash flow — with a short written summary of what changed and why.",
    items: ["P&L and balance sheet", "Cash flow snapshot", "Plain-English commentary"],
  },
  {
    name: "Accounts payable & receivable",
    copy: "Keep invoices going out and bills getting paid on time, so cash keeps moving in the right direction.",
    items: ["Invoice creation & follow-up", "Bill scheduling", "Aging reviews"],
  },
  {
    name: "Software setup & migration",
    copy: "Get set up in QuickBooks Online or Xero correctly the first time, with the integrations you actually need.",
    items: ["QuickBooks / Xero setup", "App integrations", "Workflow documentation"],
  },
  {
    name: "Advisory check-ins",
    copy: "A recurring call to review numbers, plan for taxes and slow seasons, and make decisions with confidence.",
    items: ["Quarterly review calls", "Budget vs. actual", "Cash planning"],
  },
];

function ServicesPage() {
  return (
    <>
      <section className="surface-mist border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <p className="eyebrow">Services</p>
          <h1 className="mt-5 font-display text-5xl">Bookkeeping, scoped to your business</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Every engagement is priced at a flat monthly rate based on your transaction volume
            and complexity. No hourly surprises, no long contracts.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <article key={s.name} className="rounded-2xl border border-border bg-card p-8 shadow-soft">
              <h2 className="font-display text-2xl">{s.name}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {s.items.map((i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-primary">—</span>
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-2xl surface-deep px-8 py-12 text-center">
          <h2 className="font-display text-3xl">Not sure which you need?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm opacity-85">
            Most clients start with a discovery call. We'll look at where your books stand and
            recommend the right starting point.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex rounded-full bg-background px-8 py-3 font-semibold text-primary transition-opacity hover:opacity-90"
          >
            Book a discovery call
          </Link>
        </div>
      </section>
    </>
  );
}