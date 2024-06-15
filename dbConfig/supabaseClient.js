
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ndksaratonrsyayaiqkr.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ka3NhcmF0b25yc3lheWFpcWtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgzNjkxNzMsImV4cCI6MjAzMzk0NTE3M30.wXl1PIHfjkXx2FUQ0HgfRuJ4KfXQxvZoKRNawArHDK4"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;