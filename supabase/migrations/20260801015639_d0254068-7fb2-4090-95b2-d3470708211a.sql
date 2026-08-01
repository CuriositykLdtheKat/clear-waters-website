REVOKE INSERT ON public.bookings FROM anon;
REVOKE INSERT ON public.bookings FROM authenticated;
DROP POLICY IF EXISTS "Anyone can submit a booking request" ON public.bookings;