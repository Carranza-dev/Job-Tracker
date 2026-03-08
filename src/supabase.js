import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yhrrvrlgpamprlyrdbpo.supabase.co'
const supabaseKey = 'sb_publishable_-FPuUzXJ7uMJekKWtOZzIQ_3YOotsT-'

export const supabase = createClient(supabaseUrl, supabaseKey)