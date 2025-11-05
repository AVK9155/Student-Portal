-- Create achievements table
CREATE TABLE public.achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  student_id TEXT NOT NULL,
  achievement_title TEXT NOT NULL,
  category TEXT NOT NULL,
  level TEXT NOT NULL,
  achievement_date DATE NOT NULL,
  description TEXT,
  added_by TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

-- Create policies for achievements (public read access for demo, in production you'd want authentication)
CREATE POLICY "Anyone can view achievements" 
ON public.achievements 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create achievements" 
ON public.achievements 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update achievements" 
ON public.achievements 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete achievements" 
ON public.achievements 
FOR DELETE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_achievements_updated_at
BEFORE UPDATE ON public.achievements
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance
CREATE INDEX idx_achievements_student_id ON public.achievements(student_id);
CREATE INDEX idx_achievements_category ON public.achievements(category);
CREATE INDEX idx_achievements_date ON public.achievements(achievement_date DESC);