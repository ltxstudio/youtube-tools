import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const username = new URL(req.url).searchParams.get('username');
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  const url = `https://www.googleapis.com/youtube/v3/channels?part=id&forUsername=${username}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch channel data');
    }
    const data = await response.json();
    const channelId = data.items[0]?.id || 'No channel found';
    return NextResponse.json({ channelId });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to fetch channel ID' }, { status: 500 });
  }
}
