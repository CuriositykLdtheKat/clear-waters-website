import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { createBooking } from "@/lib/bookings.functions";

const title = "Book a Consultation | Clear Waters Bookkeeping";
const description =
  "Schedule a free 30-minute discovery call with Clear Waters Bookkeeping and get a flat-rate proposal for your small business books.";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/book" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/book" }],
  }),
  component: BookPage,
});

const fieldClass =
  "mt-2 w-full rounded-lg border border-input bg-card px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30";

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

const today = new Date().toISOString().split("T")[0];

function BookPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submitBooking = useServerFn(createBooking);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    try {
      await submitBooking({
        data: {
          name: formData.get("name") as string,
          email: formData.get("email") as string,
          phone: formData.get("phone") as string,
          businessName: formData.get("businessName") as string,
          preferredDate: formData.get("preferredDate") as string,
          preferredTime: formData.get("preferredTime") as string,
          message: formData.get("message") as string,
        },
      });
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <section className="mx-auto grid max-w-6xl gap-16 px-6 py-20 md:grid-cols-2">
      <div>
        <p className="eyebrow">Book a consultation</p>
        <h1 className="mt-5 font-display text-5xl">Let's find time to talk</h1>
        <p className="mt-5 text-lg text-muted-foreground">
          Pick a preferred date and time for a free 30-minute discovery call. We'll confirm by email
          within one business day.
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
            <dt className="font-semibold">Where we work</dt>
            <dd className="text-muted-foreground">Fully remote, serving clients nationwide</dd>
          </div>
        </dl>
      </div>

      <div className="rounded-2xl border border-border bg-card p-8 shadow-soft">
        {sent ? (
          <div className="py-12 text-center">
            <h2 className="font-display text-2xl">Consultation request received.</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              We'll confirm your preferred time within one business day.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-semibold" htmlFor="name">
                Name
              </label>
              <input id="name" name="name" required className={fieldClass} />
            </div>
            <div>
              <label className="text-sm font-semibold" htmlFor="email">
                Email
              </label>
              <input id="email" name="email" type="email" required className={fieldClass} />
            </div>
            <div>
              <label className="text-sm font-semibold" htmlFor="phone">
                Phone
              </label>
              <input id="phone" name="phone" type="tel" className={fieldClass} />
            </div>
            <div>
              <label className="text-sm font-semibold" htmlFor="businessName">
                Business name
              </label>
              <input id="businessName" name="businessName" className={fieldClass} />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="text-sm font-semibold" htmlFor="preferredDate">
                  Preferred date
                </label>
                <input
                  id="preferredDate"
                  name="preferredDate"
                  type="date"
                  min={today}
                  required
                  className={fieldClass}
                />
              </div>
              <div>
                <label className="text-sm font-semibold" htmlFor="preferredTime">
                  Preferred time
                </label>
                <select id="preferredTime" name="preferredTime" required className={fieldClass}>
                  <option value="">Select a time</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold" htmlFor="message">
                What do you need help with?
              </label>
              <textarea id="message" name="message" rows={4} className={fieldClass} />
            </div>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <button
              type="submit"
              className="w-full rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Request consultation
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
