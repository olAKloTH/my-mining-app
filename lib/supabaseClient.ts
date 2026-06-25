import { createClient } from '@supabase/supabase-js';

// ใส่ค่า URL จริง และ Key จริง ลงไปตรงๆ ใน '...' เลยครับ (ก๊อปมาจากหน้า Supabase)
const supabaseUrl = 'https://liakzsqrqzysprpweysw.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpYWt6c3FycXp5c3BycHdleXN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0MDU2MDYsImV4cCI6MjA5NTk4MTYwNn0.PS75x14BmxZ0K7hUay5lIVMUlLD40RyII30XCfHbaaM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);