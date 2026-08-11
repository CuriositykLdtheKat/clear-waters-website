import { auth, defineMcp, type McpDefinitionInput } from "@lovable.dev/mcp-js";
import getSiteInfoTool from "./tools/get-site-info";
import listBookingsTool from "./tools/list-bookings";
import createBookingTool from "./tools/create-booking";

// The OAuth issuer must be the direct Supabase host, which survives publish.
const projectRef = import.meta.env['VITE_SUPABASE_PROJECT_ID'] ?? "project-ref-unset";

export default defineMcp({
  name: "clear-waters-website",
  title: "Clear Waters Website",
  version: "0.1.0",
  instructions:
    "Tools for Clear Waters Bookkeeping. Use `get_site_info` for services, pricing, and contact details; `list_bookings` to review consultation requests; `create_booking` to submit a consultation request for a client.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [getSiteInfoTool, listBookingsTool, createBookingTool] as McpDefinitionInput["tools"],
});