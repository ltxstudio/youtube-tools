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
    const title = data.items[0]?.snippet?.title || 'No title found';
    return NextResponse.json({ title });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to extract title' }, { status: 500 });
  }
}
