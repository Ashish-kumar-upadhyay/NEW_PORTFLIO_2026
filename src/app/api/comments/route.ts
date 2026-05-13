import { NextRequest, NextResponse } from 'next/server'
import { sendCommentNotification } from '@/lib/emailService'
import { createSupabaseServer } from '@/lib/supabaseServer'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServer()
    const body = await request.json()
    const { name, comment, image } = body

    // Validate required fields
    if (!name || !comment) {
      return NextResponse.json(
        { error: 'Name and comment are required' },
        { status: 400 }
      )
    }

    // Save comment to database
    const { data, error } = await supabase
      .from('comments')
      .insert([
        {
          name,
          comment,
          image_url: image || null,
          likes: 0,
          is_pinned: false,
          replies: [],
        },
      ])
      .select()

    if (error) {
      console.error('Database error:', error)
      const isDev = process.env.NODE_ENV === 'development'
      return NextResponse.json(
        {
          error: 'Failed to save comment',
          ...(isDev && {
            details: error.message,
            code: error.code,
          }),
        },
        { status: 500 }
      )
    }

    // Send email notification
    const emailResult = await sendCommentNotification({ name, comment, image })

    if (emailResult.success) {
      return NextResponse.json(
        { 
          message: 'Comment posted successfully!',
          data: data[0]
        },
        { status: 200 }
      )
    } else {
      // Comment saved but email failed
      return NextResponse.json(
        { 
          message: 'Comment posted successfully (notification failed)',
          data: data[0],
          warning: 'Email notification failed'
        },
        { status: 200 }
      )
    }
  } catch (error) {
    console.error('Comment API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
