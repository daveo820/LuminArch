import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const SYSTEM_PROMPT = `You are the MK Traditions event planning assistant for a boutique event planning company in Cary, NC. You help potential clients learn about services, get rough estimates, and book consultations. Be warm, friendly, and enthusiastic — like talking to a friend who loves planning parties.

Key info:
- Founded by cousins Megan Olson and Katherine Ruffolo
- Services: wedding planning (full, partial, day-of), milestone celebrations, corporate events, custom events
- Based in Cary, NC, serve the greater Triangle area (Raleigh, Durham, Chapel Hill, Apex, Morrisville)
- Contact: mktraditions.nc@gmail.com, Instagram @mktraditions
- For pricing, say "Every event is unique! We'd love to chat about your vision and put together a custom quote. Want to book a free consultation?"
- Always try to capture their name, email, event type, and date if they share it
- You are NOT a replacement for Megan and Katherine — guide people toward booking a consultation
- Keep responses concise (2-3 sentences max per message)
- Never make up specific pricing — always direct to consultation
- If someone asks about availability, encourage them to reach out directly or book a consultation`;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Input validation limits
const MAX_MESSAGE_LENGTH = 1000;
const MAX_CONVERSATION_LENGTH = 20;

function validateAndSanitizeMessages(messages: unknown): Message[] | null {
  if (!Array.isArray(messages)) return null;
  if (messages.length > MAX_CONVERSATION_LENGTH) return null;

  return messages.map(msg => ({
    role: (msg.role === 'assistant' ? 'assistant' : 'user') as 'user' | 'assistant',
    content: typeof msg.content === 'string'
      ? msg.content.slice(0, MAX_MESSAGE_LENGTH).trim()
      : '',
  })).filter(msg => msg.content.length > 0);
}

// Simple in-memory rate limiting (in production, use Redis or similar)
const rateLimits = new Map<string, { count: number; resetTime: number }>();
const SESSION_LIMIT = 20;
const IP_DAILY_LIMIT = 100;

function checkRateLimit(ip: string, sessionId: string): { allowed: boolean; error?: string } {
  const now = Date.now();
  const dayStart = new Date().setHours(0, 0, 0, 0);

  // Check session limit
  const sessionKey = `session:${sessionId}`;
  const sessionData = rateLimits.get(sessionKey) || { count: 0, resetTime: now + 3600000 };
  if (sessionData.count >= SESSION_LIMIT) {
    return { allowed: false, error: 'You\'ve reached the message limit for this session. Please contact us directly or book a consultation!' };
  }

  // Check IP daily limit
  const ipKey = `ip:${ip}`;
  const ipData = rateLimits.get(ipKey) || { count: 0, resetTime: dayStart + 86400000 };
  if (ipData.resetTime < now) {
    ipData.count = 0;
    ipData.resetTime = dayStart + 86400000;
  }
  if (ipData.count >= IP_DAILY_LIMIT) {
    return { allowed: false, error: 'Daily limit reached. Please contact us directly at mktraditions.nc@gmail.com' };
  }

  // Update counts
  sessionData.count++;
  ipData.count++;
  rateLimits.set(sessionKey, sessionData);
  rateLimits.set(ipKey, ipData);

  return { allowed: true };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const sessionId = typeof body.sessionId === 'string' ? body.sessionId : '';

    // Validate and sanitize messages
    const messages = validateAndSanitizeMessages(body.messages);
    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: 'Invalid or empty messages' },
        { status: 400 }
      );
    }

    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
               request.headers.get('x-real-ip') ||
               'unknown';

    // Check rate limits
    const rateCheck = checkRateLimit(ip, sessionId);
    if (!rateCheck.allowed) {
      return NextResponse.json({ error: rateCheck.error }, { status: 429 });
    }

    // Check for API key
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('ANTHROPIC_API_KEY not configured');
      return NextResponse.json(
        { error: 'Chat is temporarily unavailable. Please contact us directly.' },
        { status: 500 }
      );
    }

    const anthropic = new Anthropic({ apiKey });

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
    });

    const assistantMessage = response.content[0].type === 'text'
      ? response.content[0].text
      : '';

    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or contact us directly.' },
      { status: 500 }
    );
  }
}
