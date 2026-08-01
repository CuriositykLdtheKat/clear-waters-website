import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const bookingSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().trim().email("Invalid email address").max(255, "Email is too long"),
  phone: z.string().trim().max(50, "Phone number is too long").optional().or(z.literal("")),
  businessName: z.string().trim().max(100, "Business name is too long").optional().or(z.literal("")),
  preferredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please select a valid date"),
  preferredTime: z.string().trim().min(1, "Please select a preferred time"),
  message: z.string().trim().max(1000, "Message is too long").optional().or(z.literal("")),
});

export const createBooking = createServerFn({ method: "POST" })
  .validator((data) => bookingSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("bookings").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      business_name: data.businessName || null,
      preferred_date: data.preferredDate,
      preferred_time: data.preferredTime,
      message: data.message || null,
    });
    if (error) {
      console.error("Booking insert failed:", error);
      throw new Error("Could not save booking request. Please try again.");
    }
    return { success: true };
  });
