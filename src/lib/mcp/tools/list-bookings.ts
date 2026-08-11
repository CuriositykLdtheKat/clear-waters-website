import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_bookings",
  title: "List bookings",
  description:
    "List consultation requests submitted through the Clear Waters Bookkeeping website, newest first.",
  inputSchema: {
    limit: z.number().int().min(1).max(100).default(20).describe("How many bookings to return."),
    status: z
      .string()
      .trim()
      .min(1)
      .optional()
      .describe("Optional status filter, e.g. 'pending'."),
  },
  annotations: { readOnlyHint: true, openWorldHint: false },
  handler: async ({ limit, status }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text" as const, text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    let query = supabase
      .from("bookings")
      .select("id, name, email, phone, business_name, preferred_date, preferred_time, message, status, created_at")
      .order("created_at", { ascending: false })
      .limit(limit ?? 20);
    if (status) query = query.eq("status", status);

    const { data, error } = await query;
    if (error) {
      return { content: [{ type: "text" as const, text: error.message }], isError: true };
    }
    const rows = data ?? [];
    if (rows.length === 0) {
      return {
        content: [
          {
            type: "text" as const,
            text: "No bookings found (or this account does not have access to bookings).",
          },
        ],
        structuredContent: { bookings: [] },
      };
    }
    return {
      content: [{ type: "text" as const, text: JSON.stringify(rows, null, 2) }],
      structuredContent: { bookings: rows },
    };
  },
});