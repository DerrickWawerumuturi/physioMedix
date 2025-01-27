import React from "react";
import '@payloadcms/next/css'
import Navbar from "@/components/Navbar";
import Footer from '@/components/Footer'
import { Toaster } from 'sonner'
import { headers }  from "next/headers"
import { ThemeProvider } from '@/components/ThemeProvider'



const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "PhysioMedix",
  description: "PhysioMedix is dedicated to exploring the science of physiology, offering readers in-depth insights into how the human body functions"
};

const Layout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
  const headersList = await headers()
  const fullUrl = headersList.get("referer") || ""

    return (
        <html suppressHydrationWarning className={"light"}>
          <body>
          <ThemeProvider
            attribute={"class"}
            defaultTheme={"system"}
            enableSystem
          >
            <Navbar />
            {children}
            {!fullUrl.includes("sign-") &&
              <Footer />
            }
            <Toaster position={"top-center"} richColors />
          </ThemeProvider>
        </body>
        </html>
    )
}

export default Layout
