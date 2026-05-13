import nodemailer from 'nodemailer'

// Email configuration
const emailConfig = {
  service: 'gmail', // or your email service
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your app password
  },
}

// Create transporter
const transporter = nodemailer.createTransport(emailConfig)

export interface ContactFormData {
  name: string
  email: string
  message: string
}

export interface CommentFormData {
  name: string
  comment: string
  image?: File | null
}

// Send contact form email
export const sendContactEmail = async (data: ContactFormData) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: `New Contact Form Message from ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${data.name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${data.email}</p>
            <p style="margin: 10px 0;"><strong>Message:</strong></p>
            <p style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #007bff;">
              ${data.message}
            </p>
          </div>
          <p style="color: #666; font-size: 12px; text-align: center;">
            This message was sent from your portfolio website
          </p>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)
    return { success: true, message: 'Email sent successfully' }
  } catch (error) {
    console.error('Error sending contact email:', error)
    return { success: false, message: 'Failed to send email' }
  }
}

// Send comment notification email
export const sendCommentNotification = async (data: CommentFormData) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Comment from ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #28a745; padding-bottom: 10px;">
            New Comment Posted
          </h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${data.name}</p>
            <p style="margin: 10px 0;"><strong>Comment:</strong></p>
            <p style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #28a745;">
              ${data.comment}
            </p>
            ${data.image ? '<p style="color: #666; font-size: 12px;"><em>User also uploaded an image</em></p>' : ''}
          </div>
          <p style="color: #666; font-size: 12px; text-align: center;">
            This comment was posted on your portfolio website
          </p>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)
    return { success: true, message: 'Notification sent successfully' }
  } catch (error) {
    console.error('Error sending comment notification:', error)
    return { success: false, message: 'Failed to send notification' }
  }
}
