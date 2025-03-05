import { Resend } from 'resend'
import ThankYouEmail from '@/emails/Thankyou-Email'

const resend  = new Resend(process.env.RESEND_API_KEY)


export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json()
    const { email } = body


    if (!email || !email.includes("@")) {
      return new Response(JSON.stringify({error: "Invalid email"}), { status: 400})
    }

    const {data, error } = await resend.emails.send({
      from: "newsletter@physiomedix.com",
      to: email,
      subject: "Thank you for subscribing to Physiomedix's Newsletter",
      react: ThankYouEmail({email})
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