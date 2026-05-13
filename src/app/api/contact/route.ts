import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail } from '@/lib/emailService'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Send email
    const result = await sendContactEmail({ name, email, message })

    if (result.success) {
      return NextResponse.json(
        { message: 'Message sent successfully!' },
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
