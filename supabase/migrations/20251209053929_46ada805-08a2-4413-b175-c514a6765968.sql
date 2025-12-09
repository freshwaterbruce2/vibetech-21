-- Add tags column to saved_content table
ALTER TABLE public.saved_content 
ADD COLUMN tags TEXT[] DEFAULT '{}';