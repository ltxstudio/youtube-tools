import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const videoId = new URL(req.url).searchParams.get('videoId');
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!videoId) {
    return NextResponse.json({ error: 'Video ID is required' }, { status: 400 });
  }

  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const tags = data.items[0]?.snippet?.tags || [];
    return NextResponse.json({ tags });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch video tags' }, { status: 500 });
  }
}
