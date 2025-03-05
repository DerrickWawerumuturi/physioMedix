import { Resend } from 'resend'
import NewsletterEmail from '@/emails/NewsletterEmail'
import { serialize } from '@/utils/serialise/SerializeEmail'

const resend  = new Resend(process.env.RESEND_API_KEY)

interface NewsletterRequest {
  email: string,
  title?: string,
  content?: string
  author?: string,
  date?: string,
}


export async function POST(req: Request): Promise<Response> {
  try {
    const body: NewsletterRequest = await req.json()
    const { email, title, author, date } = body
    const content = JSON.parse(body.content!)

    if (!email || !email.includes("@")) {
      return new Response(JSON.stringify({error: "Invalid email"}), { status: 400})
    }

    const contentArray = content?.root?.children || [];
    const contentHTML = serialize(contentArray);

    const {data, error } = await resend.emails.send({
      from: "newsletter@physiomedix.com",
      to: email,
      subject: "Thank you for subscribing to Physiomedix's Newsletter",
      react: NewsletterEmail({title, content: contentHTML, date, author})
    })

    if (error) {
      return new Response(JSON.stringify({error: error}))
    }
    return new Response(JSON.stringify({success: true, data}), {status: 200})
  } catch (e) {
      console.log("Newsletter error:", e)
      return new Response(JSON.stringify({ error: 'Failed to send email'}), { status: 500 })
  }
}