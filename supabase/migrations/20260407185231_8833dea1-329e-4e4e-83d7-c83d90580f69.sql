DROP POLICY IF EXISTS "Authenticated users can view achievements" ON public.achievements;

CREATE POLICY "Admins can view achievements"
ON public.achievements
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));