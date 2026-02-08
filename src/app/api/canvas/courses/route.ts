import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.CANVAS_API_KEY;
  const baseUrl = process.env.CANVAS_BASE_URL;

  if (!apiKey || !baseUrl) {
    return NextResponse.json(
      { error: 'Canvas credentials not configured' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `${baseUrl}/api/v1/courses?enrollment_state=active&per_page=50`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Canvas API error: ${response.status}`);
    }

    const courses = await response.json();
    return NextResponse.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}
