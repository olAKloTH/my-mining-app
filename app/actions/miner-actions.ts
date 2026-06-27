'use server';

// แก้ชื่อ import ให้ตรงกับชื่อที่พี่ export ไว้ในไฟล์ lib/supabaseClient.ts
import { createServerSupabaseClient } from '@/lib/supabaseClient'; 

export async function getMinerData(userId: string) {
  // แก้ชื่อฟังก์ชันที่เรียกใช้ให้ตรงกันด้วย
  const supabase = createServerSupabaseClient(); 
  
  const { data, error } = await supabase
    .from('miners')
    .select(`
      *,
      wallet(balance)
    `)
    .eq('user_id', userId)
    .single();

  if (error) return null;
  return data;
}