import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const regionCode = new URL(req.url).searchParams.get('regionCode') || 'US';
  const apiKey = process.env.YOUTUBE_API_KEY;

  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=${regionCode}&key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json(data.items);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch YouTube trends' }, { status: 500 });
  }
}
