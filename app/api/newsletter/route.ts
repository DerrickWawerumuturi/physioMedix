import { Resend } from "resend"
import Newsletter from '@/components/Newsletter'
import { renderToStaticMarkup } from 'react-dom/server'
import {default as NewsletterEmail} from '@/components/NewsletterEmail'


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
    const { email } = body

    if (!email || !email.includes("@")) {
      return new Response(JSON.stringify({error: "Invalid email"}), { status: 400})
    }

    // const htmlContent = renderToStaticMarkup()

    const data = await resend.emails.send({
      from: "newsletter@physiomedix.com",
      to: email,
      subject: "Thank you for subscribing to Physiomedix's Newsletter",
      html: ''
    })

    return new Response(JSON.stringify({success: true, data}), {status: 200})
  } catch (e) {
      console.log("Newsletter error:", e)
      return new Response(JSON.stringify({ error: 'Failed to send email'}), { status: 500 })
  }
}