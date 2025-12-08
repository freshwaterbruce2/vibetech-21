-- Allow authenticated users to delete leads
CREATE POLICY "Authenticated users can delete leads" 
ON public.leads
FOR DELETE
TO authenticated
USING (auth.uid() IS NOT NULL);

-- Also add UPDATE policy for future editing capability
CREATE POLICY "Authenticated users can update leads"
ON public.leads
FOR UPDATE
TO authenticated
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);