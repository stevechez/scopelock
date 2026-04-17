-- 1. Allow you to UPLOAD and MANAGE files
CREATE POLICY "Contractors can upload project files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'project-files');

CREATE POLICY "Contractors can update/delete their files"
ON storage.objects FOR ALL
TO authenticated
USING (bucket_id = 'project-files');

-- 2. Allow anyone with the link to VIEW the files
-- (This is what makes the Homeowner Portal work)
CREATE POLICY "Public can view project files"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'project-files');