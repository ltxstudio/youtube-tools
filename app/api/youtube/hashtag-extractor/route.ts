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
    if (!response.ok) throw new Error('Failed to fetch video data');
    const data = await response.json();
    const description = data.items[0]?.snippet?.description || '';
    const hashtags = description.match(/#\w+/g) || [];
    return NextResponse.json({ hashtags });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to extract hashtags' }, { status: 500 });
  }
}
