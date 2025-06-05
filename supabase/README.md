# Supabase Setup for Job Applications

This directory contains SQL migrations and setup instructions for the Supabase backend of the job application system.

## Table Structure

The system uses the following tables:

1. `job_applications` - Stores all job application submissions
2. Views for each job position type:
   - `senior_research_scientist_applications`
   - `student_intern_applications`
   - `initiative_applications`

## Setting Up in Supabase

### Option 1: Using the Web Interface

1. Log in to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Create a new query
4. Copy the contents of `migrations/jobs_applications_tables.sql`
5. Run the SQL query

### Option 2: Using Supabase CLI

If you have the Supabase CLI installed:

```bash
supabase login
supabase link --project-ref <your-project-ref>
supabase db push
```

## Storage Setup

The system uses a storage bucket named `job_applications` for storing resume files. This bucket is configured with the following permissions:

- Anyone can upload files (controlled by application logic)
- Anyone can read files (public PDFs)

## Row Level Security

Row-level security is enabled with the following policies:

- Anyone can submit job applications
- Only authenticated users can view job applications

## Database Views

To help organize applications by position, we've created views for each job type. You can query these views directly in your admin panel or application backend.

## Potential Issues and Troubleshooting

1. **Storage Upload Failures**: Ensure your Supabase project has enough storage space and that file size limits are appropriate.

2. **Duplicate Applications**: The system prevents the same email from applying to the same position within 30 days. This is enforced by a database trigger.

3. **RLS Policies**: If you're having trouble accessing data, check that your RLS policies are correctly configured.

## Running Migrations

Any time you need to update the database schema, add a new SQL file to the `migrations` directory with a timestamp prefix and then run:

```bash
supabase db push
``` 