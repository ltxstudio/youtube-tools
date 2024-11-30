import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { title, description } = Object.fromEntries(new URL(req.url).searchParams.entries());

  if (!title && !description) {
    return NextResponse.json({ error: 'Title or description is required' }, { status: 400 });
  }

  // Simple tag generation logic
  const tags = [...new Set([...(title?.split(' ') || []), ...(description?.split(' ') || [])])];
  
  return NextResponse.json({ tags });
}
