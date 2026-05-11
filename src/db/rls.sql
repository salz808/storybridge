-- Enable RLS on tenant tables
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;

-- Create policy for visitors table
-- This assumes we set a session variable 'app.current_church_id' for each request
CREATE POLICY church_isolation_policy ON visitors
FOR ALL
USING (church_id = current_setting('app.current_church_id')::uuid)
WITH CHECK (church_id = current_setting('app.current_church_id')::uuid);

-- Example of how to set the context in a transaction:
-- SET LOCAL app.current_church_id = 'some-uuid';
-- SELECT * FROM visitors;
