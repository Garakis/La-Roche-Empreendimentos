import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Use service_role key for server-side storage access (never exposed to client)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const projectId = formData.get('projectId') as string;

    if (!file || !projectId) {
      return NextResponse.json({ error: 'file and projectId are required' }, { status: 400 });
    }

    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const filename = `${projectId}/${Date.now()}.${ext}`;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error } = await supabaseAdmin.storage
      .from('empreendimentos')
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) throw error;

    const { data: publicUrl } = supabaseAdmin.storage
      .from('empreendimentos')
      .getPublicUrl(filename);

    return NextResponse.json({ url: publicUrl.publicUrl });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
  }
}
