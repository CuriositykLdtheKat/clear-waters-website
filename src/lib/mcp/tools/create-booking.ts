import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "create_booking",
  title: "Create booking",
  description:
    "Create a consultation request for Clear Waters Bookkeeping on behalf of a prospective client.",
  inputSchema: {
    name: z.string().trim().min(1).max(100).describe("Client's full name."),
    email: z.string().trim().email().max(255).describe("Client's email address."),
    preferredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).describe("Preferred date, YYYY-MM-DD."),
    preferredTime: z.string().trim().min(1).max(50).describe("Preferred time, e.g. '10:00 AM'."),
    phone: z.string().trim().max(50).nullable().describe("Phone number, or null."),
    businessName: z.string().trim().max(100).nullable().describe("Business name, or null."),
    message: z.string().trim().max(1000).nullable().describe("What they need help with, or null."),
  },
  outputSchema: {
    booking: z.record(z.string(), z.unknown()),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async (input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text" as const, text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("bookings")
      .insert({
        name: input.name,
        email: input.email,
        phone: input.phone,
        business_name: input.businessName,
        preferred_date: input.preferredDate,
        preferred_time: input.preferredTime,
        message: input.message,
      })
      .select("id, name, email, preferred_date, preferred_time, status")
      .single();

    if (error) {
      return { content: [{ type: "text" as const, text: error.message }], isError: true };
    }
    return {
      content: [{ type: "text" as const, text: `Booking created: ${JSON.stringify(data)}` }],
      structuredContent: { booking: data },
    };
  },
});