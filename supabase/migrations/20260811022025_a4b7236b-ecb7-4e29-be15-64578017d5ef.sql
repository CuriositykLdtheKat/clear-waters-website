CREATE POLICY "Owner can view bookings" ON public.bookings FOR SELECT TO authenticated USING (lower(auth.jwt() ->> 'email') = 'info@clearwatersbookkeeping.com');
CREATE POLICY "Owner can create bookings" ON public.bookings FOR INSERT TO authenticated WITH CHECK (lower(auth.jwt() ->> 'email') = 'info@clearwatersbookkeeping.com');
GRANT SELECT, INSERT ON public.bookings TO authenticated;