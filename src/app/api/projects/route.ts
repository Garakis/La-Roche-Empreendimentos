import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { mockProjects } from '@/lib/data';

// GET all projects
export async function GET() {
  const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');

  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order', { ascending: true });

    if (!error && data && data.length > 0) {
      return NextResponse.json(data);
    }
  }
  return NextResponse.json(mockProjects);
}

// POST — upsert all projects
export async function POST(request: Request) {
  try {
    const projects = await request.json();
    const { error } = await supabase
      .from('projects')
      .upsert(projects, { onConflict: 'id' });

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE — remove a single project by id
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    }

    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
