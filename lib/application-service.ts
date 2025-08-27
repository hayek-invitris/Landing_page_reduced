// import { supabase } from '@/lib/supabase'; // Moved to dynamic import
// import { sanitizeJobApplicationForm } from '@/lib/sanitization'; // Temporarily disabled

export interface JobApplication {
  positionId: string;
  positionTitle: string;
  department: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  coverLetter: string;
  resumeFile: File | null;
}

/**
 * Submit a job application to Supabase
 * This function handles both the metadata submission and file upload
 * TEMPORARILY DISABLED - Supabase not configured yet
 */
export async function submitJobApplication(application: JobApplication): Promise<{ success: boolean; error?: string }> {
  // Temporarily return success without actual submission
  console.warn('Job application submission is temporarily disabled - Supabase not configured');
  console.log('Application data received:', application.positionTitle, application.firstName, application.lastName);
  
  return {
    success: true,
    error: undefined
  };
  
  /*
  // Original implementation - temporarily commented out
  try {
    // Dynamic import to avoid build-time errors
    const { supabase } = await import('@/lib/supabase');
    
    // Server-side sanitization as backup security measure
    const sanitizedData = sanitizeJobApplicationForm({
      firstName: application.firstName,
      lastName: application.lastName,
      email: application.email,
      phone: application.phone || '',
      coverLetter: application.coverLetter,
    });
    
    if (!sanitizedData.isValid) {
      return {
        success: false,
        error: `Validation failed: ${sanitizedData.errors.join(', ')}`
      };
    }
    
    // First upload the file if it exists
    let resumeUrl = null;
    
    if (application.resumeFile) {
      const timestamp = new Date().getTime();
      const fileExt = application.resumeFile.name.split('.').pop();
      const fileName = `${application.positionId}_${sanitizedData.lastName.toLowerCase()}_${sanitizedData.firstName.toLowerCase()}_${timestamp}.${fileExt}`;
      const filePath = `resumes/${fileName}`;
      
      // Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('job_applications')
        .upload(filePath, application.resumeFile);
      
      if (uploadError) {
        console.error('Resume upload error:', uploadError);
        throw new Error(`Failed to upload resume: ${uploadError.message}`);
      }
      
      // Get the public URL
      const { data: urlData } = supabase.storage
        .from('job_applications')
        .getPublicUrl(filePath);
      
      resumeUrl = urlData.publicUrl;
    }
    
    // Now insert the application data into the database using sanitized data
    const { error: insertError } = await supabase
      .from('job_applications')
      .insert([
        {
          position_id: application.positionId,
          position_title: application.positionTitle,
          department: application.department,
          first_name: sanitizedData.firstName,
          last_name: sanitizedData.lastName,
          email: sanitizedData.email,
          phone: sanitizedData.phone || null,
          cover_letter: sanitizedData.coverLetter,
          resume_url: resumeUrl,
          applied_at: new Date().toISOString(),
        },
      ]);
    
    if (insertError) {
      console.error('Application submission error:', insertError);
      throw new Error(`Failed to submit application: ${insertError.message}`);
    }
    
    return { success: true };
  } catch (error) {
    console.error('Job application error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
  */
} 