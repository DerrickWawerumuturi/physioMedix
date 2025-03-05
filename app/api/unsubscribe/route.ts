import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from '@/utils/supabase/client'
import jwt from 'jsonwebtoken'

const secretKey = process.env.JWS_SECRET!


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { token } = req.body

    if (!token || typeof token !== "string") {
      return res.status(400).json({error: "Method not allowed"})
    }

    const decoded = jwt.verify(token, secretKey) as { email: string }

    if (!decoded.email) {
      return;
    }

    const email = decoded.email;


    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const supabase = createClient();
    const { error } = await supabase.from("subscribers").delete().eq("email", email);

    if (error) {
      return res.status(500).json({ message: "Failed to unsubscribe" });
    }

    return res.status(200).json({ message: "You have been unsubscribed" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to unsubscribe" });
  }
}
