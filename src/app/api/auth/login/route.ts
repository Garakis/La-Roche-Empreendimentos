import { NextResponse } from 'next/server';
import { encrypt } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    
    // Check against env password, or fallback for dev if missing
    const correctPassword = process.env.ADMIN_PASSWORD || 'laroche2026';

    if (password === correctPassword) {
      // Create session payload
      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
      const session = await encrypt({ role: 'admin', expires });

      // Set cookie
      const cookieStore = await cookies();
      cookieStore.set('admin_session', session, {
        expires,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: 'Senha incorreta' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erro no servidor' }, { status: 500 });
  }
}
