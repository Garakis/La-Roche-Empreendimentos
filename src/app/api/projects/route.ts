import { NextResponse } from 'next/server';
import { mockProjects } from '@/lib/data';
import { supabase } from '@/lib/supabase';

export async function GET() {
  // If Supabase is configured with a valid URL (not the placeholder)
  if (!supabase['supabaseUrl']?.includes('placeholder')) {
    const { data, error } = await supabase.from('projects').select('*').order('order', { ascending: true });
    if (!error && data && data.length > 0) {
      return NextResponse.json(data);
    }
  }
  
  // Fallback to local mock data
  return NextResponse.json(mockProjects.sort((a,b) => a.order - b.order));
}

export async function POST(request: Request) {
  try {
    const projects = await request.json();
    
    if (!supabase['supabaseUrl']?.includes('placeholder')) {
      // Upsert the projects into Supabase
      const { error } = await supabase.from('projects').upsert(projects);
      if (error) throw error;
      return NextResponse.json({ success: true });
    }
    
    // In local dev without DB, we can't persist changes permanently 
    // without writing to the file system (which doesn't work in Vercel prod)
    // So we just return success to simulate the saving process.
    return NextResponse.json({ success: true, simulated: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
  }
}
