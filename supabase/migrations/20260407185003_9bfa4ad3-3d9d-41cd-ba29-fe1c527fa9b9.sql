DROP POLICY IF EXISTS "Users can insert their own role on signup" ON public.user_roles;

CREATE POLICY "Users can create their own student role"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND role = 'student'::public.app_role
);