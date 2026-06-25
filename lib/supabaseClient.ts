import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://liakzsqrqzysprpweysw.supabase.co'; 
const supabaseKey = 'sb_publishable_kuzl...'; // ใส่คีย์เต็มๆ ของพี่นะครับ

export const supabase = createClient(supabaseUrl, supabaseKey);