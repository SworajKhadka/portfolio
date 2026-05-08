import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'sworajkhadka21@gmail.com',
      subject: `Portfolio Contact: ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#333">
          <h2 style="color:#4FC9DA;margin-bottom:4px">New message from your portfolio</h2>
          <hr style="border:1px solid #eee;margin:16px 0"/>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message:</strong></p>
          <p style="background:#f5f5f5;padding:16px;border-radius:8px;white-space:pre-wrap">${message}</p>
        </div>
      `,
    })

    if (error) {
      return Response.json({ error: error.message }, { status: 500 })
    }

    return Response.json({ success: true })
  } catch {
    return Response.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
