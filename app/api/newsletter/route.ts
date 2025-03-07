import { Resend } from 'resend'
import NewsletterEmail from '@/emails/NewsletterEmail'
import { serialize } from '@/utils/serialise/SerializeEmail'
import { createClient } from '@/utils/supabase/server'

const resend  = new Resend(process.env.RESEND_API_KEY)

interface NewsletterRequest {
  title?: string,
  content?: string
  author?: string,
  date?: string,
}


export async function POST(req: Request): Promise<Response> {
  try {
    const body: NewsletterRequest = await req.json()
    const { title, author, date } = body
    const content = JSON.parse(body.content!)


    const contentArray = content?.root?.children || [];
    const contentHTML = serialize(contentArray);

    const supabase = await createClient()
    const {data: subscribers, error: subscriberErrors} = await supabase
      .from("subscribers")
      .select("email")

    if (subscriberErrors) {
      return new Response(JSON.stringify({ error: 'Failed to fetch subscribers' }), { status: 500 })
    }

    for (const subscriber of subscribers) {
      await resend.emails.send({
        from: "newsletter@physiomedix.com",
        to: subscriber.email,
        subject: title || "PhysioMedix Monthly Newsletter",
        react: NewsletterEmail({ title, content: contentHTML, date, author })
      })
    }

    return new Response(JSON.stringify({success: true, message: 'Newsletter sent to all subscribers'}), {status: 200})
  } catch (e) {
      console.log("Newsletter error:", e)
      return new Response(JSON.stringify({ error: 'Failed to send email'}), { status: 500 })
  }
}