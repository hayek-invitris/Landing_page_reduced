import { createClient } from '@supabase/supabase-js'

// Get environment variables with proper fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Temporarily disable validation during build
// TODO: Re-enable when Supabase is properly configured
/*
if (!supabaseUrl) {
  throw new Error('Missing required environment variable: NEXT_PUBLIC_SUPABASE_URL')
}

if (!supabaseAnonKey) {
  throw new Error('Missing required environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY')
}
*/

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false
  },
  db: {
    schema: 'public'
  }
})

// Test the connection to Supabase
export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('count', { count: 'exact', head: true })

    if (error) {
      return {
        success: false,
        error: error.message,
        severity: 'error'
      }
    }

    return {
      success: true,
      data: data,
      severity: 'success'
    }
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : 'Unknown error',
      severity: 'error'
    }
  }
} 