import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const apiKey = process.env.CANVAS_API_KEY;
  const baseUrl = process.env.CANVAS_BASE_URL;

  if (!apiKey || !baseUrl) {
    return NextResponse.json(
      { error: 'Canvas credentials not configured' },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const courseId = searchParams.get('courseId');

  try {
    let url: string;

    if (courseId) {
      // Get assignments for specific course
      url = `${baseUrl}/api/v1/courses/${courseId}/assignments?per_page=100&order_by=due_at`;
    } else {
      // Get all upcoming assignments across courses
      url = `${baseUrl}/api/v1/users/self/upcoming_events?per_page=100`;
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Canvas API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching assignments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch assignments' },
      { status: 500 }
    );
  }
}
