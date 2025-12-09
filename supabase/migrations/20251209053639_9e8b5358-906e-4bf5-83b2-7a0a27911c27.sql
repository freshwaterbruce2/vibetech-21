-- Create saved_content table
CREATE TABLE public.saved_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  content_type TEXT NOT NULL,
  tone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.saved_content ENABLE ROW LEVEL SECURITY;

-- RLS policies - users can only access their own content
CREATE POLICY "Users can view their own saved content"
ON public.saved_content
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own saved content"
ON public.saved_content
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own saved content"
ON public.saved_content
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved content"
ON public.saved_content
FOR DELETE
USING (auth.uid() = user_id);

-- Add trigger for updated_at
CREATE TRIGGER update_saved_content_updated_at
BEFORE UPDATE ON public.saved_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();