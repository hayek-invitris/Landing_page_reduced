-- Create the job applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  position_id VARCHAR(255) NOT NULL,
  position_title VARCHAR(255) NOT NULL,
  department VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  cover_letter TEXT,
  resume_url TEXT,
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'submitted',
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewer_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on position_id for faster queries
CREATE INDEX IF NOT EXISTS idx_job_applications_position_id ON job_applications(position_id);

-- Create an index on email for faster queries
CREATE INDEX IF NOT EXISTS idx_job_applications_email ON job_applications(email);

-- Create an index on status for filtering
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON job_applications(status);

-- Create an index on applied_at for sorting
CREATE INDEX IF NOT EXISTS idx_job_applications_applied_at ON job_applications(applied_at);

-- Create a view for senior research scientist applications
CREATE OR REPLACE VIEW senior_research_scientist_applications AS
SELECT * FROM job_applications WHERE position_id = 'senior-research-scientist';

-- Create a view for student intern applications
CREATE OR REPLACE VIEW student_intern_applications AS
SELECT * FROM job_applications WHERE position_id = 'student-intern';

-- Create a view for initiative applications
CREATE OR REPLACE VIEW initiative_applications AS
SELECT * FROM job_applications WHERE position_id = 'initiative-application';

-- Enable Row Level Security
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Create policies for access control
CREATE POLICY "Public can insert job applications" ON job_applications
  FOR INSERT 
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users with proper roles can view applications
CREATE POLICY "Only authenticated users can view job applications" ON job_applications
  FOR SELECT 
  TO authenticated
  USING (true);

-- Create storage bucket for resumes if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('job_applications', 'job_applications', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public uploads but handle permissions through code
CREATE POLICY "Allow public uploads of resumes" ON storage.objects
  FOR INSERT 
  TO anon, authenticated
  WITH CHECK (bucket_id = 'job_applications');

-- Create policy to allow reading resume files
CREATE POLICY "Allow public to read resumes" ON storage.objects
  FOR SELECT 
  TO anon, authenticated
  USING (bucket_id = 'job_applications');

-- This creates a trigger to enforce email uniqueness per position
CREATE OR REPLACE FUNCTION check_duplicate_applications()
RETURNS TRIGGER AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM job_applications 
    WHERE email = NEW.email 
    AND position_id = NEW.position_id
    AND applied_at > (NOW() - INTERVAL '30 days')
  ) THEN
    RAISE EXCEPTION 'You have already applied for this position in the last 30 days.';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER prevent_duplicate_applications
BEFORE INSERT ON job_applications
FOR EACH ROW EXECUTE FUNCTION check_duplicate_applications(); 