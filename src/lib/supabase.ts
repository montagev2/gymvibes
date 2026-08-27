import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xumxkdjauqblaxyldkwy.supabase.co'
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1bXhrZGphdXFibGF4eWxka3d5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4MDY1MTgsImV4cCI6MjEwMzM4MjUxOH0.YvJ3JnCgoS1G7_HkNtk5ms0dSBJRiolA3YLwDgnGaiI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
