import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const SITE_INFO = {
  business: "Clear Waters Bookkeeping",
  tagline: "Navigating your finances so you can sail your business forward.",
  positioning: "BOOKKEEPING FOR SMALL BUSINESSES",
  services: [
    {
      name: "Monthly bookkeeping",
      description:
        "Ongoing categorization, reconciliation, and month-end close so the books are always current.",
    },
    {
      name: "Catch-up & clean-up",
      description:
        "Bringing behind or messy books back to accurate, reconciled, tax-ready condition.",
    },
    {
      name: "Financial reporting",
      description:
        "Monthly profit & loss, balance sheet, and cash-flow reporting with plain-English commentary.",
    },
  ],
  pricing: "Flat monthly rates quoted after a free 30-minute discovery call.",
  contactEmail: "hello@clearwatersbookkeeping.com",
  hours: "Monday – Friday, 9am – 5pm",
  location: "Fully remote, serving clients nationwide",
  bookingPage: "/book",
};

export default defineTool({
  name: "get_site_info",
  title: "Get site info",
  description:
    "Return Clear Waters Bookkeeping's services, pricing approach, contact details, and hours.",
  inputSchema: {},
  outputSchema: {
    business: z.string(),
    tagline: z.string(),
    positioning: z.string(),
    services: z.array(z.object({ name: z.string(), description: z.string() })),
    pricing: z.string(),
    contactEmail: z.string(),
    hours: z.string(),
    location: z.string(),
    bookingPage: z.string(),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text" as const, text: JSON.stringify(SITE_INFO, null, 2) }],
    structuredContent: SITE_INFO,
  }),
});