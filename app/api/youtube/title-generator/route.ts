import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { keywords, description } = Object.fromEntries(new URL(req.url).searchParams.entries());

  if (!keywords && !description) {
    return NextResponse.json({ error: 'Keywords or description is required' }, { status: 400 });
  }

  const generatedTitle = `Top Video: ${keywords || description.slice(0, 30)}...`;

  return NextResponse.json({ title: generatedTitle });
}
