-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'student');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles table
CREATE POLICY "Users can view their own roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own role on signup"
  ON public.user_roles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Update achievements RLS policies to use roles
DROP POLICY IF EXISTS "Anyone can view achievements" ON public.achievements;
DROP POLICY IF EXISTS "Anyone can create achievements" ON public.achievements;
DROP POLICY IF EXISTS "Anyone can update achievements" ON public.achievements;
DROP POLICY IF EXISTS "Anyone can delete achievements" ON public.achievements;

-- Students can view all achievements
CREATE POLICY "Authenticated users can view achievements"
  ON public.achievements
  FOR SELECT
  TO authenticated
  USING (true);

-- Only admins can create achievements
CREATE POLICY "Admins can create achievements"
  ON public.achievements
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can update achievements
CREATE POLICY "Admins can update achievements"
  ON public.achievements
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete achievements
CREATE POLICY "Admins can delete achievements"
  ON public.achievements
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));